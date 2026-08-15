# React Terminal AI Chat - Implementation Guide

## 🎯 Project Goal

This project demonstrates **building a production-quality AI terminal chat application using React and Ink**. The goal is to show that React isn't just for browsers - the same component model, hooks, and patterns work perfectly for terminal UIs.

### What the Application Does

- **Model Selection**: Browse and select from available OpenAI models with keyboard navigation
- **AI Chat**: Real-time streaming chat with AI models
- **File Attachments**: Attach files to messages using `@` mentions with fuzzy search
- **File Picker**: Interactive file browser with keyboard navigation
- **React 19 Features**: Demonstrates `use()` hook, `useTransition()`, and `Suspense` in a terminal context

### What the Author Demonstrates

The progression from `start` to `final` shows:

1. **React Fundamentals in Terminal**: How React patterns translate to terminal UIs
2. **Async Operations**: Handling async data fetching with `use()` and `Suspense`
3. **Keyboard-Driven UIs**: Building interactive terminal interfaces with `useInput`
4. **Streaming Data**: Managing real-time AI responses with React state
5. **Performance Patterns**: Using `useTransition` for non-blocking updates
6. **Complex State Management**: Reducer pattern for file picker state
7. **Component Composition**: Building reusable terminal UI components

---

## 📋 Implementation Steps

### Step 1: Implement the Spinner Component

**File**: `src/components/Spinner.tsx`

**Current State**: Empty component returning `<></>`

**Goal**: Create an animated spinner using React's `useEffect` for timing

**What to Add**:

- Use `useEffect` to set up an interval that cycles through animation frames
- Update frame index every 80ms
- Display current frame with label text
- Clean up interval on unmount

**Key Concepts**:

- Side effects in React (useEffect)
- Interval timing
- Component lifecycle

---

### Step 2: Implement the Model Selector API

**File**: `src/api/fetchModels.ts`

**Current State**: Exports a Promise instead of a function

**Goal**: Fix the API to return a function that creates a Promise (compatible with React 19's `use()` hook)

**What to Change**:

- Change `fetchModels` from being a called function that returns a promise to just being the function itself
- This allows the component to control when the promise is created
- Ensures the promise is stable across renders

**Key Concepts**:

- React 19's `use()` hook requirements
- Promise stability
- Function vs. function call

---

### Step 3: Implement Model Selection UI

**File**: `src/components/ModelSelect.tsx`

**Current State**: Returns `<Spinner />` placeholder

**Goal**: Build interactive model selection list with keyboard navigation

**What to Add**:

1. Create stable promise at module level: `const modelsPromise = fetchModels()`
2. Use `use(modelsPromise)` to unwrap the models data
3. Add `cursor` state for tracking selected model
4. Implement `useInput` for arrow key navigation and Enter to confirm
5. Render models list with visual cursor indicator
6. Show help text for keyboard shortcuts

**Key Concepts**:

- React 19's `use()` hook
- Suspense boundaries
- Keyboard input handling
- List navigation patterns

---

### Step 4: Implement Text Input Component

**File**: `src/components/TextInput.tsx`

**Current State**: Returns `<Spinner />` placeholder

**Goal**: Build a controlled text input with file picker integration

**What to Add**:

1. Add `value` state for input text
2. Use `useFilePicker` hook to manage file attachments
3. Implement `useInput` to handle:
   - Regular character typing
   - Backspace for deletion
   - Enter to submit
   - Guard against input when file picker is active or reading files
4. Display input prompt with cursor
5. Show attached files as badges
6. Show "reading…" state when loading file contents
7. Conditionally render `<FilePicker>` component when active

**Key Concepts**:

- Controlled inputs in terminal
- Conditional rendering
- Custom hook composition
- Input event handling

---

### Step 5: Fix Streaming Hook State Management

**File**: `src/hooks/useStream.ts`

**Current State**: Clears state (`setContent("")`, `setError(null)`) at the end of the `send` function

**Goal**: Fix race condition by clearing state at the START of the function

**What to Change**:

- Move `setContent("")` and `setError(null)` from the end to the beginning of `send`
- This prevents the previous stream's content from briefly appearing when starting a new stream

**Key Concepts**:

- State timing and race conditions
- Async state updates
- User experience considerations

---

### Step 6: Implement Complete Chat Component

**File**: `src/components/Chat.tsx`

**Current State**: Empty `handleSubmit` function and only returns `<TextInput />`

**Goal**: Build full chat interface with message history, streaming responses, and file attachments

**What to Add**:

1. **Import additions**:
   - `useTransition` from React
   - `Static`, `useInput` from Ink

2. **State and hooks**:
   - `const [isPending, startTransition] = useTransition()`
   - Use existing `messages`, `content`, `error`, `send`

3. **Keyboard input**:
   - Implement `useInput` for 'q' key to quit (only when not pending)

4. **Submit handler**:
   - Check for empty input or pending state
   - Build file context from attachments (XML format)
   - Create user message with display text separate from full content
   - Add message to history
   - Use `startTransition` to wrap async AI call
   - After response, append assistant message

5. **Render structure**:

   ```tsx
   <Box flexDirection="column" padding={1}>
     {/* Static scrollback area */}
     <Static items={...}>
       {/* Header + past messages */}
     </Static>

     {/* Current streaming response */}
     {isPending && <MessageRow with content or Spinner />}

     {/* Error display */}
     {error && <Text color="red">...</Text>}

     {/* Input (only when not pending) */}
     {!isPending && <TextInput onSubmit={handleSubmit} />}
   </Box>
   ```

**Key Concepts**:

- `useTransition` for non-blocking updates
- `Static` component for terminal scrollback
- File context formatting (XML structure)
- Display text vs. full content separation
- Conditional rendering based on state

---

### Step 7: Minor Refactoring

**File**: `src/utils/fileList.ts`

**Current State**: Uses `promisesCache` variable name

**Goal**: Rename to `cache` for clarity

**What to Change**:

- Rename `promisesCache` → `cache` throughout the file
- This is just a code quality improvement

---

### Step 8: Add Visual Flourish (Optional)

**File**: `src/components/il.tsx`

**Current State**: File doesn't exist

**Goal**: Add an Israeli flag ASCII art component (presenter appears to be from Israel)

**What to Add**:

- Create new file with React component
- Display ASCII art Israeli flag using Box and Text components
- This is a personal touch / easter egg

---

## 🤖 AI Agent Instructions for Each Step

### General Setup for All Steps

```
You are helping implement a React + Ink terminal application step by step.

Context:
- This is a terminal UI application using React (via Ink library)
- The app lets users chat with AI models with file attachment support
- We're using React 19 features (use hook, useTransition, Suspense)
- The app already has a complete file picker system and utilities

Tech Stack:
- React 19.2.6
- Ink 7.0.3
- TypeScript
- Vercel AI SDK (for streaming)
- OpenAI API

Before making changes:
1. Read the current file content
2. Understand the existing imports and dependencies
3. Check related components/hooks for reference
4. Ensure TypeScript types are correct
```

---

### Step 1: Spinner Component

```
Task: Implement an animated spinner component

File: src/components/Spinner.tsx

Requirements:
1. Import useEffect from 'react'
2. The FRAMES constant is already defined
3. Create an interval that updates the frame index every 80ms
4. Return the frame animation with the label text
5. Clean up the interval on unmount
6. Use cyan color for the spinner text

Implementation hints:
- Use setInterval inside useEffect
- Cycle through frames using modulo: (prev + 1) % FRAMES.length
- Return cleanup function from useEffect
- Display: FRAMES[frame] followed by label (default "Thinking...")

Testing:
- The spinner should animate smoothly
- Should show different frames cycling through
- Should clean up when component unmounts
```

---

### Step 2: Fix fetchModels API

```
Task: Fix the fetchModels export to work with React 19's use() hook

File: src/api/fetchModels.ts

Current Issue:
- The code exports `fetchModels` as a called function that returns a Promise
- This creates a new Promise on every import, which breaks React's use() hook

Fix Required:
- Keep fetchModelsFn() as the implementation
- Export `fetchModels` as the function itself, not a called promise
- This allows components to control when the promise is created

Implementation:
- Remove the line: export const fetchModels = fetchModelsFn();
- Rename fetchModelsFn to fetchModels
- The function should be exported directly

Why this matters:
- React 19's use() hook requires a stable Promise reference
- Creating the promise at call site gives us control over when it's created
- This is demonstrated in ModelSelect.tsx with: const modelsPromise = fetchModels()
```

---

### Step 3: Model Selection UI

```
Task: Implement interactive model selection with keyboard navigation

File: src/components/ModelSelect.tsx

Current State:
- ModelList component returns <Spinner />
- No keyboard handling
- No UI for model selection

Requirements:
1. Create a stable promise: const modelsPromise = fetchModels()
2. Use use(modelsPromise) to unwrap models data
3. Add cursor state: const [cursor, setCursor] = useState(0)
4. Implement useInput for:
   - upArrow: decrease cursor (min 0)
   - downArrow: increase cursor (max models.length - 1)
   - return key: call onSelect with selected model ID
5. Render a Box with:
   - Round border, yellow color
   - Header: "Select a model:"
   - List of models with cursor indicator (❯ for selected)
   - Help text: "↑/↓ navigate · Enter to confirm"

Visual structure:
┌─ Select a model: ─┐
│   model-1          │
│ ❯ model-2          │  (green when selected)
│   model-3          │
│ ↑/↓ navigate...    │
└────────────────────┘

Testing:
- Models should load with spinner fallback
- Arrow keys should move cursor
- Enter should select model
- Cursor should highlight in green
```

---

### Step 4: Text Input Component

```
Task: Implement a fully functional terminal text input with file picker

File: src/components/TextInput.tsx

Current State:
- Component returns <Spinner />
- No input handling

Requirements:
1. Keep existing value state
2. Use the useFilePicker hook (already imported and called)
3. Implement useInput with these handlers:
   - Guard: if file picker active or reading, return early
   - Enter: call onSubmit(value, attachments), then clear value
   - Backspace/Delete: remove last character from value
   - Regular input: append character to value (skip ctrl/meta keys)
4. Render structure:
   - Green prompt: "❯ "
   - Current value text
   - If reading: yellow " reading…"
   - If has attachments: yellow " [file1, file2]"
   - Green cursor: "█"
   - Conditionally render <FilePicker> when active

The FilePicker component integration:
- useFilePicker returns: { filePicker, attachments, isReading }
- filePicker has: { active, query, cursor }
- Pass query and cursor to FilePicker component

Visual output:
❯ hello @src/█
  [src/App.tsx]

When file picker open:
❯ @src/█
┌─ Files ─┐
│ ❯ App.tsx │
│   index.tsx │
└───────────┘

Testing:
- Should type characters normally
- Enter should submit
- @ should open file picker
- Backspace should delete characters
- Should show attached files
```

---

### Step 5: Fix Streaming State

````
Task: Fix race condition in streaming hook

File: src/hooks/useStream.ts

Current Issue:
- setContent("") and setError(null) are called at the END of the send function
- This means the previous stream's content briefly shows when starting a new stream

Fix Required:
- Move these two lines to the START of the send function
- They should be the first lines inside send, before the accumulated variable

Current (wrong):
```typescript
const send = async (messages: Message[]): Promise<string> => {
  let accumulated = "";
  // ... streaming logic ...
  setContent("");  // ❌ Too late!
  setError(null);
  return accumulated;
};
````

Correct:

```typescript
const send = async (messages: Message[]): Promise<string> => {
  setContent(""); // ✅ Clear immediately
  setError(null);
  let accumulated = "";
  // ... streaming logic ...
  return accumulated;
};
```

Why this matters:

- Better user experience: old content doesn't flash before new stream
- Prevents confusion about which message is being streamed
- Proper state initialization for each new request

```

---

### Step 6: Complete Chat Component

```

Task: Implement full chat interface with message history and streaming

File: src/components/Chat.tsx

Current State:

- handleSubmit is empty
- Only renders TextInput
- No message display

This is the most complex component. Break it down:

PART A - Imports and State:

1. Add imports: useTransition from React, Static and useInput from Ink
2. Add state: const [isPending, startTransition] = useTransition()

PART B - Keyboard Input: 3. Implement useInput:

- If user presses 'q' and not isPending: call exit()
- This allows quitting the chat

PART C - Submit Handler: 4. Implement handleSubmit(value: string, attachments: Record<string, string>):

- Guard: if (!value.trim() || isPending) return
- Build fileContext: map attachments to XML format:
  <file name="filename">
  content
  </file>
- Create userMsg with:
  - role: "user"
  - content: fileContext + value (full content for AI)
  - displayText: value (what user sees)
- Create nextMessages array: [...messages, userMsg]
- Update messages state with nextMessages
- Use startTransition to wrap:
  - const finalText = await send(nextMessages)
  - setMessages(prev => [...prev, { role: "assistant", content: finalText }])

PART D - Rendering: 5. Replace the single <TextInput /> with full structure:
<Box flexDirection="column" padding={1}>
{/_ Past messages - Static prevents re-render of old content _/}
<Static items={[
{ type: "header" },
...messages.map(msg => ({ type: "message", msg }))
]}>
{(item, i) => {
if (item.type === "header") return <Header key={i} model={model} />;
return <MessageRow key={i} msg={item.msg} />;
}}
</Static>

     {/* Current streaming response */}
     {isPending && (
       <Box flexDirection="column" marginBottom={1}>
         <Text color="green" bold>AI</Text>
         <Box paddingLeft={2}>
           {content ? <Text>{content}</Text> : <Spinner />}
         </Box>
       </Box>
     )}

     {/* Error display */}
     {error && <Text color="red">Error: {error.message}</Text>}

     {/* Input - disabled while streaming */}
     {!isPending && <TextInput onSubmit={handleSubmit} />}

   </Box>

Key Concepts:

- Static component: Terminal "scrollback" area that doesn't re-render
- useTransition: Marks AI responses as non-urgent, keeps UI responsive
- File attachments: Formatted as XML for AI context
- Display vs full content: User sees clean text, AI gets full context
- Conditional rendering: Only show input when not streaming

Testing:

- Should display past messages in Static area
- Should show streaming content in real-time
- Should disable input while AI is responding
- Should support file attachments in messages
- Press 'q' to quit

```

---

### Step 7: Minor Refactoring

```

Task: Rename cache variable for clarity

File: src/utils/fileList.ts

Simple refactor:

- Find: promisesCache
- Replace: cache
- Update all occurrences (3 places)

This is just a code quality improvement - no functional change.

```

---

### Step 8: Optional Visual Flourish

```

Task: Add Israeli flag component

File: src/components/il.tsx (NEW FILE)

This is optional - it's a personal touch from the presenter.

Create a new component that displays an ASCII art Israeli flag:

- Two blue stripes (top and bottom)
- Star of David in the middle
- Use Box and Text components from Ink
- Use blue color for stripes and star
- White space between elements

This can be shown as an easter egg or during the presentation intro.

```

---

## 🎤 Presentation Analysis & Recommendations

### Original Presentation Structure (35 minutes)

| Block          | Time  | Duration | Content                                               |
| -------------- | ----- | -------- | ----------------------------------------------------- |
| 1 · Hook       | 10:05 | 2 min    | The reveal — tools you use daily are React apps       |
| 2 · Context    | 10:07 | 4 min    | How React renderers work, what Ink is                 |
| 3 · Core API   | 10:11 | 5 min    | Box, Text, hooks — the mental model                   |
| 4 · Live Build | 10:16 | 14 min   | Build an AI CLI (env setup, streaming, React 19)      |
| 5 · Testing    | 10:30 | 3 min    | Test CLI components with Vitest + ink-testing-library |
| 6 · At Scale   | 10:33 | 4 min    | What production apps do differently — and why         |
| 7 · When/Why   | 10:37 | 2 min    | When to reach for this + @inkjs/ui                    |
| 8 · Close      | 10:39 | ~30 sec  | Final thought + links                                 |

### Analysis for 30-Minute Presentation

**Sections to Keep (Core Value)**:
1. ✅ **Hook (2 min)** - Essential opener, gets attention
2. ✅ **Context (4 min)** - Critical for understanding, shows architecture
3. ✅ **Live Build (14 min)** - The main attraction, must keep
4. ✅ **At Scale (4 min)** - Real-world credibility, Anthropic case study
5. ✅ **When/Why (2 min)** - Important decision framework
6. ✅ **Close (30 sec)** - Clean ending

**Sections to Cut or Shorten**:
- ❌ **Core API (5 min)** - Can be integrated into Live Build as you go
- ⚠️ **Testing (3 min)** - Cut or mention briefly (not critical for core message)

---

### Recommended 30-Minute Version

#### Option A: Cut Testing, Integrate Core API
```

1. Hook (2 min) - Video + reveal
2. Context (4 min) - React architecture + ANSI
3. Live Build with API explanation (17 min) ⬅️ Extended
   - Explain Box, Text as you use them
   - Explain hooks in context
   - Build the actual app
4. At Scale (4 min) - Anthropic optimization case study
5. When/Why (2 min) - Decision framework
6. Close (1 min) - Thesis + contact

Total: 30 minutes

```

**Pros**:
- Keeps the most valuable content
- Learning by doing (API explained in context)
- Maintains the Anthropic credibility story

**Cons**:
- No explicit testing coverage
- Needs smooth transitions

---

#### Option B: Faster Live Build, Keep Testing
```

1. Hook (2 min) - Video + reveal
2. Context (3 min) - React architecture (shortened, skip some ANSI detail)
3. Core API (3 min) - Quick Box/Text/hooks overview
4. Live Build (12 min) ⬅️ Condensed
   - Skip some steps or pre-fill skeleton
   - Focus on key patterns
5. Testing (2 min) - Brief demonstration
6. At Scale (3 min) - Anthropic highlights only
7. When/Why (2 min) - Decision framework
8. Close (1 min)

Total: 28 minutes (+2 buffer)

```

**Pros**:
- Comprehensive coverage
- Shows testing practices
- More structured learning

**Cons**:
- Rushed feeling
- Less depth in each section
- Live coding risks

---

### My Recommendation: **Option A with Modifications**

#### Optimized 30-Minute Version

**Block 1: Hook (2 min)**
- ✅ Keep: Claude Code demo video
- ✅ Keep: The reveal about React
- Cut: Boris Cherny backstory (interesting but not essential)

**Block 2: Context (4 min)**
- ✅ Keep: Three layers diagram (reconciler, renderer)
- ✅ Keep: Terminal pipeline explanation
- Shorten: ANSI escape sequences (show quickly, don't explain every detail)

**Block 3: Live Build with Integrated API (17 min)** ⬅️ Main Event
- **0-2 min**: Environment check, show start skeleton
- **2-4 min**: Implement Spinner (explain useEffect while coding)
- **4-7 min**: Implement ModelSelect (explain use() hook, Suspense, Box/Text as you go)
- **7-10 min**: Implement TextInput (explain useInput hook in context)
- **10-13 min**: Implement Chat with streaming (explain useTransition, Static)
- **13-17 min**: Demo the completed app, show file attachments working

**Block 4: At Scale (4 min)**
- ✅ Keep: Anthropic optimization story
- ✅ Keep: The three fixes (GC, double buffer, dirty tracking)
- This gives real-world credibility

**Block 5: When/Why (2 min)**
- ✅ Keep: Decision flow diagram
- This helps audience know when to use Ink

**Block 6: Close (1 min)**
- ✅ Keep: Thesis statements
- ✅ Keep: Contact info + QR code

---

### Presentation Delivery Tips

**Before You Start**:
1. Have the `start` folder ready in your IDE
2. Have the `final` folder in a separate window for reference
3. Test your environment (Node, npm, OpenAI key)
4. Practice the live coding sections (know what to type)

**During Live Coding**:
1. Use code snippets/autocomplete to save time
2. Explain WHILE coding, not after
3. If you get stuck, don't debug live - switch to the final version
4. Consider having checkpoints: after each major component, commit or switch to a pre-made version

**Backup Plan**:
- If live coding fails, have screen recordings of each step
- Can switch to "let me show you what this looks like" mode
- The final demo is most important

**Engagement**:
- Ask the audience: "Who has built a CLI tool?" early on
- Point out familiar React patterns as you code
- Emphasize: "This is just React, nothing magical"

---

### Alternative: Pre-recorded Micro-demos

If live coding feels risky, consider this hybrid:
1. Record short clips of each implementation step (1-2 min each)
2. Play the clip
3. Show the result live
4. Explain what happened

This gives you:
- Perfect timing
- No live coding failures
- Still feels interactive
- Can pause for questions

---

## 🎯 Summary

**Stick to original presentation**: ❌ No, it's too long (35 min vs 30 min needed)

**Recommended approach**: Option A - Cut Testing, integrate Core API into Live Build

**Key changes**:
1. Remove standalone Core API section (explain as you code)
2. Skip or briefly mention Testing (not critical for core message)
3. Keep Hook, Context, Live Build, At Scale, When/Why, Close
4. Practice the live coding sections thoroughly
5. Have the final version as backup

**Core message to drive home**:
> "If you know React, you already know how to build terminal apps. Same components, same hooks, different target. The next developer tool you build could be one too."

Good luck with your presentation! 🎤
```
