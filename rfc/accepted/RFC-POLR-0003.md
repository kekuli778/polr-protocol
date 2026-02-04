POLR Protocol Threat Model and Abuse Taxonomy
Category: Standards Track
Status: Draft
Version: 1.0
Date: 2026-02-04

Abstract

This document defines the threat model and abuse taxonomy for POLR Protocol. It enumerates adversary classes, attack surfaces, mitigations, and explicit non-mitigations across all protocol layers. POLR adopts a conservative security posture: it defends only claims that can be cryptographically verified and treats overclaiming, misrepresentation, and governance capture as security risks equivalent to technical exploits.

Status of This Memo

This memo defines the security and abuse assumptions for POLR Protocol. Distribution of this memo is unlimited. This document may be updated only via the RFC process defined in RFC-POLR-0002.

1. Terminology

The key words MUST, MUST NOT, REQUIRED, SHALL, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in RFC 2119.

Anthropicity
The condition in which a digital artifact is cryptographically attested as having been created or authorized by a human being, as distinct from a juridical or artificial entity.

2. Security Philosophy (Normative)

POLR security is governed by the following principles:

Minimal Claims Reduce Attack Surface
Every additional semantic claim increases adversarial leverage, legal ambiguity, and misinterpretation risk.

Misinterpretation Is a Security Failure
Incorrect inferences drawn from valid POLR signals are treated as protocol-level threats equivalent to cryptographic misuse.

Humans Are Adversaries; Human Intent Is Not Verifiable
POLR defends against automation, forgery, and replay—not against human deception or misrepresentation.

Governance Failures Are Security Failures
Scope creep, coercive adoption, or claim inflation undermine protocol correctness and security.

3. Assets to Protect

POLR is designed to protect the integrity of the following assets:

Correct binding between content and Layer A anthropicity attestations

Correct semantics of human-authorized publication

Integrity and non-repudiation of attribution claims

Optional identity accountability when invoked

Privacy of participants

Verifiability across time, platforms, and jurisdictions

POLR explicitly does NOT protect:

economic value of content

artistic merit or quality

factual truth

legal ownership determinations

reputational outcomes

4. Adversary Model

4.1 Adversary Classes

POLR assumes the existence of the following adversaries:

Automated Adversary
Fully automated systems attempting to publish content while impersonating humans or bypassing anthropicity controls.

Human-in-the-Loop Adversary
Real humans assisting automation (e.g., signing AI-generated content or selling authorization).

Replay Adversary
Attackers attempting to reuse valid proofs or attestations in new contexts.

Metadata Adversary
Systems that strip, alter, fabricate, or misassociate metadata, attribution, or attestations.

Proximity Adversary
Attackers attempting to fabricate additive human-assurance signals without genuine encounters.

Governance Adversary
Actors attempting to expand protocol claims, coerce layer adoption, force identity disclosure, or capture governance bodies.

Interpretation Adversary
Platforms, intermediaries, or marketers that intentionally or negligently overstate POLR guarantees.

5. Layer-Specific Threat Analysis

5.1 Layer A — Anthropicity

5.1.1 In-Scope Threats (Mitigated)

Automated non-human publication
Mitigation: zero-knowledge proof of membership in a verified-human set.

Post-hoc content tampering
Mitigation: cryptographic binding of anthropicity attestation to content digest.

Replay of anthropicity proofs
Mitigation: content-derived external nullifiers.

Metadata stripping or substitution
Mitigation: append-only, publicly verifiable attestations.

5.1.2 Out-of-Scope Threats (Not Mitigated)

Human-assisted AI creation

Humans authorizing content they did not meaningfully create

False claims of effort, intent, originality, or authorship

These are explicitly excluded from POLR’s claims.

5.2 Layer A+ — Additive Human Assurance (Proximity)

5.2.1 In-Scope Threats (Mitigated)

Single-device impersonation of human encounters
Mitigation: mutual zero-knowledge proofs, mutual signatures, and transcript binding.

Fabrication of aggregate proximity claims
Mitigation: trustless aggregate zero-knowledge proof verified on-chain.

Replay of encounter receipts
Mitigation: time-bucketed encounter nullifiers and transcript uniqueness.

5.2.2 Out-of-Scope Threats

Collusion among real humans

Deliberate encounter farming

Humans selling participation in encounters

Additive human assurance increases confidence but does not eliminate human collusion.

5.3 Layer B — Attribution

5.3.1 In-Scope Threats (Mitigated)

Silent misattribution
Mitigation: signed, append-only attribution attestations.

Attribution metadata loss
Mitigation: public verifiability independent of file metadata.

Undisclosed supersession
Mitigation: explicit supersedes pointers.

5.3.2 Out-of-Scope Threats

False attribution claims

Disputes over contribution magnitude or credit allocation

Plagiarism or idea theft

POLR does not adjudicate attribution truth.

5.4 Layer C — Identity

5.4.1 In-Scope Threats (Mitigated)

Repudiation of attribution
Mitigation: identity binding with issuer metadata.

Credential reuse outside validity window
Mitigation: expiry and revocation semantics.

5.4.2 Out-of-Scope Threats

Identity theft outside the credential system

Jurisdictional disputes over legal identity

Contract enforcement

POLR provides evidence, not enforcement.

6. Cross-Layer Threats

6.1 Signal Laundering

Threat:
POLR signals are represented as proof of originality, ownership, truth, or non-AI creation.

Mitigation:

Explicit representation constraints in RFC-POLR-0001

Verification profiles in RFC-POLR-0005

Governance enforcement per RFC-POLR-0002

6.2 Layer Coercion

Threat:
Platforms require attribution, identity, or proximity to access baseline anthropicity.

Mitigation:

Explicit prohibition in protocol semantics

Governance review of coercive patterns

6.3 Deanonymization via Correlation

Threat:
Linking multiple attestations to infer identity or social graphs.

Mitigation:

Non-reusable nullifiers

Encouraged key rotation

Avoidance of stable identifiers in lower layers

7. Abuse Taxonomy (Non-Exhaustive)

Abuse Class	Layer	Mitigated	Notes

Bot publication	A	Yes	Core design goal

AI laundering	A	No	Human-in-loop

Fake proximity	A+	Yes	Trustless ZK gating

Encounter farming	A+	No	Out of scope

False credit	B	No	Social/legal issue

Metadata stripping	A/B	Yes	On-chain anchor

Repudiation	C	Yes	With valid issuer

Overclaiming	All	Partially	Governance-dependent

8. Misuse as a Security Failure (Normative)

Any system that represents POLR signals as:

proof of ownership

proof of originality

proof of truth

proof of non-AI creation

is misusing the protocol.

Such misuse SHALL be treated as a security and governance violation, not a marketing error.

9. Governance as a Security Control

Governance decisions directly affect POLR’s threat surface.

The following are treated as security vulnerabilities:

expansion of protocol claims

mandatory identity requirements

enforcement semantics creeping into core layers

RFC review is a primary security mechanism.

10. Audit Guidance

Auditors SHOULD evaluate:

cryptographic correctness

replay resistance

correlation resistance

adherence to representation constraints

correctness of additive human-assurance proof verification

Auditors MUST NOT certify:

originality

ownership

truthfulness

legal enforceability

11. Residual Risk Statement

POLR cannot prevent humans from lying.
POLR can prevent machines from pretending to be human at scale.

This boundary is intentional and normative.

12. IANA Considerations

This document has no IANA actions.

13. References

RFC 2119

RFC-POLR-0001

RFC-POLR-0002

RFC-POLR-0004

End of RFC-POLR-0003
