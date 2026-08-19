---
layout: center
clicks: 6
---

## The Three Layers

<ArchitectureDiagram :step="$clicks" />

<!--
[click 1] Layer 1 — "This is what most React devs see: components, JSX, hooks"
[click 2] Layer 2 — "The reconciler is what React actually IS"
[click 3] Pluggable badge — "Layer 3 is a plug: you can swap the renderer"
[click 4] react-dom — "Browser: what you already know"
[click 5] react-native — "iOS/Android: same model, different target"
[click 6] ink — "TODAY: we plug in a terminal renderer"

30-MIN VERSION: Same, but move faster through the explanation
-->

---
layout: center
clicks: 6
---

## The terminal has no DOM

<TerminalPipeline :step="$clicks" />

<!--
STREAMLINED VERSION: Faster explanation, focus on key concept

[step 0] "Terminal = two byte streams. stdin in, stdout out. No DOM. Ink builds everything in between."
[click 1] setState() — "Your component calls setState"
[click 2] React runs — "React re-runs changed components"
[click 3] Reconciler — "Patches Ink's tree"
[click 4] Ink + Yoga — "Flexbox layout"
[click 5] Build Screen — "Paints every cell"
[click 6] Diff + stdout — "Writes only changes as ANSI bytes"

"Same mental model as React's DOM reconciliation. Diff and apply. But the DOM is a 2D cell grid."
-->

---
layout: center
clicks: 3
---

## ANSI Escape Sequences (Quick)

<AnsiExplainer :step="$clicks" />

<!--
SHORTENED: Just show the concept quickly, don't explain every detail

[click 1] ESC — "Control sequence"
[click 2] 32 = green — "Color codes"
[click 3] Terminal renders — "That's how colors and positioning work"

"These are the bytes Ink writes to stdout. That's all you need to know."
Move on quickly - not the focus of this talk.
-->
