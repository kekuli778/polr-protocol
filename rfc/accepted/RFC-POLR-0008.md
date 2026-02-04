POLR Protocol Change Log and Migration Notes
Category: Informational / Governance Support
Status: Draft
Version: 1.0
Date: 2026-02-04

Abstract

This document records significant semantic, structural, and terminological changes to the POLR Protocol over time and provides authoritative migration guidance for implementers, governance participants, and auditors.

Its primary purpose is to preserve institutional memory, prevent re-litigation of settled design decisions, and ensure that protocol evolution does not result in semantic drift or claim inflation.

This document introduces no new protocol semantics. In the event of conflict, standards-track RFCs take precedence.

Status of This Memo

This memo is informational. Distribution is unlimited. Updates are governed by RFC-POLR-0002.

1. Purpose and Scope

POLR is designed to be long-lived. Over time, terminology, document structure, and explanatory framing may evolve while core cryptographic and semantic guarantees remain stable.

This RFC:

records major protocol changes and their rationale

clarifies what changed versus what remained invariant

provides migration guidance for implementers

serves as a canonical reference for governance and audit discussions

This RFC does NOT:

modify protocol claims

define new requirements

supersede normative RFCs

2. Versioning Model

POLR RFCs use semantic versioning at the document level. Not all document version changes imply protocol-level semantic changes.

The following distinctions apply:

Editorial Change
Clarification, rewording, or reorganization with no semantic effect.

Terminological Change
Renaming or reframing of concepts without altering protocol guarantees.

Semantic Change
Modification of claims, guarantees, or verification semantics.

Only semantic changes require governance scrutiny equivalent to the affected layer.

3. Major Change Record

3.1 Provenance → Anthropicity (Layer A Renaming)

Affected Documents:

RFC-POLR-0001

RFC-POLR-0002

RFC-POLR-0003

RFC-POLR-0004

RFC-POLR-0005

RFC-POLR-0006

RFC-POLR-0007

Change Type:

Terminological and clarifying (non-semantic)

Description:

Early drafts of POLR referred to Layer A as “Provenance.” Subsequent review identified that provenance, in its strict sense, subsumes attribution, identity, and lifecycle context. Using the term for the base layer created ambiguity and encouraged overinterpretation.

Layer A was renamed to “Anthropicity” to precisely describe its ontological claim: that a human being created or authorized the publication of a specific artifact.

Invariants:

No cryptographic mechanisms changed

No new claims were introduced

Layer ordering and dependencies remained identical

Human-in-the-loop authorization remained explicitly permitted

What This Change Does NOT Mean:

It does not narrow or expand the set of valid artifacts

It does not prohibit AI-assisted creation

It does not assert authorship, originality, or identity

Migration Guidance:

Implementations MAY continue to verify older attestations labeled as “provenance” if they conform to the Layer A semantics defined in RFC-POLR-0001.

User-facing language SHOULD be updated to “anthropicity” or “human-authorized publication.”

3.2 Clarification of Layer Ordering (A → B → C)

Change Type:

Clarifying (non-semantic)

Description:

POLR formalized the dependency ordering as Anthropicity → Attribution → Identity, explicitly noting that attribution may be anonymous or pseudonymous and therefore cannot depend on identity.

Invariants:

No changes to attestation schemas

No new disclosure requirements

Migration Guidance:

No migration required. Implementers SHOULD ensure that verification logic does not require identity for attribution.

3.3 Formalization of Additive Human Assurance (Layer A+)

Change Type:

Clarifying (non-semantic)

Description:

The proximity mechanism was explicitly designated as an additive assurance to Layer A, not as an independent layer or semantic expansion.

Invariants:

Proximity remains optional

Proximity does not assert creation circumstances or location

Migration Guidance:

Platforms MUST NOT treat proximity as a prerequisite for baseline anthropicity verification.

4. Deprecated Concepts and Terms

The following terms are deprecated in POLR context:

“Provenance” when used to describe only Layer A

“Verified content” without layer qualification

“Human-made” as a synonym for anthropicity

Deprecated terms MAY appear in historical documents but SHOULD NOT be used in new specifications or user interfaces.

5. Backward Compatibility Statement

POLR verification is designed to be backward compatible.

Accepted attestations remain verifiable as long as:

content digests match

cryptographic proofs verify

layer semantics are not violated

Terminological changes alone MUST NOT invalidate historical attestations.

6. Governance Implications

Terminological clarity is treated as a security concern.

Governance bodies SHOULD reference this RFC when:

addressing disputes about protocol meaning

evaluating claims of scope change

reviewing proposals that reintroduce deprecated terminology

7. Future Change Recording

All future protocol-affecting changes SHOULD be recorded in this RFC, including:

layer renaming or redefinition

semantic tightening or narrowing

explicit deprecations

This document serves as the canonical historical ledger of POLR evolution.

8. References

RFC-POLR-0001

RFC-POLR-0002

RFC-POLR-0003

RFC-POLR-0004

RFC-POLR-0005

RFC-POLR-0006

RFC-POLR-0007

RFC-POLR-0000

End of RFC-POLR-0008
