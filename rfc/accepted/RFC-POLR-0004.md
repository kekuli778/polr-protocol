POLR Proximity Subspec: Trustless Additive Human‑Assurance Mechanism
Category: Standards Track
Status: Draft
Version: 1.0
Date: 2026-02-04

Abstract

This document specifies the POLR proximity mechanism, a trustless, additive human‑assurance system that increases confidence that a signer participating in POLR Layer A (Anthropicity) is a genuine human. The mechanism relies on mutually consensual, real‑time, in‑person cryptographic encounters between verified humans, locally recorded as encounter receipts and aggregated into a zero‑knowledge proof that is verified on‑chain before acceptance.

Proximity credentials are signer‑level assurance signals only. They do not assert any claim about content creation context, physical location, eyewitness presence, or non‑AI authorship.

Status of This Memo

This memo defines the sole POLR‑compliant trustless proximity mechanism. Distribution is unlimited. Updates are governed by RFC‑POLR‑0002.

1. Terminology

The key words MUST, MUST NOT, REQUIRED, SHALL, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in RFC 2119.

Anthropicity
The condition in which a digital artifact is cryptographically attested as having been created or authorized by a human being, as distinct from a juridical or artificial entity.

Proximity Credential
A cryptographically verifiable signer‑level credential indicating participation in qualifying real‑world encounters with other verified humans, used solely to increase confidence in anthropicity attestations.

2. Purpose and Semantics (Normative)

The purpose of the proximity mechanism is to increase confidence that a POLR signer asserting Layer A anthropicity is a real human, by requiring evidence of participation in real‑world, mutually consensual, in‑person encounters with other verified humans.

Proximity is additive. It refines confidence in anthropicity but does not expand the semantic claim of Layer A.

2.1 Permitted Claims

A valid proximity credential is evidence that:

The signer has participated in at least N real‑time, mutually consensual, in‑person cryptographic encounters with other verified humans under policy P within time window W.

2.2 Prohibited Claims

Proximity credentials MUST NOT be represented as evidence of:

content creation location

eyewitness reporting

event attendance

in‑person authorship

non‑AI creation

editorial or factual integrity

Misrepresentation is treated as protocol misuse under RFC‑POLR‑0003.

3. Threat Model Assumptions

The proximity mechanism MUST defend against:

unilateral fabrication of proximity signals

replay of old encounters

mass generation of fake encounters by a single device

on‑chain submission of false aggregate claims

The mechanism does NOT defend against:

collusion among real humans

deliberate encounter farming

humans selling participation

These are explicitly non‑mitigated.

4. Actors and Key Material

Each participating client maintains:

Anthropicity secret
Used solely for generating zero‑knowledge membership proofs compatible with POLR Layer A.

Device encounter signing keypair (esk_dev, epk_dev)

Generated per installation

Stored in OS secure storage where available

Rotated at platform discretion

Never published on‑chain

Device keys MUST be distinct from anthropicity secrets.

5. Encounter Policy

Each proximity interaction is governed by a policy_id.

A policy defines:

handshake transport (e.g., BLE)

consent requirements

cryptographic parameters

time‑bucket granularity

optional quality flags (e.g., numeric comparison confirmed)

Policies are platform‑defined but MUST be referenced explicitly in all receipts and proofs.

6. Encounter Handshake Protocol

6.1 Session Initialization

Upon mutual user consent:

Each device generates:

ephemeral keypair (esk_eph, epk_eph)

session nonce n

Devices exchange:

epk_eph

n

policy_id

A shared time bucket is computed:

time_bucket = floor(current_unix_time / bucket_size(policy_id))

6.2 Mutual Anthropicity Proofs

Each party generates a zero‑knowledge membership proof attesting:

membership in an accepted anthropicity provider group

against a specific Merkle root and epoch

Public inputs:

external_nullifier_encounter =
H("POLR_ENCOUNTER" || policy_id || epoch || time_bucket)

signal_encounter =
H(epk_eph_self || epk_eph_peer || n_self || n_peer || policy_id || time_bucket)

Each proof outputs:

root

epoch

encounter_nullifier

proof blob

This binds the proof to the encounter and prevents reuse.

6.3 Transcript Construction

Both parties compute an identical transcript hash:

transcript =
H(
epk_eph_A || epk_eph_B ||
n_A || n_B ||
policy_id ||
time_bucket ||
root_A || root_B ||
encounter_nullifier_A || encounter_nullifier_B ||
signal_A || signal_B
)

6.4 Mutual Signatures

Each device signs the transcript:

sig_A = Sign(esk_dev_A, transcript)

sig_B = Sign(esk_dev_B, transcript)

A valid encounter requires both signatures.

7. Encounter Receipt (Off‑Chain)

Each party stores an encrypted local receipt containing:

transcript hash

policy_id

time_bucket

both ephemeral public keys

both nonces

both zero‑knowledge anthropicity proofs

both encounter nullifiers

both device signatures

optional policy quality flags

Receipts MUST NOT be published individually or uploaded on‑chain.

8. Receipt Validity Conditions

A receipt is valid if and only if:

Both zero‑knowledge membership proofs verify

Roots and epochs are accepted under POLR registries

Both signatures verify over the same transcript

Encounter nullifiers are well‑formed

Time bucket and policy_id are consistent

9. Aggregate Proximity Proof

9.1 Aggregate Claim

A user MAY generate a zero‑knowledge proof asserting:

“I possess at least N valid encounter receipts satisfying policy P within time window W.”

9.2 Aggregate Circuit Requirements (Normative)

The aggregate circuit MUST verify that:

For each included receipt:

receipt validity conditions hold

encounter nullifiers are pairwise distinct

time buckets fall within [W_start, W_end]

policy_id matches

Additionally:

total valid receipts ≥ threshold N

9.3 Public Inputs

The aggregate proof exposes only:

policy_id

window_start

window_end

threshold_N

approved root/epoch commitment

aggregate_public_signal_hash

No per‑encounter data is revealed.

10. On‑Chain Verification and Acceptance

10.1 Verification Contract

An on‑chain verifier contract MUST:

verify the aggregate zero‑knowledge proof

validate policy_id and threshold rules

ensure referenced roots and epochs are acceptable

Invalid proofs MUST cause transaction failure.

10.2 Proximity Credential Attestation

Upon successful verification, an attestation is recorded containing:

policy_id

window_start

window_end

threshold_N

root/epoch commitment

aggregate proof hash

The attestation UID MAY be referenced by Layer A anthropicity attestations.

11. Replay and Abuse Resistance

The mechanism resists abuse via:

time‑bucketed encounter nullifiers

transcript uniqueness

mutual signatures

on‑chain proof gating

A signer cannot fabricate proximity credentials without possessing genuine receipts.

12. Privacy Properties

The proximity mechanism provides:

no on‑chain social graph

no per‑encounter disclosure

no identity disclosure

unlinkability across time buckets and policies

Residual correlation risk depends on platform implementation choices.

13. Implementation Guidance (Non‑Normative)

Recursive SNARKs are recommended for scalability

Circuit‑friendly signature schemes SHOULD be used

Stronger policies MAY be offered as higher‑assurance tiers

14. Security Considerations

Proximity credentials increase confidence but are not absolute guarantees of humanness. Platforms MUST represent them as additive evidence only.

15. Relationship to Other POLR RFCs

This RFC defines the only POLR‑compliant trustless proximity mechanism and is normative for any proximity credential referenced in RFC‑POLR‑0001.

16. IANA Considerations

This document has no IANA actions.

17. References

RFC 2119

RFC‑POLR‑0001

RFC‑POLR‑0002

RFC‑POLR‑0003

End of RFC‑POLR‑0004
