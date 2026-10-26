/** @jsx h */
import { h, useState } from "../reactDeps.ts";
import CopyIcon from "./icon/CopyIcon.tsx";

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (_e) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
};

export function CopyButton({
  text,
  title = "Copy",
  className = "",
}: {
  text: string;
  title?: string;
  className?: string;
}): h.JSX.Element {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      className={`e2e-copy-button ${className}`.trim()}
      title={copied ? "Copied!" : title}
      onClick={(e: any) => {
        e.stopPropagation();
        copy();
      }}
    >
      <CopyIcon />
      {copied && <span className="e2e-copy-button--copied">copied</span>}
    </button>
  );
}
