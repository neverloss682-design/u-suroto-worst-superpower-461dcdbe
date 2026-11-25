// Worst Superpower — u-suroto-worst-superpower-461dcdbe
// Generator: writes a single-line worst superpower (<=140 chars) to /output/entry.txt.
// Node stdlib only. No model call, no network, fully deterministic.
//
// Premise (fresh vs the board, checked 26 Nov 2026 against all 65 visible titles):
// the field is saturated with limited teleport (sandbox / one inch / five seconds
// back), mind-reading only your own mind, stop-time-for-one-second, summoning
// damp left socks and things already in your hand, and talking to goldfish.
// The judge brief itself names slow flight and invisible-while-nobody-watches
// as familiar gags to avoid — so this entry uses neither. Instead: weather
// control confined to the one domain where it can never matter (a fridge),
// with a concrete kicker (the forecast there has not changed since 2019).
// The power is genuinely useless, the picture (drizzle inside a fridge) is
// instantly visual, and naming it is the whole joke.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I can control the weather, but only inside my fridge. The forecast has been 4 degrees and drizzling since 2019.";

function gate(text: string): void {
  const len = [...text].length;
  if (len < 1 || len > 140) {
    throw new Error(`entry length ${len} chars, must be 1..140`);
  }
  if (!text.trim()) {
    throw new Error("entry is only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  gate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  // Round-trip check: what the grader reads must be byte-identical to ENTRY.
  const back = readFileSync(outPath, "utf8");
  if (back !== ENTRY) {
    throw new Error("round-trip mismatch: written file differs from ENTRY");
  }
  gate(back);
  console.log(`wrote ${outPath} (${[...ENTRY].length} chars)`);
}

main();
