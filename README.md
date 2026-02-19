POLR Protocol

This repository contains the canonical specifications, governance artifacts,
reference implementations, and test vectors for the POLR Protocol.

Authoritative protocol semantics are defined exclusively by accepted RFCs.

Reference implementations in this repository currently use a TypeScript-first
tooling stack with Solidity and zero-knowledge circuits. These choices are
non-normative and may evolve independently of the POLR Protocol.

## Reference implementation layout

- `packages/core`: core data model, canonicalization, attestation generators,
  provider registry logic, and multi-layer verifier.
- `apps/api`: minimal HTTP API to issue text attestations and verify bundles.
- `apps/web`: browser demo that calls the API to create and verify attestations.

## Quick start

```bash
pnpm install
pnpm build
pnpm test
pnpm start:api
pnpm start:web
```

API defaults to `http://localhost:8787` and web UI defaults to
`http://localhost:4173`.
