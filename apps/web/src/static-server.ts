import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const mime: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const server = createServer(async (req, res) => {
  const url = req.url === "/" ? "/index.html" : req.url ?? "/index.html";
  const filePath = join(process.cwd(), "dist", url.replace(/^\//, ""));

  try {
    const file = await readFile(filePath);
    res.writeHead(200, { "content-type": mime[extname(filePath)] ?? "application/octet-stream" });
    res.end(file);
  } catch {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

const port = Number(process.env.PORT ?? 4173);
server.listen(port, "0.0.0.0", () => {
  console.log(`POLR web demo listening on ${port}`);
});
