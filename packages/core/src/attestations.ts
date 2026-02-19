import { sha256, hmacSign } from "./crypto.js";
import type {
  AnthropicityAttestation,
  AnthropicityProof,
  AttributionAttestation,
  AttributionClaim,
  IdentityBindingAttestation,
  ProximityCredential,
  VerificationProfile,
} from "./types.js";

const uidFrom = (tag: string, payload: unknown): string => `${tag}_${sha256(JSON.stringify(payload)).slice(0, 20)}`;

export const createAnthropicityProof = (params: {
  providerId: string;
  epoch: number;
  root: string;
  artifactDigest: string;
}): AnthropicityProof => {
  const externalNullifier = sha256(`POLR_CONTENT:${params.artifactDigest}`);
  const signalHash = sha256(`POLR_SIGNAL:${params.artifactDigest}`);
  const nullifierHash = sha256(`${params.providerId}:${params.epoch}:${externalNullifier}`);

  return {
    providerId: params.providerId,
    epoch: params.epoch,
    root: params.root,
    externalNullifier,
    signalHash,
    nullifierHash,
    proofBlob: sha256(`proof:${params.root}:${nullifierHash}:${signalHash}`),
  };
};

export const createAnthropicityAttestation = (params: {
  profile: VerificationProfile;
  canonicalization: { kind: "text" | "binary" | "mixed"; version: string };
  artifactDigest: string;
  proof: AnthropicityProof;
  createdAt?: string;
  proximityCredentialUid?: string;
}): AnthropicityAttestation => {
  const createdAt = params.createdAt ?? new Date().toISOString();
  const base = {
    schema: "POLR_AnthropicityAttestation_v1" as const,
    version: "1.0" as const,
    profile: params.profile,
    createdAt,
    canonicalization: params.canonicalization,
    artifactDigest: params.artifactDigest,
    proof: params.proof,
    proximityCredentialUid: params.proximityCredentialUid,
  };

  return { ...base, uid: uidFrom("attA", base) };
};

export const createAttributionAttestation = (params: {
  anthropicityUid: string;
  claims: AttributionClaim[];
  signer: string;
  signerSecret: string;
  createdAt?: string;
  supersedes?: string;
}): AttributionAttestation => {
  const createdAt = params.createdAt ?? new Date().toISOString();
  const body = {
    schema: "POLR_AttributionAttestation_v1" as const,
    createdAt,
    anthropicityUid: params.anthropicityUid,
    claims: params.claims,
    signer: params.signer,
    supersedes: params.supersedes,
  };
  const signature = hmacSign(params.signerSecret, body);
  return { ...body, signature, uid: uidFrom("attB", { ...body, signature }) };
};

export const createIdentityBindingAttestation = (params: {
  attributionUid: string;
  issuer: string;
  issuerSecret: string;
  subjectCommitment: string;
  validFrom: string;
  validUntil: string;
  revocationUrl?: string;
  createdAt?: string;
}): IdentityBindingAttestation => {
  const createdAt = params.createdAt ?? new Date().toISOString();
  const body = {
    schema: "POLR_IdentityBindingAttestation_v1" as const,
    createdAt,
    attributionUid: params.attributionUid,
    issuer: params.issuer,
    subjectCommitment: params.subjectCommitment,
    validFrom: params.validFrom,
    validUntil: params.validUntil,
    revocationUrl: params.revocationUrl,
  };

  const signature = hmacSign(params.issuerSecret, body);
  return { ...body, signature, uid: uidFrom("attC", { ...body, signature }) };
};

export const createProximityCredential = (params: {
  policyId: string;
  windowStart: number;
  windowEnd: number;
  thresholdN: number;
  rootEpochCommitment: string;
}): ProximityCredential => {
  const body = {
    schema: "POLR_ProximityCredential_v1" as const,
    policyId: params.policyId,
    windowStart: params.windowStart,
    windowEnd: params.windowEnd,
    thresholdN: params.thresholdN,
    rootEpochCommitment: params.rootEpochCommitment,
  };

  return {
    ...body,
    aggregateProofHash: sha256(JSON.stringify(body)),
    uid: uidFrom("prox", body),
  };
};
