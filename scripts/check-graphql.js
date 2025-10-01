#!/usr/bin/env node
// Simple GraphQL health/auth check used before starting the dev/server.
// Reads NEXT_PUBLIC_GRAPHQL_ENDPOINT and NEXT_PUBLIC_BEARER_TOKEN (or fallbacks)

const fs = require('fs');
const path = require('path');

// If env vars are not present in the environment, try loading .env.local
function loadEnvLocal() {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, { encoding: 'utf8' });
    content.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eq = trimmed.indexOf('=');
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      // remove surrounding quotes
      if ((val.startsWith("\'") && val.endsWith("\'")) || (val.startsWith('"') && val.endsWith('"'))) {
        val = val.slice(1, -1);
      }
      // only set when not present in process.env
      if (process.env[key] === undefined) process.env[key] = val;
    });
  } catch (e) {
    // don't crash on env load error; just continue
    console.warn('[graphql-check] Failed to load .env.local:', e && e.message ? e.message : e);
  }
}

loadEnvLocal();

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || process.env.GRAPHQL_ENDPOINT;
// support multiple possible token env var names (NEXT_PUBLIC_GRAPHQL_TOKEN used in .env.local)
const token =
  process.env.NEXT_PUBLIC_GRAPHQL_TOKEN ||
  process.env.NEXT_PUBLIC_BEARER_TOKEN ||
  process.env.GRAPHQL_TOKEN ||
  process.env.BEARER_TOKEN;

function fail(code, ...msg) {
  console.error('[graphql-check]', ...msg);
  process.exitCode = code; // don’t call process.exit()
}

if (!endpoint) fail(2, 'Missing NEXT_PUBLIC_GRAPHQL_ENDPOINT or GRAPHQL_ENDPOINT env var.');
if (!token) fail(2, 'Missing NEXT_PUBLIC_BEARER_TOKEN or BEARER_TOKEN env var.');

(async () => {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: "{ __typename }" }),
    });

    if (!res.ok) return fail(3, `HTTP ${res.status} ${res.statusText}`);

    const json = await res.json();
    if (json.errors) return fail(4, "GraphQL errors:", JSON.stringify(json.errors, null, 2));

    if (json.data) {
      console.log("[graphql-check] ✅ Server OK, token valid.");
      process.exitCode = 0;
      return;
    }

    fail(5, "GraphQL response missing data.");
  } catch (err) {
    fail(6, "Network error:", err.message);
  }
})();