/** @jsx h */
import { h, hydrate } from "https://esm.sh/preact@10.5.15";
import { Page } from "./comp/preact.tsx";

hydrate(<Page />, document.getElementById("root")!);
