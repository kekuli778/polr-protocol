const apiBase = (globalThis as { POLR_API_BASE?: string }).POLR_API_BASE ?? "http://localhost:8787";
const output = document.getElementById("output") as HTMLPreElement;
const inputText = document.getElementById("inputText") as HTMLTextAreaElement;
const attestBtn = document.getElementById("attestBtn") as HTMLButtonElement;
const verifyBtn = document.getElementById("verifyBtn") as HTMLButtonElement;

let latestBundle: unknown = null;

const render = (value: unknown) => {
  output.textContent = JSON.stringify(value, null, 2);
};

attestBtn.addEventListener("click", async () => {
  const response = await fetch(`${apiBase}/attest/text`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: inputText.value, signerLabel: "demo-user" }),
  });
  const data = (await response.json()) as Record<string, unknown>;
  latestBundle = data;
  render(data);
});

verifyBtn.addEventListener("click", async () => {
  if (!latestBundle) {
    render({ error: "Create an attestation first" });
    return;
  }
  const response = await fetch(`${apiBase}/verify`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(latestBundle),
  });
  render(await response.json());
});
