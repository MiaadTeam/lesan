import { ClassNames } from "./styles.ts";

const regEx =
  /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
const syntaxHighlight = (json: Object): string => {
  const jsonString = JSON.stringify(json, replacer, 2)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return jsonString.replace(regEx, (match) => {
    let className = ClassNames.number;
    let text = match;

    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        className = ClassNames.key;
        text = text.replace(":", `<span class="${ClassNames.colon}">:</span>`);
      } else {
        if (match === "\"undefined\"") {
          className = ClassNames.undefined;
        } else if (match === "\"[Function]\"") {
          className = ClassNames.function;
        } else {
          className = ClassNames.string;
        }
      }
    } else if (/true|false/.test(match)) {
      className = ClassNames.boolean;
    } else if (/null/.test(match)) {
      className = ClassNames.null;
    }

    return `<span class="${className}">${text}</span>`;
  });
};

const replacer = (_: string, value: any) => {
  if (typeof value === "function") {
    return "[Function]";
  }

  if (typeof value === "undefined") {
    return "undefined";
  }

  return value;
};

export const cutify = (json: Object): string => {
  return syntaxHighlight(json)
    .replace(/"/g, "");
};
