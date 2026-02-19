import { createHash, createHmac } from "node:crypto";

export const sha256 = (value: string | Buffer): string =>
  createHash("sha256").update(value).digest("hex");

export const stableJson = (value: unknown): string => {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((entry) => stableJson(entry)).join(",")}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  return `{${entries
    .map(([k, v]) => `${JSON.stringify(k)}:${stableJson(v)}`)
    .join(",")}}`;
};

export const hmacSign = (secret: string, payload: unknown): string =>
  createHmac("sha256", secret).update(stableJson(payload)).digest("hex");

export const hmacVerify = (secret: string, payload: unknown, signature: string): boolean =>
  hmacSign(secret, payload) === signature;
