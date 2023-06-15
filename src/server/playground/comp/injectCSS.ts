export const injectCSS = (styles: string) => {
  const style = document.createElement("style");

  style.type = "text/css";
  style.appendChild(document.createTextNode(styles));
  document.head.appendChild(style);
};
