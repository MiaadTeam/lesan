/** @jsx h */
import { h, hydrate } from "https://esm.sh/preact@10.5.15";
import { Page } from "./comp/preact.tsx";
import { ManagedLesanContext } from "./comp/ManagedLesanContext.tsx";

hydrate(
  <ManagedLesanContext>
    <Page />
  </ManagedLesanContext>,
  document.getElementById("root")!
);
