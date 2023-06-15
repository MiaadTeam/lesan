import { injectCSS } from "./injectCSS.ts";

export enum ClassNames {
  string = "cute-string",
  undefined = "cute-undefined",
  function = "cute-function",
  number = "cute-number",
  boolean = "cute-boolean",
  null = "cute-null",
  colon = "cute-colon",
  key = "cute-key",
}

injectCSS(`
  .${ClassNames.string} {
    color: #f1fa8c; 
  }
  .${ClassNames.number} {
    color: #50fa7b; 
  }
  .${ClassNames.boolean} {
    color: #ff79c6; 
  }
  .${ClassNames.function} {
    color: #bd93f9; 
  }
  .${ClassNames.null} {
    color: #bd93f9; 
  }
  .${ClassNames.undefined} {
    color: #bd93f9;
  }
  .${ClassNames.key} {
    color: #66d9ef;
    margin-right: 5px;
  }
  .${ClassNames.colon} {
    color: #f8f8f2;
    margin-left: 1px;
  }
`);

export const pre = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial",
  fontSize: 15,
  lineHeight: "20px",
  display: "inline-block",
  borderRadius: 3,
  padding: "10px 15px",
  background: "#272822",
  color: "#f8f8f2",
  textShadow: "1px 1px black",
  overflow: "auto",
};
