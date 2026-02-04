POLR Terminology and Non-Claims Lexicon
Category: Informational / Interpretive
Status: Draft
Version: 1.0
Date: 2026-02-04

Abstract

This document defines the authoritative terminology used by the POLR Protocol and enumerates explicit non-claims—statements that POLR does not make and must not be represented as making. The purpose of this lexicon is to prevent semantic drift, reduce misinterpretation, and provide a common vocabulary for implementers, auditors, governance bodies, platforms, and external stakeholders.

This document introduces no new protocol semantics. In the event of conflict, standards-track RFCs take precedence.

Status of This Memo

This memo is informational. Distribution is unlimited. Updates are governed by RFC-POLR-0002.

1. Purpose and Rationale

POLR’s security depends as much on language discipline as on cryptography. Many protocol failures arise not from broken proofs but from ambiguous terminology, overloaded words, or implied claims that exceed what can be verified.

This lexicon freezes POLR’s core vocabulary and enumerates explicit non-claims to ensure that correct attestations are not laundered into false guarantees.

2. Terminology Principles

The following principles govern POLR terminology.

Precision over familiarity
Terms are selected to minimize ambiguity, even when they require definition.

One claim per term
Each defined term corresponds to a single, bounded claim.

Negative space is explicit
What POLR does not claim is as important as what it does claim.

Layer alignment
Terms map cleanly to Layer A (Anthropicity), Layer B (Attribution), or Layer C (Identity).

3. Core Defined Terms

Anthropicity
The condition in which a digital artifact is cryptographically attested as having been created or authorized by a human being, as distinct from a juridical or artificial entity.

Anthropicity Attestation
A Layer A attestation that binds a content digest to a zero-knowledge proof of verified-human membership at a specific time.

Verified Human
A member of an accepted anthropicity provider’s membership set. This term does not imply legal identity verification or uniqueness beyond provider-defined guarantees.

Additive Human Assurance
An optional, signer-level confidence signal derived from qualifying real-world proximity encounters. It refines confidence in anthropicity without expanding its semantic claim.

Attribution
An asserted claim of authorship, contribution, or creative role bound to an anthropicity-verified artifact. Attribution may be anonymous, pseudonymous, named, or collective.

Attribution Attestation
A Layer B attestation asserting one or more attribution claims and referencing a valid anthropicity attestation.

Identity
A verifiable binding between an attribution claim and an identity credential for accountability in legal, contractual, or institutional contexts.

Identity Binding Attestation
A Layer C attestation that cryptographically links attribution attestations to identity credentials under defined validity and revocation conditions.

Verification
The deterministic evaluation of POLR attestations against protocol rules to confirm which layers are present and valid.

Verification Profile
A domain-specific interpretation framework that specifies artifact models, required layers, and representation constraints without expanding protocol claims.

4. Deprecated or Disallowed Terms

The following terms are deprecated or disallowed in POLR contexts due to ambiguity or overreach.

Provenance (as a synonym for Layer A)
Use anthropicity instead. Provenance is broader and includes lifecycle and authorship context not claimed by POLR Layer A.

Verified Content
Disallowed without explicit layer qualification. Must be replaced with layer-specific statements.

Human-Made
Disallowed. POLR does not distinguish between human-only and human-authorized AI-assisted creation.

Trusted Content
Disallowed. Trust is an interpretive judgment outside protocol scope.

5. Explicit Non-Claims (Normative Interpretation Constraint)

POLR does not claim, assert, prove, or guarantee any of the following.

Ownership or licensing rights

Originality or novelty

Authorship correctness or exclusivity

Contribution magnitude or creative merit

Factual accuracy or truthfulness

Editorial quality or integrity

Legal compliance

Non-AI creation

Creation circumstances or location

Intent, effort, or good faith

Absence of deception

These non-claims apply regardless of which layers are present.

6. Permitted Claims by Layer (Summary)

Layer A — Anthropicity

Permitted:

A verified human authorized the creation or publication of this artifact at a specific time.

Not permitted:

Any claim listed in Section 5.

Layer B — Attribution

Permitted:

The following attribution claims are asserted for this artifact.

Not permitted:

Correctness, exclusivity, or ownership of attribution.

Layer C — Identity

Permitted:

The attribution claims are bound to an identity credential valid under specified conditions.

Not permitted:

Legal enforceability or jurisdictional validity beyond credential scope.

7. Representation Guidance

Platforms and intermediaries MUST:

use defined terms consistently

disclose verified layers explicitly

avoid language that implies non-claims

When in doubt, representations SHOULD err toward under-claiming rather than over-claiming.

8. Use in Governance and Dispute Resolution

Governance bodies, auditors, and working groups SHOULD reference this lexicon when:

reviewing proposed RFCs

evaluating platform representations

addressing claims of protocol misuse

Language violations are treated as semantic security issues.

9. Evolution of This Lexicon

New terms MAY be added only when required to clarify existing semantics. Removal or redefinition of terms requires governance review proportional to the affected layer.

This lexicon is intended to stabilize POLR’s language over time.

10. References

RFC-POLR-0000

RFC-POLR-0001

RFC-POLR-0002

RFC-POLR-0003

RFC-POLR-0005

RFC-POLR-0008

End of RFC-POLR-0009
