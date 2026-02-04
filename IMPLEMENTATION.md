Implementation Overview

This repository contains non-normative reference implementations of the POLR
Protocol. The protocol itself is defined exclusively by the RFC documents in
rfc/accepted/.

Current Tooling Stack

The current reference implementation uses the following tooling:

- Node.js (LTS)
- TypeScript (strict mode)
- pnpm workspaces
- turborepo for task orchestration
- Hardhat for Solidity contract development
- circom and snarkjs for zero-knowledge circuits

These choices are implementation details, not protocol requirements. They may
change over time without affecting POLR Protocol semantics or verification
compatibility.

Design Constraints

All reference implementations must:
- Preserve RFC-defined semantics
- Enforce strict layer separation
- Remain interoperable with independent implementations
- Avoid introducing tooling-specific claims into the protocol
