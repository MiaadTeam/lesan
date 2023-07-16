/** @jsx h */
import { h, hydrate } from "../../deps.ts";
import { ManagedLesanContext } from "./comp/ManagedLesanContext.tsx";
import { Page } from "./comp/preact.tsx";

hydrate(
  <ManagedLesanContext>
    <Page />
  </ManagedLesanContext>,
  document.getElementById("root")!,
);
