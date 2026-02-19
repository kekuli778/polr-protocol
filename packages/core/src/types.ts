export type PolrLayer = "A" | "A+" | "B" | "C";

export type VerificationProfile =
  | "POLR-GENERIC-1.0"
  | "POLR-IMAGE-1.0"
  | "POLR-VIDEO-1.0"
  | "POLR-TEXT-POST-1.0"
  | "POLR-MUSIC-1.2"
  | "POLR-NEWS-1.1"
  | "POLR-MIXED-MEDIA-1.0";

export interface ProviderDescriptor {
  providerId: string;
  name: string;
  assuranceTier: "A0" | "A1" | "A2";
  epochDurationSeconds: number;
  publicKeys: string[];
  issuedEpochs: number[];
  metadataUri?: string;
}

export interface AnthropicityProof {
  providerId: string;
  epoch: number;
  root: string;
  externalNullifier: string;
  signalHash: string;
  nullifierHash: string;
  proofBlob: string;
}

export interface AnthropicityAttestation {
  schema: "POLR_AnthropicityAttestation_v1";
  version: "1.0";
  profile: VerificationProfile;
  createdAt: string;
  canonicalization: {
    kind: "text" | "binary" | "mixed";
    version: string;
  };
  artifactDigest: string;
  proof: AnthropicityProof;
  proximityCredentialUid?: string;
  uid: string;
}

export interface AttributionClaim {
  role: "author" | "editor" | "performer" | "producer" | "publisher" | "contributor";
  label: string;
}

export interface AttributionAttestation {
  schema: "POLR_AttributionAttestation_v1";
  createdAt: string;
  anthropicityUid: string;
  claims: AttributionClaim[];
  signer: string;
  signature: string;
  supersedes?: string;
  uid: string;
}

export interface IdentityBindingAttestation {
  schema: "POLR_IdentityBindingAttestation_v1";
  createdAt: string;
  attributionUid: string;
  issuer: string;
  subjectCommitment: string;
  validFrom: string;
  validUntil: string;
  revocationUrl?: string;
  signature: string;
  uid: string;
}

export interface ProximityCredential {
  schema: "POLR_ProximityCredential_v1";
  policyId: string;
  windowStart: number;
  windowEnd: number;
  thresholdN: number;
  rootEpochCommitment: string;
  aggregateProofHash: string;
  uid: string;
}

export interface VerificationResult {
  ok: boolean;
  profile: VerificationProfile;
  verifiedLayers: PolrLayer[];
  failures: string[];
}

export interface VerificationBundle {
  anthropicity: AnthropicityAttestation;
  attribution?: AttributionAttestation;
  identity?: IdentityBindingAttestation;
  proximity?: ProximityCredential;
}
