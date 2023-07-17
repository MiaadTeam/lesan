/** @jsx h */
import { ManagedLesanContext } from "./comp/ManagedLesanContext.tsx";
import { Page } from "./comp/preact.tsx";
import { h, hydrate } from "./reactDeps.ts";

hydrate(
  <ManagedLesanContext>
    <Page />
  </ManagedLesanContext>,
  document.getElementById("root")!,
);
