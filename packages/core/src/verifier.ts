import { hmacVerify, sha256 } from "./crypto.js";
import { profileRules } from "./profiles.js";
import type {
  VerificationBundle,
  VerificationResult,
} from "./types.js";
import { ProviderRegistry } from "./provider-registry.js";

export interface VerifierSecrets {
  attributionSignerSecrets?: Record<string, string>;
  identityIssuerSecrets?: Record<string, string>;
}

export class PolrVerifier {
  private readonly usedNullifiers = new Set<string>();

  constructor(
    private readonly registry: ProviderRegistry,
    private readonly secrets: VerifierSecrets = {},
  ) {}

  verify(bundle: VerificationBundle): VerificationResult {
    const failures: string[] = [];
    const verifiedLayers: VerificationResult["verifiedLayers"] = [];

    const { anthropicity } = bundle;
    const provider = this.registry.get(anthropicity.proof.providerId);
    if (!provider) failures.push("Unknown anthropicity provider");

    if (!this.registry.isAcceptedEpoch(anthropicity.proof.providerId, anthropicity.proof.epoch)) {
      failures.push("Unaccepted provider epoch");
    }

    const expectedSignalHash = sha256(`POLR_SIGNAL:${anthropicity.artifactDigest}`);
    if (expectedSignalHash !== anthropicity.proof.signalHash) {
      failures.push("Invalid signal hash");
    }

    if (this.usedNullifiers.has(anthropicity.proof.nullifierHash)) {
      failures.push("Nullifier reuse detected");
    }

    const expectedNullifier = sha256(
      `${anthropicity.proof.providerId}:${anthropicity.proof.epoch}:${anthropicity.proof.externalNullifier}`,
    );
    if (expectedNullifier !== anthropicity.proof.nullifierHash) {
      failures.push("Invalid Layer A nullifier derivation");
    }

    if (anthropicity.schema !== "POLR_AnthropicityAttestation_v1") {
      failures.push("Unsupported Layer A schema");
    }

    const profileRule = profileRules[anthropicity.profile];
    if (!profileRule) failures.push("Unknown verification profile");

    if (failures.length === 0) {
      verifiedLayers.push("A");
      this.usedNullifiers.add(anthropicity.proof.nullifierHash);
    }

    if (bundle.proximity) {
      const p = bundle.proximity;
      if (p.windowStart >= p.windowEnd) failures.push("Invalid proximity time window");
      if (p.thresholdN <= 0) failures.push("Invalid proximity threshold");
      if (anthropicity.proximityCredentialUid && anthropicity.proximityCredentialUid !== p.uid) {
        failures.push("Layer A proximity credential UID mismatch");
      }
      if (failures.length === 0 || verifiedLayers.includes("A")) verifiedLayers.push("A+");
    }

    if (bundle.attribution) {
      const b = bundle.attribution;
      if (b.anthropicityUid !== anthropicity.uid) {
        failures.push("Layer B does not reference provided Layer A");
      }
      const signerSecret = this.secrets.attributionSignerSecrets?.[b.signer];
      if (!signerSecret) {
        failures.push("Missing signer secret for attribution verification");
      } else {
        const { signature, uid: _uid, ...signable } = b;
        if (!hmacVerify(signerSecret, signable, signature)) {
          failures.push("Invalid Layer B signature");
        }
      }
      if (verifiedLayers.includes("A") && !failures.some((f) => f.startsWith("Layer B"))) {
        verifiedLayers.push("B");
      }
    }

    if (bundle.identity) {
      const c = bundle.identity;
      if (!bundle.attribution || c.attributionUid !== bundle.attribution.uid) {
        failures.push("Layer C missing or mismatched Layer B dependency");
      }
      const now = Date.now();
      if (Date.parse(c.validFrom) > now || Date.parse(c.validUntil) < now) {
        failures.push("Identity credential outside validity window");
      }
      const issuerSecret = this.secrets.identityIssuerSecrets?.[c.issuer];
      if (!issuerSecret) {
        failures.push("Missing issuer secret for identity verification");
      } else {
        const { signature, uid: _uid, ...signable } = c;
        if (!hmacVerify(issuerSecret, signable, signature)) {
          failures.push("Invalid Layer C signature");
        }
      }
      if (verifiedLayers.includes("B") && !failures.some((f) => f.startsWith("Layer C"))) {
        verifiedLayers.push("C");
      }
    }

    return {
      ok: failures.length === 0,
      profile: anthropicity.profile,
      verifiedLayers,
      failures,
    };
  }
}
