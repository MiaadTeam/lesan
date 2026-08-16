import { throwError } from "./throwError.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const toHex = (buffer: ArrayBuffer) => {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const fromHex = (hex: string) => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
};

export const hashPassword = async (password: string): Promise<string> => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(password),
  );
  return toHex(digest);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  try {
    const digest = await crypto.subtle.digest(
      "SHA-256",
      encoder.encode(password),
    );
    return decoder.decode(digest) === decoder.decode(fromHex(hash));
  } catch (_e) {
    throwError("Something went wrong while comparing passwords");
    return false;
  }
};
