# Presentation Strategy - 30 Minute Version

## 📊 Analysis Summary

**Original Presentation**: 35 minutes (for ReactNext 2026)
**Your Constraint**: 30 minutes maximum
**Difference**: Need to cut 5 minutes

**Original Author**: Tal Moskovich (Senior Fullstack Engineer @ ImagenAI)
**Target Audience**: React developers at ReactNext conference

---

## 🎯 Core Message (Don't Lose This!)

> **"React isn't a web framework - it's a rendering paradigm. If you know React, you already know how to build terminal apps."**

The presentation demonstrates this by:

1. Showing real tools people use (Claude Code, Prisma, Gatsby CLI)
2. Explaining the architecture (reconciler vs renderer)
3. Live building a working AI terminal chat
4. Showing production optimizations (Anthropic case study)

---

## ✂️ What to Cut: Detailed Analysis

### Option 1: Cut Testing Block (Recommended) ⭐

**Remove**: Block 5 - Testing (3 minutes)

**Rationale**:

- Testing is good practice but not core to the "React works in terminals" message
- Audience can read testing docs later
- The live demo already proves the code works
- Saves 3 minutes

**Additional time savings**:

- Shorten Boris Cherny backstory in Block 1: save 30 seconds
- Streamline ANSI escape details in Block 2: save 1 minute
- Integrate Core API (Block 3) into Live Build (Block 4): save 1.5 minutes

**Total saved**: ~6 minutes (gives you buffer time!)

---

### Option 2: Shorten Live Build

**Modify**: Block 4 - Live Build (from 14 to 9 minutes)

**Rationale**:

- Pre-build some skeleton code
- Show key moments, skip repetitive typing
- Focus on React patterns, not implementation details

**Risk**: ⚠️ Live coding is the main attraction - shortening it weakens impact

---

### Option 3: Skip At Scale Block

**Remove**: Block 6 - At Scale (4 minutes)

**Rationale**:

- Saves 4 minutes
- Optimization details are advanced topic

**Risk**: ⚠️ Loses the Anthropic credibility story and real-world validation

---

## ✅ Recommended: Option 1 (Modified Structure)

This keeps the strongest content while fitting 30 minutes:

```
┌─────────────────────────────────────────────────────────────┐
│ BLOCK 1: THE HOOK                                   2 min   │
├─────────────────────────────────────────────────────────────┤
│ • Show Claude Code demo video                               │
│ • The reveal: "They're all React apps"                      │
│ • Quick stats: 38k stars, 3.7M downloads/week               │
│ • Cut: Boris Cherny origin story (interesting but not key)  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ BLOCK 2: HOW IT WORKS                               3 min   │
├─────────────────────────────────────────────────────────────┤
│ • The three layers diagram (Components → Reconciler → Renderer) │
│ • Pluggable renderer concept                                │
│ • Terminal pipeline (stdin → React → Ink → ANSI → stdout)  │
│ • Quick ANSI example (don't deep dive)                      │
│ • Streamlined: less detail, faster pace                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ BLOCK 3: LIVE BUILD (with integrated API)          17 min   │
├─────────────────────────────────────────────────────────────┤
│ Setup (1 min)                                               │
│ • Show start skeleton                                       │
│ • Brief: "Box = div, Text = span, useInput = events"        │
│                                                             │
│ Implement Spinner (2 min)                                   │
│ • Code the useEffect + interval                             │
│ • Explain: "Same React patterns you know"                   │
│                                                             │
│ Model Selection (3 min)                                     │
│ • Implement use() hook with Suspense                        │
│ • Explain: "React 19 feature, works anywhere"               │
│ • Add keyboard navigation                                   │
│                                                             │
│ Text Input (3 min)                                          │
│ • Build controlled input                                    │
│ • Explain: "useState, just like web React"                  │
│                                                             │
│ Chat Component (5 min)                                      │
│ • Add useTransition for streaming                           │
│ • Implement Static component                                │
│ • Explain: "Non-blocking updates, prevents jank"            │
│ • Add file attachments                                      │
│                                                             │
│ Demo (3 min)                                                │
│ • Run the app                                               │
│ • Show streaming responses                                  │
│ • Show file attachments working                             │
│ • "This is production-quality code"                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ BLOCK 4: AT SCALE - Anthropic Story                4 min   │
├─────────────────────────────────────────────────────────────┤
│ • "Claude Code team rewrote the renderer"                   │
│ • Problem: 24k objects per frame = GC stutter                │
│ • Fix 1: Int32Arrays instead of objects                     │
│ • Fix 2: Double buffering                                   │
│ • Fix 3: Dirty tracking                                     │
│ • Result: Smooth streaming, no GC pressure                  │
│ • Key point: "React stayed, renderer changed"               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ BLOCK 5: WHEN TO USE THIS                          2 min   │
├─────────────────────────────────────────────────────────────┤
│ • Decision flow: "Does it need real-time state?"            │
│ • YES → Ink is worth it                                     │
│ • NO → console.log is fine                                  │
│ • Mention @inkjs/ui for components                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ BLOCK 6: CLOSING                                    2 min   │
├─────────────────────────────────────────────────────────────┤
│ • Thesis: "React = UI as function of state"                 │
│ • "DOM was always just one target"                          │
│ • "You already know how to do this"                         │
│ • Show QR code + contact info                               │
│ • "The next tool you build could be one too"                │
└─────────────────────────────────────────────────────────────┘

Total: 30 minutes (with perfect timing)
```

---

## 🎬 Delivery Tips

### Before Presenting

**Technical Setup**:

- [ ] Test your demo environment thoroughly
- [ ] Have `.env` with OPENAI_API_KEY ready
- [ ] Open `start` folder in IDE
- [ ] Have `final` folder ready as backup
- [ ] Test your screen sharing/projection
- [ ] Verify terminal font size is readable

**Backup Plans**:

- [ ] Record yourself doing each implementation step (1-2 min clips)
- [ ] If live coding fails, switch to recorded version
- [ ] Have the final version running to show if needed
- [ ] Screenshots of key moments

**Practice**:

- [ ] Run through the presentation 3 times
- [ ] Time each section
- [ ] Practice the live coding (muscle memory)
- [ ] Know what to say while typing

---

### During the Live Build

**The Secret to Good Live Coding**:

1. **Explain WHILE typing**, not after:

   ```
   ❌ BAD:  [types code in silence] → "So here I added useEffect..."
   ✅ GOOD: "I'm adding useEffect to..." [types while talking]
   ```

2. **Use autocomplete/snippets**:
   - Prepare snippets for longer code blocks
   - Type the interesting parts live
   - Paste boilerplate quickly

3. **Narrate your intent**:

   ```
   "Now I need state for the frame index..."
   "Let's add useInput to handle keyboard events..."
   "I'll use useTransition because this is async..."
   ```

4. **Connect to React knowledge**:
   - "This is useState, like you'd use in a web app"
   - "Same useEffect, just renders to terminal"
   - "useTransition - React 19, works everywhere"

5. **If you get stuck**:
   - DON'T debug live for more than 30 seconds
   - Say: "Let me show you the working version"
   - Switch to final folder
   - Continue explaining

---

### Managing Time During Presentation

**Use a Timer**:

- Set phone timer for checkpoints
- 2 min: should be ending Block 1
- 5 min: should be ending Block 2
- 22 min: should be ending Block 3
- 26 min: should be ending Block 4

**If Running Over**:

- Skip deep dives in At Scale (just show the main point)
- Skip one of the implementation steps (use final code)
- Shorten demo time (just show it working briefly)

**If Running Under**:

- Add more explanation during live coding
- Take questions during natural breaks
- Show additional features from final version

---

## 🎨 Slide Presentation vs. Live Demo Balance

The original presentation uses Slidev (markdown slides with Vue components).

### Your Options:

#### Option A: Slides + Live Demo (Recommended)

```
Use slides for:
• Opening hook (videos, diagrams)
• Architecture explanations (visual diagrams)
• At Scale section (before/after metrics)
• Closing (thesis statements)

Use live terminal for:
• The actual live coding session
• The final demo
• Real-time interaction
```

**Benefits**:

- Visual learners get diagrams
- Live coding shows it's real
- Professional polish
- Easy to time

---

#### Option B: All Terminal (Bold Choice)

```
Build everything in the terminal, even the slides!
```

**Benefits**:

- Ultimate proof of concept
- Extremely memorable
- Meta: "even these slides are React terminal"

**Risks**:

- Harder to show architecture diagrams
- More preparation needed
- Technical failure more visible

---

#### Option C: Slides Only, No Live Coding

```
Show code snippets in slides
Demo the final version
```

**Benefits**:

- No live coding risk
- Precise timing
- Comprehensive coverage

**Risks**:

- Less impressive
- Feels more like a lecture
- Miss the "wow" factor

---

## 📝 Presentation Script (Key Moments)

### Opening (30 seconds)

```
[Show Claude Code video]

"What does Claude Code have in common with GitHub Copilot CLI,
Prisma, Gatsby, and the Canva CLI?"

[pause 2 seconds]

"They're all React apps. Just not in your browser."
```

### Architecture Moment (1 minute)

```
[Show three layers diagram]

"React has three layers. Most developers only see layer 1: components,
JSX, hooks. But the reconciler - layer 2 - is what React actually IS.
It's pluggable. The DOM is just one possible target.

Today, we're plugging in the terminal."
```

### Live Build Start (30 seconds)

```
[Show start folder]

"I'm going to build a working AI chat in the next 15 minutes.
If you know React, you already know how this works.

Let's start with a spinner..."
```

### Live Build Throughout

```
[While typing]
"This is useState... same as web React..."
"useEffect for the animation... nothing special..."
"Box is like div, Text is like span..."
"useTransition - React 19, same API..."
```

### Demo Moment (15 seconds)

```
[Run the completed app]

"And there it is. Streaming AI responses, file attachments,
real-time updates. This is production-quality code."
```

### At Scale Hook (30 seconds)

```
"Now here's where it gets interesting. Claude Code's team had a problem.
The stock Ink renderer was allocating 24,000 objects per frame.
The garbage collector was firing every 10 milliseconds.
You could see the stutter in the token stream."
```

### At Scale Conclusion (30 seconds)

```
"They rewrote the renderer. React stayed the same - same components,
same hooks. They just optimized how those updates become terminal output.

That's the power of React's architecture."
```

### Closing (45 seconds)

```
"React is an abstraction for describing UI as a function of state.

The DOM was always just one possible target.

If you know React, you already know how to build terminal apps.

The next tool you build could be one too."

[Show QR code]

"All the code, slides, and resources are here. Thank you!"
```

---

## 🎤 Handling Questions

**During the Presentation**:

- Hold questions until the end (to keep timing)
- Or, if confident: take 1-2 questions after live demo

**Common Questions to Prepare For**:

**Q: "Why not just use Node.js directly?"**
A: "For simple CLIs, you should! But for stateful UIs with real-time updates, React's component model is much easier to maintain."

**Q: "What about performance?"**
A: "That's what the Anthropic section covered. Stock Ink is fine for most tools. For production apps with high throughput, you optimize the renderer."

**Q: "Can I use my React component library?"**
A: "Not directly - it's DOM-specific. But @inkjs/ui provides terminal equivalents. And you can port your logic/hooks easily."

**Q: "What about colors/styling?"**
A: "Ink uses color props. For complex styling, there's the 'ink-gradient' and similar packages. It's simpler than CSS but adequate."

**Q: "Does this work on Windows?"**
A: "Yes! Ink handles cross-platform ANSI sequences. Windows Terminal supports modern escape codes."

---

## ✅ Final Checklist

**Content**:

- [ ] Cut testing section
- [ ] Integrate API explanation into live build
- [ ] Streamline ANSI escape details
- [ ] Keep Anthropic story (credibility)
- [ ] Strong opening and closing

**Technical**:

- [ ] Demo environment tested
- [ ] Backup videos recorded
- [ ] Final version ready to show
- [ ] Screen sharing tested
- [ ] Font size readable

**Timing**:

- [ ] Practiced full run-through 3x
- [ ] Each section timed
- [ ] Checkpoints noted
- [ ] Buffer time identified

**Backup Plans**:

- [ ] Screen recordings ready
- [ ] Final version ready
- [ ] Can switch if live coding fails
- [ ] Know which parts to cut if over time

---

## 🎯 Success Criteria

After your presentation, the audience should:

1. **Understand** that React works anywhere, not just browsers
2. **See** a real production tool built live
3. **Know** when to reach for Ink vs. simple CLI scripts
4. **Feel** confident they could build one themselves
5. **Remember** the core message: "If you know React, you already know this"

**The Ultimate Test**: Someone in the audience goes home and builds their first Ink app that week.

---

## 💡 Final Advice

**On Live Coding**:

> "Live coding is not about perfection. It's about showing the process. If you make a mistake, acknowledge it, fix it, and move on. It makes you relatable."

**On Timing**:

> "It's better to finish at 28 minutes with strong content than to rush through 30 minutes. Leave them wanting more, not checking their watches."

**On Technical Failures**:

> "Have backups, but don't apologize profusely if something breaks. Say 'Let me show you the working version' and move on confidently."

**On Audience Connection**:

> "This audience knows React. Use that! Say 'This is useState, like you use every day' not 'Let me explain useState...'"

---

## 🚀 You've Got This!

Your presentation has:

- ✅ Strong hook (real tools people use)
- ✅ Clear value (React skills transfer)
- ✅ Live proof (build it in front of them)
- ✅ Real-world validation (Anthropic case study)
- ✅ Actionable takeaway (when to use it)

The content is solid. The demos are impressive. The message is clear.

Now go build confidence through practice, and deliver it with energy!

Good luck! 🎤✨
