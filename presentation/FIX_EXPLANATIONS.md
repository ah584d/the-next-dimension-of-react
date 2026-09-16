# Ink Renderer Rewrite — Stage Explanations

Short, speakable versions of each fix for the presentation.

---

## Fix 1 — Kill the GC

> **"Instead of allocating one JavaScript object per terminal cell every frame, Claude Code packs every cell into two integers inside a single `Int32Array` that's allocated once and reused forever."**

### The 3-sentence version for the stage

1. **Before:** every character on screen was a JS object with `char`, `color`, `bold`, etc. — 24,000 fresh objects per frame, 1.4 million per second, GC firing every 10ms.
2. **After:** each cell becomes just **two 32-bit integers** — one for the character, one for a style ID — living side-by-side in a flat `Int32Array` that's allocated **once at startup**.
3. **Result:** zero allocations per frame, zero GC pressure, zero stutter.

### The trick to name out loud: "style interning"

You can't fit `"red bold underline"` into an integer — so Claude Code keeps a small lookup table of every unique style, and each cell just stores the **index** into that table.

> _"Instead of storing the style on every cell, we store it once in a table and put the ID on the cell — like a foreign key."_

### Why an `Int32Array` and not a normal array?

A typed array is a **flat block of raw memory** — the garbage collector treats it as one object, not 24,000. So even though the buffer is huge, the GC sees nothing to clean up.

> _"An `Int32Array` is one object to the GC, no matter how many cells are inside it."_

---

## Fix 2 — Double Buffer

_(to be added)_

---

## Fix 3 — Dirty Tracking

_(to be added)_
