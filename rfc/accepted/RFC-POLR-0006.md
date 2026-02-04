POLR Reference Implementations, Test Vectors, and Conformance Testing
Category: Informational / Standards-Track Support
Status: Draft
Version: 1.0
Date: 2026-02-04

Abstract

This document defines expectations for POLR reference implementations, canonical test vectors, and conformance testing. It specifies how implementations SHOULD demonstrate correctness, interoperability, and backward compatibility with accepted POLR RFCs. This RFC does not introduce new protocol semantics; it operationalizes existing specifications to reduce ambiguity and fragmentation.

Status of This Memo

This memo provides normative guidance for implementers and auditors. Distribution is unlimited. Updates are governed by RFC-POLR-0002.

1. Purpose and Rationale

POLR is designed to be cryptographically verifiable, platform-neutral, and long-lived. Achieving these goals requires shared reference implementations, reproducible test vectors, and deterministic verification behavior across independent systems.

Reference implementations and test vectors serve as a practical backstop against semantic drift, misinterpretation, and incomplete implementations—particularly at Layer A (Anthropicity), where minimalism is a security property.

2. Scope

This RFC governs:

reference implementation expectations

canonical test vector requirements

verification and failure cases

conformance testing principles

This RFC does NOT govern:

production deployment requirements

performance benchmarks

UX or client design

governance decisions

3. Reference Implementations

3.1 Purpose of Reference Implementations

Reference implementations exist to:

clarify ambiguous edge cases

demonstrate correct protocol usage

enable interoperability testing

accelerate adoption without redefining semantics

Reference implementations are illustrative, not authoritative. Accepted RFCs remain the source of truth.

3.2 Required Reference Components

The POLR project SHOULD provide at least one reference implementation for each of the following components.

3.2.1 Content Canonicalization Library

Text canonicalization per RFC-POLR-0001

Binary media hashing

Mixed-media manifest hashing

3.2.2 Layer A — Anthropicity Proof Generator

Zero-knowledge membership proof generation

External nullifier derivation bound to content digest

Signal binding to artifact hash

Epoch and root validation

3.2.3 Additive Human-Assurance (Proximity) Verifier

Aggregate proximity proof verification

Policy and window enforcement

On-chain acceptance logic

3.2.4 Layer B — Attribution Attestation Generator

Role taxonomy handling

Supersession chaining

Signature generation and verification

3.2.5 Layer C — Identity Binding Generator

Identity commitment handling

Issuer metadata validation

Expiry and revocation checks

3.2.6 Verifier SDK

Offline verification of attestations

Cross-layer dependency validation

Explicit failure reason reporting

3.3 Supported Languages (Non-Normative)

Reference implementations SHOULD prioritize:

Solidity (on-chain verification)

TypeScript (SDKs and tooling)

Additional languages MAY be added as community contributions.

4. Canonical Test Vectors (Normative)

Canonical test vectors are REQUIRED to ensure deterministic verification across independent implementations.

Each test vector MUST include:

human-readable description

input artifacts or content digests

attestation payloads

expected verification result

reference to applicable RFC section

5. Required Test Vector Classes

5.1 Layer A — Anthropicity

Valid Cases:

correct content digest with valid zero-knowledge membership proof

correct external nullifier derivation

accepted epoch and Merkle root reference

Invalid Cases:

content digest mismatch

nullifier reuse

proof referencing stale or unknown root

tampered attestation payload

5.2 Layer A+ — Additive Human Assurance (Proximity)

Valid Cases:

aggregate proof with at least N valid encounter receipts

distinct encounter nullifiers

policy and time window match

Invalid Cases:

insufficient receipt count

reused encounter nullifiers

receipt outside time window

mismatched policy_id

malformed aggregate proof

5.3 Layer B — Attribution

Valid Cases:

signed attribution referencing valid anthropicity attestation

multiple attributions on the same artifact

correct supersession chaining

Invalid Cases:

attribution without Layer A dependency

broken supersession reference

invalid attribution signature

5.4 Layer C — Identity

Valid Cases:

valid identity binding within credential time window

multiple attributions bound to a single identity

revocation pointer respected

Invalid Cases:

expired identity credential

invalid issuer reference

missing attribution dependency

6. Cross-Layer Test Scenarios

Implementations MUST support verification of the following scenarios:

Layer A only (anthropicity)

Layers A + B

Layers A + B + C

Layer A + additive human assurance

Layers A + B + C with additive human assurance

Each scenario MUST include at least one failing variant.

7. Verification Output Requirements

Verifier implementations SHOULD provide:

boolean verification result

verified layers

applied verification profile (RFC-POLR-0005)

explicit failure reasons

Silent failure is discouraged.

8. Backward Compatibility Testing

Implementations MUST:

verify historical attestations created under earlier RFC versions

reject attestations that violate versioned constraints

preserve verification correctness across upgrades

Breaking changes MUST include new test vectors and migration notes.

9. Interoperability Testing

Independent implementations SHOULD be tested against:

a shared test vector corpus

the same on-chain data

multiple execution environments

Differences in interpretation MUST be documented and resolved via RFC clarification.

10. Security Testing Guidance

Implementers SHOULD test for:

replay resistance

nullifier collision resistance

malformed proof handling

malicious input resilience

Test harnesses SHOULD include fuzzing where feasible.

11. Conformance Claims

An implementation MAY claim:

POLR-conformant (Layer A — Anthropicity)

POLR-conformant (Layers A + B)

POLR-conformant (Layers A + B + C)

POLR-conformant (Layer A with additive human assurance)

Conformance claims MUST specify:

supported RFC versions

supported verification profiles

known limitations

12. Audit Support

Auditors SHOULD use:

reference implementations

canonical test vectors

verification logs

Auditors MUST NOT certify:

ownership

originality

truth

legal enforceability

13. Governance and Evolution

Reference implementations and test vectors:

MAY evolve independently of protocol semantics

MUST track RFC versioning

MUST NOT introduce new claims

Governance of this RFC follows RFC-POLR-0002.

14. Security Considerations

Incorrect or incomplete reference implementations can fragment the ecosystem. Canonical test vectors are a primary security control against divergence.

15. IANA Considerations

This document has no IANA actions.

16. References

RFC 2119

RFC-POLR-0001

RFC-POLR-0002

RFC-POLR-0003

RFC-POLR-0004

RFC-POLR-0005

End of RFC-POLR-0006
