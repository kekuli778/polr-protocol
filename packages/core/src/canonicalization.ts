import { sha256, stableJson } from "./crypto.js";

type CanonicalKind = "text" | "binary" | "mixed";

export interface CanonicalizedArtifact {
  kind: CanonicalKind;
  version: string;
  digest: string;
}

export const canonicalizeText = (input: string): CanonicalizedArtifact => {
  const normalized = input.replace(/\r\n/g, "\n");
  return {
    kind: "text",
    version: "utf8-lf-v1",
    digest: sha256(normalized),
  };
};

export const canonicalizeBinary = (bytes: Buffer): CanonicalizedArtifact => ({
  kind: "binary",
  version: "exact-bytes-v1",
  digest: sha256(bytes),
});

export const canonicalizeMixedManifest = (
  manifest: Record<string, string>,
): CanonicalizedArtifact => ({
  kind: "mixed",
  version: "manifest-v1",
  digest: sha256(stableJson(manifest)),
});
