import test from "node:test";
import assert from "node:assert/strict";

import {
  ProviderRegistry,
  canonicalizeText,
  createAnthropicityProof,
  createAnthropicityAttestation,
  createAttributionAttestation,
  createIdentityBindingAttestation,
  createProximityCredential,
  PolrVerifier,
} from "./index.js";

test("verifies A+B+C+A+ bundle", () => {
  const registry = new ProviderRegistry();
  registry.addProvider({
    providerId: "provider-main",
    name: "Main",
    assuranceTier: "A1",
    epochDurationSeconds: 3600,
    publicKeys: ["pk1"],
    issuedEpochs: [42],
  });

  const canonical = canonicalizeText("hello\nworld");
  const proof = createAnthropicityProof({
    providerId: "provider-main",
    epoch: 42,
    root: "root-42",
    artifactDigest: canonical.digest,
  });
  const prox = createProximityCredential({
    policyId: "default",
    windowStart: 1,
    windowEnd: 2,
    thresholdN: 3,
    rootEpochCommitment: "commitment-42",
  });

  const a = createAnthropicityAttestation({
    profile: "POLR-TEXT-POST-1.0",
    canonicalization: { kind: canonical.kind, version: canonical.version },
    artifactDigest: canonical.digest,
    proof,
    proximityCredentialUid: prox.uid,
  });
  const b = createAttributionAttestation({
    anthropicityUid: a.uid,
    claims: [{ role: "author", label: "pseudonymous-author" }],
    signer: "did:example:author",
    signerSecret: "author-secret",
  });
  const c = createIdentityBindingAttestation({
    attributionUid: b.uid,
    issuer: "issuer.example",
    issuerSecret: "issuer-secret",
    subjectCommitment: "subject-commitment",
    validFrom: new Date(Date.now() - 60000).toISOString(),
    validUntil: new Date(Date.now() + 60000).toISOString(),
  });

  const verifier = new PolrVerifier(registry, {
    attributionSignerSecrets: { "did:example:author": "author-secret" },
    identityIssuerSecrets: { "issuer.example": "issuer-secret" },
  });

  const result = verifier.verify({ anthropicity: a, attribution: b, identity: c, proximity: prox });
  assert.equal(result.ok, true);
  assert.deepEqual(result.verifiedLayers.sort(), ["A", "A+", "B", "C"].sort());
});

test("rejects nullifier reuse", () => {
  const registry = new ProviderRegistry();
  registry.addProvider({
    providerId: "provider-main",
    name: "Main",
    assuranceTier: "A0",
    epochDurationSeconds: 3600,
    publicKeys: ["pk1"],
    issuedEpochs: [1],
  });

  const canonical = canonicalizeText("same artifact");
  const proof = createAnthropicityProof({
    providerId: "provider-main",
    epoch: 1,
    root: "root-1",
    artifactDigest: canonical.digest,
  });

  const verifier = new PolrVerifier(registry);
  const a1 = createAnthropicityAttestation({
    profile: "POLR-GENERIC-1.0",
    canonicalization: { kind: canonical.kind, version: canonical.version },
    artifactDigest: canonical.digest,
    proof,
  });
  const a2 = createAnthropicityAttestation({
    profile: "POLR-GENERIC-1.0",
    canonicalization: { kind: canonical.kind, version: canonical.version },
    artifactDigest: canonical.digest,
    proof,
  });

  assert.equal(verifier.verify({ anthropicity: a1 }).ok, true);
  const second = verifier.verify({ anthropicity: a2 });
  assert.equal(second.ok, false);
  assert.match(second.failures.join("\n"), /Nullifier reuse/);
});
