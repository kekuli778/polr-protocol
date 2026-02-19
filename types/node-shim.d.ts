declare class Buffer {
  static concat(chunks: readonly Buffer[]): Buffer;
  static from(input: string): Buffer;
  toString(encoding?: string): string;
}

declare const process: {
  cwd(): string;
  env: Record<string, string | undefined>;
};

declare module "node:crypto" {
  export function createHash(algo: string): {
    update(data: string | Buffer): { digest(enc: "hex"): string };
  };
  export function createHmac(algo: string, key: string): {
    update(data: string): { digest(enc: "hex"): string };
  };
}

declare module "node:test" {
  const test: (name: string, fn: () => void) => void;
  export default test;
}

declare module "node:assert/strict" {
  const assert: {
    equal(actual: unknown, expected: unknown): void;
    deepEqual(actual: unknown, expected: unknown): void;
    match(value: string, regex: RegExp): void;
  };
  export default assert;
}

declare module "node:http" {
  export function createServer(handler: (req: any, res: any) => void): {
    listen(port: number, host: string, cb?: () => void): void;
  };
}

declare module "node:fs/promises" {
  export function readFile(path: string): Promise<Uint8Array>;
}

declare module "node:path" {
  export function extname(p: string): string;
  export function join(...parts: string[]): string;
}
