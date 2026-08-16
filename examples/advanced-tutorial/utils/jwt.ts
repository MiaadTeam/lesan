import { throwError } from "./throwError.ts";

/**
 * Minimal dependency-free JWT (HS256) using WebCrypto.
 *
 * Works on Node, Bun and Deno — no third-party auth dependency needed.
 * Satek uses `djwt`; this distilled example implements the same idea with
 * HMAC-SHA256 over WebCrypto so the code runs on every runtime.
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const getEnv = (key: string, fallback: string): string => {
  const global = globalThis as Record<string, any>;
  if (typeof Deno !== "undefined" && Deno.env?.get) {
    return Deno.env.get(key) || fallback;
  }
  if (global.process?.env) {
    return global.process.env[key] || fallback;
  }
  return fallback;
};

const secretKey = getEnv("TOKEN_KEY", "advancedTutorialSuperSecretKey");

const importKey = async () => {
  const keyBuf = encoder.encode(secretKey);
  return crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"],
  );
};

export const jwtTokenKey = await importKey();

const base64Url = (input: ArrayBuffer | string) => {
  const bytes = typeof input === "string"
    ? encoder.encode(input)
    : new Uint8Array(input);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const base64UrlDecode = (input: string) => {
  const pad = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = pad + "===".slice((pad.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

export const createToken = async (payload: Record<string, unknown>) => {
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64Url(JSON.stringify(payload));
  const signature = base64Url(
    await crypto.subtle.sign(
      "HMAC",
      jwtTokenKey,
      encoder.encode(`${header}.${body}`),
    ),
  );
  return `${header}.${body}.${signature}`;
};

export const verifyToken = async (token: string) => {
  const [header, body, signature] = token.split(".");
  if (!header || !body || !signature) throwError("Malformed token");

  const isValid = await crypto.subtle.verify(
    "HMAC",
    jwtTokenKey,
    base64UrlDecode(signature),
    encoder.encode(`${header}.${body}`),
  );

  if (!isValid) throwError("Invalid token signature");

  return JSON.parse(decoder.decode(base64UrlDecode(body)));
};
