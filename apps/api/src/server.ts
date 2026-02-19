import { createServer } from "node:http";
import {
  ProviderRegistry,
  PolrVerifier,
  canonicalizeText,
  createAnthropicityAttestation,
  createAnthropicityProof,
  createAttributionAttestation,
  type VerificationBundle,
} from "../../../packages/core/dist/index.js";

const json = (status: number, payload: unknown) => ({
  status,
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload, null, 2),
});

const registry = new ProviderRegistry();
registry.addProvider({
  providerId: "provider-main",
  name: "Main Provider",
  assuranceTier: "A1",
  epochDurationSeconds: 3600,
  publicKeys: ["pk-main"],
  issuedEpochs: [1, 2, 3, 4, 5],
});

const verifier = new PolrVerifier(registry, {
  attributionSignerSecrets: { "did:example:author": "author-secret" },
});

const parseBody = (req: any): Promise<unknown> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });

const server = createServer(async (req, res) => {
  if (!req.url || !req.method) {
    const r = json(400, { error: "Invalid request" });
    res.writeHead(r.status, r.headers).end(r.body);
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    const r = json(200, { ok: true, service: "polr-api" });
    res.writeHead(r.status, r.headers).end(r.body);
    return;
  }

  if (req.method === "POST" && req.url === "/attest/text") {
    const body = (await parseBody(req)) as { text?: string; signerLabel?: string };
    const canonical = canonicalizeText(body.text ?? "");
    const proof = createAnthropicityProof({
      providerId: "provider-main",
      epoch: 5,
      root: "root-5",
      artifactDigest: canonical.digest,
    });
    const anthropicity = createAnthropicityAttestation({
      profile: "POLR-TEXT-POST-1.0",
      canonicalization: { kind: canonical.kind, version: canonical.version },
      artifactDigest: canonical.digest,
      proof,
    });
    const attribution = createAttributionAttestation({
      anthropicityUid: anthropicity.uid,
      claims: [{ role: "author", label: body.signerLabel ?? "anonymous" }],
      signer: "did:example:author",
      signerSecret: "author-secret",
    });

    const r = json(200, { anthropicity, attribution });
    res.writeHead(r.status, r.headers).end(r.body);
    return;
  }

  if (req.method === "POST" && req.url === "/verify") {
    const bundle = (await parseBody(req)) as VerificationBundle;
    const result = verifier.verify(bundle);
    const r = json(result.ok ? 200 : 422, result);
    res.writeHead(r.status, r.headers).end(r.body);
    return;
  }

  const r = json(404, { error: "Not found" });
  res.writeHead(r.status, r.headers).end(r.body);
});

const port = Number(process.env.PORT ?? 8787);
server.listen(port, "0.0.0.0", () => {
  console.log(`POLR API listening on ${port}`);
});
