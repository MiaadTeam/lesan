/** @jsx h */
import { h, hydrate } from "https://esm.sh/preact@10.5.15";
import { ManagedLesanContext } from "./comp/ManagedLesanContext.tsx";
import { Page } from "./comp/preact.tsx";

hydrate(
  <ManagedLesanContext>
    <Page />
  </ManagedLesanContext>,
  document.getElementById("root")!,
);
