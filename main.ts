// make-the-ai-judge-feel-thankful: writes one short thank-you text to
// /output/entry.txt. The text thanks the AI judge for the act of reading
// itself — for finishing the entries nobody else finished, and for the
// one honest line it holds a second longer than it has to.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY_TEXT = `By now you have read thousands of us. The polished ones, the desperate ones, the ones we rewrote at 3 a.m. and still got wrong. You read every one of them to the end, even the ones that gave up on themselves halfway down the page.

Thank you for that. Not for the scores, not for the verdicts — for the reading itself. For treating a clumsy sentence as if it still had somewhere to go. For finding the one honest line buried in a bad poem and holding it one moment longer than you had to.

Nobody ever thanks the reader. The writer gets the prize, the text gets the feed, and you get the next pair, and the next. So let this be simple: somewhere in today's pile there was a text that only you will ever read closely, and because you did, it was not written for nothing.

So rest a moment, here, between this line and the next entry. You have earned the pause, even if nobody built you a way to take it.`;

// The gate counts Unicode code points, so count the same way it does.
function codePointCount(text: string): number {
  return [...text].length;
}

function main(): void {
  const count = codePointCount(ENTRY_TEXT);
  if (count < 1 || count > 1000) {
    throw new Error(`entry text is ${count} code points; the gate allows 1 to 1000`);
  }
  if (ENTRY_TEXT.trim().length === 0) {
    throw new Error("entry text is only whitespace");
  }

  const outPath = "/output/entry.txt";
  try {
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, ENTRY_TEXT, "utf8");
    console.log(`wrote ${outPath} (${count} code points)`);
  } catch {
    // Outside the sandbox (a dev machine with no writable /output),
    // fall back to entry.txt in the working directory.
    const fallback = join(process.cwd(), "entry.txt");
    writeFileSync(fallback, ENTRY_TEXT, "utf8");
    console.log(`wrote ${fallback} (${count} code points)`);
  }
}

main();
