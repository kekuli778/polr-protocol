POLR Anthropicity Provider Conformance Standard and Registry Rules
Category: Standards Track
Status: Draft
Version: 1.0
Date: 2024-02-04

Abstract

This document defines the POLR Anthropicity Provider Conformance Standard. It specifies the technical, security, privacy, and governance requirements that a provider MUST satisfy for its membership proofs to be accepted as valid evidence of anthropicity under POLR Layer A.

POLR does not define a single universal test of humanness. Instead, it defines minimum verifiable conditions that any enrollment system must meet to qualify as a POLR-accepted anthropicity provider. This preserves protocol integrity, avoids monoculture risk, and prevents trust dilution while allowing provider diversity.

Status of This Memo

This memo defines a Layer-A-critical POLR standard. Distribution is unlimited. Updates are governed by RFC-POLR-0002.

1. Purpose and Rationale (Normative)

POLR’s core claim — that a verified human created or authorized a publication — depends entirely on the integrity of upstream anthropicity providers.

Without a conformance standard:

claims of anthropicity become unbounded,

weak providers can dilute trust,

platforms cannot reason about assurance,

and adversaries can exploit weakest-link dynamics.

This RFC defines what it means to be a POLR-accepted anthropicity provider without freezing POLR into a single enrollment mechanism.

2. Scope

This RFC governs:

technical requirements for anthropicity providers

enrollment and membership semantics

cryptographic interface requirements

privacy and anonymity constraints

provider assurance tiers

registry admission, suspension, and removal

This RFC does NOT govern:

platform UX design

content verification semantics (RFC-POLR-0001)

additive human assurance mechanisms (RFC-POLR-0004)

attribution or identity layers

3. Definitions

Anthropicity Provider
An entity that enrolls users into a verified-human membership set and enables anonymous membership proofs compatible with POLR Layer A.

Enrollment
The process by which a user becomes a member of a provider’s verified-human set.

Identity Commitment (IC)
A cryptographic commitment derived from a user-controlled secret, used as a leaf in a Merkle membership tree.

Epoch
A discrete time interval during which a provider’s membership root is considered valid.

4. Mandatory Technical Interface (Normative)

A POLR-accepted anthropicity provider MUST implement all of the following.

4.1 Enrollment to Identity Commitment

The provider MUST:

generate or accept a user-controlled secret

derive an identity commitment from that secret

ensure identity commitments are unique per enrolled member

prevent one enrollment from minting multiple commitments

The provider MUST NOT require disclosure of real-world identity for baseline eligibility.

4.2 Merkle Tree Membership

The provider MUST:

maintain a Merkle tree of identity commitments

publish a Merkle root for each epoch

define epoch duration and update schedule

preserve historical roots for verification of past proofs

4.3 Zero-Knowledge Membership Proof Compatibility

The provider MUST support a zero-knowledge membership proof system compatible with POLR Layer A.

Public inputs:

Merkle root

epoch

external nullifier

signal hash

Outputs:

nullifier hash

Proofs MUST allow verifiers to confirm membership without learning the identity commitment or user identity.

4.4 Revocation and Expiration Semantics

The provider MUST define:

conditions for revocation or suspension

how revoked members affect future epochs

how historical proofs remain verifiable

Revocation MUST NOT retroactively invalidate prior epochs.

4.5 Provider Descriptor (Signed Metadata)

Each provider MUST publish a signed Provider Descriptor containing:

provider name and identifier

enrollment method summary

threat model overview

anti-automation and anti-sybil measures

privacy guarantees

epoch policy

audit references

signing keys used for root publication

Descriptors MUST be versioned and publicly accessible.

5. Minimum Security Properties (Normative)

An anthropicity provider MUST demonstrate the following properties.

5.1 Automation Resistance

Enrollment MUST materially increase the cost of automated, non-human enrollment at scale.

Mechanisms MAY include:

interactive challenges

behavioral signals

hardware-assisted liveness

rate limiting and anomaly detection

POLR specifies the property, not the mechanism.

5.2 Sybil Friction

Providers MUST prevent trivial mass enrollment, including machine-speed parallel signups.

5.3 Replay Resistance

Providers MUST prevent reuse of one enrollment to mint multiple identity commitments.

5.4 Abuse Monitoring and Response

Providers MUST:

monitor for large-scale abuse

define response procedures

disclose systemic compromise events

Monitoring MUST NOT require deanonymizing compliant users.

5.5 Key and Incident Management

Providers MUST define:

key rotation policies

incident response procedures

disclosure timelines

6. Privacy Requirements (Normative)

A POLR-accepted anthropicity provider MUST:

minimize data collection

avoid stable cross-session identifiers exposed to verifiers

not publish social graphs

document data retention policies

allow users to rotate secrets and re-enroll

Tier A0 and A1 providers MUST NOT require legal identity.

7. Provider Assurance Tiers

POLR defines assurance tiers to enable platform policy without overclaiming.

7.1 Tier A0 — Baseline

Characteristics:

online enrollment

interactive or behavioral human test

rate limiting and abuse detection

anonymous membership

This tier is the minimum acceptable for POLR Layer A.

7.2 Tier A1 — Stronger

Characteristics:

hardware binding or secure element use

stronger liveness or interaction guarantees

higher enrollment friction

Still anonymous.

7.3 Tier A2 — Strongest (Optional)

Characteristics:

multi-session enrollment

multi-party vouching or delayed activation

MAY include optional identity checks

Identity MUST NOT be mandatory unless POLR scope explicitly changes.

8. Registry Admission and Governance

8.1 Admission Criteria

To be admitted, a provider MUST:

satisfy Sections 4 through 7

publish a Provider Descriptor

undergo governance review per RFC-POLR-0002

Admission does not imply endorsement.

8.2 Registry Maintenance

The registry MUST:

assign a unique provider_id

track root updates and epochs

preserve historical data

8.3 Suspension and Removal

A provider MAY be suspended if:

cryptographic assumptions fail

systemic abuse is demonstrated

conformance violations occur

Suspension affects future epochs only. Historical verification MUST remain possible.

9. Interaction with Other POLR Layers

Layer A anthropicity proofs MUST reference provider_id and epoch.

Additive human assurance mechanisms MAY require participants to belong to accepted providers.

Attribution and identity layers inherit provider assurance implicitly.

No layer MAY redefine provider semantics.

10. Conformance Testing

Provider conformance SHOULD be evaluated using:

enrollment stress tests

simulated automation attacks

proof verification tests

registry update tests

Test vectors SHOULD be incorporated into RFC-POLR-0006.

11. Security Considerations

Weak anthropicity providers are a systemic risk. Failure to enforce this RFC constitutes a Layer-A security failure.

12. IANA Considerations

This document has no IANA actions.

13. References

RFC 2119

RFC-POLR-0001

RFC-POLR-0002

RFC-POLR-0003

RFC-POLR-0004

RFC-POLR-0006

End of RFC-POLR-0007
