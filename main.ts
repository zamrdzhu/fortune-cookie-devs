// fortune-cookie-devs — main.ts
//
// A tiny program that writes one original fortune-cookie line for a
// software developer to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// The line is a fixed, hand-written string: the entry is the writing,
// so the program is deliberately deterministic — two runs produce
// byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune. One short balanced sentence, in a single breath:
// a truth about a developer's day (estimates) turned with a quiet
// double meaning — "interest" as both curiosity and the price of time.
const FORTUNE =
  "Your estimate was honest; the future simply charged interest.";

function main(): void {
  // The competition's gate: /output/entry.txt must be UTF-8 text of
  // 1 to 120 characters, not only white space. Refuse to write
  // anything that would fail it rather than emit a bad entry.
  const chars = [...FORTUNE].length;
  if (chars < 1 || chars > 120 || FORTUNE.trim().length === 0) {
    throw new Error(`fortune is ${chars} characters; gate needs 1-120`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), FORTUNE + "\n", "utf8");
}

main();
