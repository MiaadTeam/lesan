import { addBudgetLineSetup } from "./addBudgetLine/mod.ts";
import { getBudgetLinesSetup } from "./getBudgetLines/mod.ts";
import { getBudgetLineBreakdownSetup } from "./getBudgetLineBreakdown/mod.ts";

export const budgetLineSetup = () => {
  addBudgetLineSetup();
  getBudgetLinesSetup();
  getBudgetLineBreakdownSetup();
};
