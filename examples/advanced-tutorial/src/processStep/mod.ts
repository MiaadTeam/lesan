import { addProcessStepSetup } from "./addProcessStep/mod.ts";
import { getProcessStepsSetup } from "./getProcessSteps/mod.ts";

export const processStepSetup = () => {
  addProcessStepSetup();
  getProcessStepsSetup();
};
