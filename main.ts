// Worst superpower: weather control that only works inside a fridge.
//
// The joke is the mismatch between the power and its range. Controlling
// the weather sounds godlike until the whole sky you command is a cold
// box humming in the kitchen. And the forecast there never changes:
// it has been 4 degrees and drizzling since 2019, a permanent damp
// chill that no amount of power can fix, because the power is the
// thing keeping it that way.
//
// This program just holds that one line, checks it against the
// competition's rules, and writes it out for grading.

const fs = require("fs");
const path = require("path");

const ENTRY =
  "I can control the weather, but only inside my fridge. The forecast has been 4 degrees and drizzling since 2019.";

// Banned phrases from the judge brief. The fridge forecast is the
// whole joke, so neither of these stock superpowers appears here.
const BANNED = ["slow flight", "invisible"];

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function checkEntry(text) {
  // Length is counted in code points, so any fancy character counts once.
  const length = [...text].length;
  if (length < 1 || length > 140) {
    fail(`entry must be 1..140 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    fail("entry must not be only whitespace");
  }
  if (text.includes("\r") || text.includes("\n")) {
    fail("entry must be a single line");
  }
  // The line is a finished sentence, so it must end with a full stop.
  if (!text.endsWith(".")) {
    fail("entry must end with a period");
  }
  const lowered = text.toLowerCase();
  for (const phrase of BANNED) {
    if (lowered.includes(phrase)) {
      fail(`entry must not contain banned phrase: ${phrase}`);
    }
  }
}

function main() {
  checkEntry(ENTRY);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outFile = path.join(outDir, "entry.txt");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, ENTRY, "utf8");

  // Round-trip check: what landed on disk must be byte-identical.
  const back = fs.readFileSync(outFile, "utf8");
  if (back !== ENTRY) {
    fail("round-trip check failed: entry.txt differs from ENTRY");
  }

  console.log(`wrote ${outFile} (${[...ENTRY].length} chars)`);
}

main();
