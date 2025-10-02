import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`
    }
  }),
  cache: new InMemoryCache(),
});
