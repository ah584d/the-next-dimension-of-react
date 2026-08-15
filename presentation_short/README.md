# React Runs Your Terminal - 30-Minute Version

This is a shortened version of the original 35-minute ReactNext 2026 presentation, optimized for a 30-minute time slot.

## ⏱️ Timing Breakdown

| Block         | Time  | Duration   | Content                    |
| ------------- | ----- | ---------- | -------------------------- |
| 1. Hook       | 0:00  | 2 min      | Video demos + reveal       |
| 2. Context    | 2:00  | 3 min      | Architecture (streamlined) |
| 3. Live Build | 5:00  | 17 min     | Integrated API + coding    |
| 4. At Scale   | 22:00 | 4 min      | Anthropic optimizations    |
| 5. When/Why   | 26:00 | 2 min      | Decision framework         |
| 6. Close      | 28:00 | 2 min      | Thesis + contact           |
| **Total**     |       | **30 min** |                            |

## 🎯 Key Changes from Original

### ✂️ Removed

- **Block 5: Testing** (3 min) - Not essential for core message
- **Block 3: Core API** (as separate section) - Now integrated into live build
- **Extended ANSI details** - Shortened to quick overview

### 📝 Modified

- **Block 2: Context** (4 min → 3 min)
  - Streamlined ANSI escape sequence explanation
  - Faster pace through architecture diagrams
  - Focus on key concepts only

- **Block 4: Live Build** (14 min → 17 min)
  - **NEW**: Integrated Core API explanation
  - Explain Box, Text, hooks AS you use them
  - Learn by doing instead of separate theory section
  - Same depth, better flow

### ✅ Kept (Essential Content)

- Opening hook with video demos
- Architecture explanation (3 layers)
- Full live build demonstration
- Anthropic optimization story (credibility!)
- Decision framework (when to use Ink)
- Strong closing thesis

## 📂 File Structure

```
presentation_short/
├── slides.md                         # Main presentation file (modified)
├── pages/
│   ├── aboutme.md                    # Unchanged
│   ├── why-react.md                  # Unchanged
│   ├── block2-context-short.md       # Modified (streamlined)
│   ├── live-demo-bridge.md           # Unchanged
│   ├── live-demo-integrated.md       # NEW (17 min combined section)
│   ├── block5-optimization.md        # Unchanged (Anthropic story)
│   ├── block7-when.md                # Unchanged
│   └── block8-close.md               # Unchanged
├── components/                       # All copied unchanged
├── images/                           # All copied unchanged
├── public/                           # All copied unchanged
├── package.json                      # Copied unchanged
└── style.css                         # Copied unchanged
```

## 🎤 Presentation Notes

### Block 3: Live Build Strategy (17 min)

This is the main change. The section now:

1. **Quick API intro (1 min)** - Show Box, Text, useInput on one slide
2. **Environment check (1 min)** - Show start skeleton
3. **Step 1: Spinner (2 min)** - Explain useEffect while coding
4. **Step 2: Models (3 min)** - Explain use() and Suspense while coding
5. **Step 3: Input (3 min)** - Explain useState and useInput while coding
6. **Step 4: Chat (5 min)** - Explain useTransition and Static while coding
7. **Demo (3 min)** - Run the completed app, show all features

**Key Difference**: Instead of explaining all the API first then coding, you explain concepts AS you use them. This:

- Saves time (no redundant explanation)
- Improves learning (context + application together)
- Maintains momentum (no break between theory and practice)

### Timing Tips

**If Running Over** (cut in this order):

1. Shorten demo time (2 min instead of 3)
2. Skip one ANSI escape click (save 30 sec)
3. Streamline Anthropic section (hit the highlights only)

**If Running Under**:

1. Take questions after live demo
2. Show additional features from final code
3. Dive deeper into one optimization

### Backup Plans

1. **If live coding fails**:
   - Switch to final version immediately
   - Continue explaining using working code
   - Don't spend more than 30 seconds debugging

2. **Pre-record each step**:
   - Have 1-2 min clips of each implementation
   - Can switch to recorded version if needed
   - Still feels live, but safer

3. **Checkpoints**:
   - Have committed versions after each major component
   - Can switch to a checkpoint if needed

## 🚀 Running the Presentation

### Setup

```bash
npm install
npm run dev
```

### Development Mode

```bash
npm run dev
# Open http://localhost:3035
```

**Note**: This presentation runs on port **3035** (instead of the default 3030) so you can run both the original and short versions side-by-side for comparison.

### Export to PDF

```bash
npm run build
npm run export
```

## 🎯 Core Message (Don't Lose!)

> **"React isn't a web framework - it's a rendering paradigm. If you know React, you already know how to build terminal apps."**

Every slide should reinforce this message:

- Hook: Real tools people use are React apps
- Context: React's architecture makes this possible
- Live Build: Same patterns you already know
- At Scale: Production companies trust this
- When: Clear guidance on when to use it

## 📊 Success Criteria

After your presentation, the audience should:

1. ✅ Understand React works anywhere, not just browsers
2. ✅ See a real production tool built live
3. ✅ Know when to reach for Ink vs. simple CLI
4. ✅ Feel confident they could build one themselves
5. ✅ Remember: "If you know React, you already know this"

## 🔗 Resources

- Original presentation: `../presentation/`
- Implementation guide: `../code/start/IMPLEMENTATION_GUIDE.md`
- AI prompts: `../code/start/AI_AGENT_PROMPTS.md`
- Presentation strategy: `../code/start/PRESENTATION_STRATEGY.md`

## 📝 Speaker Notes

See the comments in each slide file (`<!--` ... `-->`) for detailed speaker notes and timing suggestions.

Key slides have specific notes:

- When to advance clicks
- What to say at each point
- Pacing suggestions
- Recovery strategies

---

**Good luck with your presentation! 🎤**

Remember: The live build is impressive, but it's okay if something goes wrong. Your knowledge and enthusiasm matter more than perfect execution.
