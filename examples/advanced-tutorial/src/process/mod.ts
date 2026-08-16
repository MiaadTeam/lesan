import { addProcessSetup } from "./addProcess/mod.ts";
import { activateProcessSetup } from "./activateProcess/mod.ts";
import { getProcessesSetup } from "./getProcesses/mod.ts";

export const processSetup = () => {
  addProcessSetup();
  activateProcessSetup();
  getProcessesSetup();
};
