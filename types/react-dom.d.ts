declare module "react-dom" {
  import React from "react";
  export function createPortal(children: React.ReactNode, container: Element | DocumentFragment): React.ReactPortal;
  export = ReactDOM;
}
