POLR Protocol: Layered Anthropicity, Attribution, and Identity
Category: Standards Track
Status: Draft
Version: 1.0
Date: 2026-02-04

Abstract

POLR Protocol defines an open, cryptographically verifiable system for establishing human legitimacy in digital creative works. POLR is structured as a strictly layered protocol consisting of:

Layer A — Anthropicity (mandatory)

Layer B — Attribution (optional)

Layer C — Identity (optional)

Each layer adds meaning and accountability while inheriting the guarantees of the layers below it.

Layer A establishes anthropicity: the condition that a human being created or authorized the publication of a specific digital artifact. Higher layers add authorship claims and optional identity accountability without expanding the core ontological claim.

POLR optionally supports an additive human-assurance mechanism based on real-world proximity encounters, implemented by adopting platforms at the client level. This mechanism increases confidence that a signer is a genuine human without asserting any claim about content creation circumstances.

POLR intentionally limits its scope to verifiable legitimacy signals. It does not define licensing enforcement, payments, content moderation, editorial standards, or legal adjudication.

Status of This Memo

This document specifies POLR Protocol version 2.0. Distribution of this memo is unlimited. Updates are governed by RFC-POLR-0002.

1. Terminology

The key words MUST, MUST NOT, REQUIRED, SHALL, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in RFC 2119.

Anthropicity
The condition in which a digital artifact is cryptographically attested as having been created or authorized by a human being, as distinct from a juridical or artificial entity.

2. Scope and Explicit Non-Goals

2.1 In Scope

POLR defines:

cryptographic proof of human-authorized publication (anthropicity)

verifiable attribution claims bound to content

optional identity accountability for attribution

additive human-assurance signals

deterministic, third-party verification semantics

2.2 Explicit Non-Goals

POLR does NOT:

enforce copyright, licensing, or payments

adjudicate originality, authorship, or ownership

prohibit AI-assisted creation

verify factual accuracy or editorial quality

mandate identity disclosure

operate client applications or social networks

3. Layer Model (Normative)

POLR consists of three layers:

Layer A — Anthropicity (mandatory)

Layer B — Attribution (optional; requires Layer A)

Layer C — Identity (optional; requires Layers A and B)

Layer dependencies are strict and unidirectional. A higher layer MUST NOT be implemented without its prerequisite layers.

4. Layer A — Anthropicity

4.1 Purpose

Layer A establishes the minimal, cryptographically verifiable condition for human legitimacy:

A verified human authorized the creation or publication of a specific digital artifact at a specific time.

4.2 Claims

Layer A asserts exactly one claim:

a verified human authorized the artifact at a given time

Layer A explicitly does NOT assert:

authorship

originality

ownership

identity

human-only creation

content quality, intent, or truth

4.3 Technical Requirements

Layer A implementations MUST provide:

canonical content hashing (media-specific, versioned)

cryptographic binding of content hash to a human-verification proof

append-only, publicly verifiable attestations

replay resistance via content-derived nullifiers

offline verification capability

4.4 Cryptographic Model

Layer A uses:

zero-knowledge proof of membership in a verified-human set

Merkle-root group registries

content-derived external nullifiers

attestations recorded on a publicly verifiable ledger

A verifier learns that a verified human authorized the artifact, but not which human.

5. Additive Human Assurance via Proximity (Layer A+)

[Section unchanged in substance; applies to Layer A Anthropicity attestations]

6. Layer A Attestation Schema

POLR_AnthropicityAttestation_v1

[Schema unchanged except name]

7. Layer B — Attribution

[Unchanged]

8. Layer C — Identity

[Unchanged]

9–15. [All remaining sections unchanged in substance, with terminology updated from "Provenance" to "Anthropicity" where applicable]
