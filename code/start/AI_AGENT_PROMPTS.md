# AI Agent Prompts - Step-by-Step Implementation

Use these prompts with an AI coding assistant (like GitHub Copilot, Claude, etc.) to implement each step of the React Terminal Chat application.

---

## Setup Context (Use Before Any Step)

```
I'm building a React terminal chat application using:
- React 19.2.6 with Ink 7.0.3 (terminal renderer)
- TypeScript
- Vercel AI SDK for streaming
- OpenAI API

Project structure:
- src/components/ - UI components
- src/hooks/ - Custom React hooks
- src/api/ - API functions
- src/utils/ - Utility functions
- src/state/ - Reducers

Please help me implement the following step. Read the current file first, understand the imports and structure, then make the necessary changes.
```

---

## Step 1: Implement Spinner Animation

```
Implement the Spinner component animation in src/components/Spinner.tsx

Current state: The component returns an empty fragment

Requirements:
1. Import useEffect from React
2. Add state for current frame index
3. Use useEffect to create an interval that updates the frame every 80ms
4. Cycle through FRAMES array using modulo operator
5. Return a Text component (cyan color) showing FRAMES[frame] and the label
6. Clean up interval on component unmount
7. Default label should be "Thinking..." if not provided

The FRAMES constant is already defined in the file.
```

---

## Step 2: Fix fetchModels API

```
Fix the fetchModels function in src/api/fetchModels.ts

Current issue: The function is called immediately and exported as a Promise, but React 19's use() hook needs a function that returns a Promise.

Required change:
1. Rename fetchModelsFn to fetchModels
2. Remove the line that exports the called function
3. Export the function itself (not a called promise)

This allows components to control when the promise is created.
```

---

## Step 3: Build Model Selection UI

```
Implement the ModelList component in src/components/ModelSelect.tsx

Current state: Returns a Spinner placeholder

Requirements:
1. At the top of the file (outside component), create: const modelsPromise = fetchModels()
2. Inside ModelList, use: const models = use(modelsPromise)
3. Add cursor state: const [cursor, setCursor] = useState(0)
4. Implement useInput for keyboard navigation:
   - upArrow: decrease cursor (minimum 0)
   - downArrow: increase cursor (maximum models.length - 1)
   - return key: call onSelect with models[cursor].id
5. Render a Box with round border (yellow) containing:
   - Bold yellow text header: "Select a model:"
   - List of models - map over models array
   - Show "❯ " for current cursor position, "  " for others
   - Current item should be green colored
   - Display model.label for each item
   - Add help text at bottom: "↑/↓ navigate · Enter to confirm" (dimColor)

The component is wrapped in Suspense, so loading state is handled.
```

---

## Step 4: Implement Terminal Text Input

```
Implement the TextInput component in src/components/TextInput.tsx

Current state: Returns a Spinner

Requirements:
1. Keep the existing useState for value
2. The useFilePicker hook is already called - use its returns: { filePicker, attachments, isReading }
3. Implement useInput with these handlers (in order):
   a. Guard: if filePicker.active or isReading, return early
   b. If Enter key: call onSubmit(value, attachments), then setValue("")
   c. If backspace/delete: remove last character from value
   d. For regular input (not ctrl/meta): append input to value

4. Render structure:
   <Box flexDirection="column">
     <Box>
       <Text color="green">❯ </Text>
       <Text>{value}</Text>
       {isReading && <Text color="yellow"> reading…</Text>}
       {!isReading && Object.keys(attachments).length > 0 && (
         <Text color="yellow"> [{Object.keys(attachments).join(", ")}]</Text>
       )}
       <Text color="green">█</Text>
     </Box>
     {filePicker.active && (
       <FilePicker query={filePicker.query} cursor={filePicker.cursor} />
     )}
   </Box>

FilePicker component is already implemented and imported.
```

---

## Step 5: Fix Streaming State Race Condition

```
Fix the state timing issue in src/hooks/useStream.ts

Current problem: setContent("") and setError(null) are called at the END of the send function, causing the previous stream's content to briefly show when starting a new stream.

Fix required:
Move these two lines:
  setContent("");
  setError(null);

From the end of the send function to the BEGINNING (right after "const send = async (messages: Message[]): Promise<string> => {")

They should be the first lines, before declaring "let accumulated = "";"

This ensures state is cleared immediately when a new stream starts.
```

---

## Step 6: Implement Complete Chat Interface

````
Implement the full Chat component in src/components/Chat.tsx

Current state: Empty handleSubmit and minimal rendering

This is complex, so break it into parts:

PART 1 - Add imports:
- useTransition from "react"
- Static, useInput from "ink"

PART 2 - Add state:
const [isPending, startTransition] = useTransition();

PART 3 - Add quit handler:
useInput((input) => {
  if (input === "q" && !isPending) exit();
});

PART 4 - Implement handleSubmit(value: string, attachments: Record<string, string>):
```typescript
if (!value.trim() || isPending) return;

const fileContext = Object.entries(attachments)
  .map(([name, content]) => `<file name="${name}">\n${content}\n</file>`)
  .join("\n");

const userMsg: Message = {
  role: "user",
  content: fileContext ? `${fileContext}\n\n${value}` : value,
  displayText: value,
};

const nextMessages = [...messages, userMsg];
setMessages(nextMessages);

startTransition(async () => {
  const finalText = await send(nextMessages);
  setMessages((prev) => [
    ...prev,
    { role: "assistant", content: finalText },
  ]);
});
````

PART 5 - Replace the return statement:

```tsx
return (
  <Box flexDirection="column" padding={1}>
    <Static
      items={
        [
          { type: "header" },
          ...messages.map((msg) => ({ type: "message" as const, msg })),
        ] satisfies StaticItem[]
      }
    >
      {(item, i) => {
        if (item.type === "header") return <Header key={i} model={model} />;
        return <MessageRow key={i} msg={item.msg} />;
      }}
    </Static>

    {isPending && (
      <Box flexDirection="column" marginBottom={1}>
        <Text color="green" bold>
          AI
        </Text>
        <Box paddingLeft={2}>
          {content ? <Text>{content}</Text> : <Spinner />}
        </Box>
      </Box>
    )}

    {error && <Text color="red">Error: {error.message}</Text>}
    {!isPending && <TextInput onSubmit={handleSubmit} />}
  </Box>
);
```

The Header and MessageRow subcomponents are already defined in the file.

```

---

## Step 7: Refactor Cache Variable

```

Simple refactoring in src/utils/fileList.ts

Change: Rename the variable "promisesCache" to "cache" throughout the file.

This is just a code quality improvement - the variable name "cache" is clearer and more concise.

There should be 3 occurrences to change:

1. The Map declaration
2. The .has() check
3. The .set() and .get() calls

````

---

## Testing Each Step

After implementing each step, test it:

**Step 1 (Spinner)**:
```bash
# The spinner should animate when you run the app
npm run dev
````

**Step 2-3 (Models)**:

```bash
# Should show model selection with keyboard navigation
npm run dev
# Try: arrow keys to move, Enter to select
```

**Step 4 (Input)**:

```bash
# After selecting model, input should work
# Type text, see cursor
# Try typing @ to open file picker
```

**Step 5-6 (Chat)**:

```bash
# Full app should work
npm run dev
# Select model
# Type message, press Enter
# Should see streaming response
# Try attaching files with @
# Press 'q' to quit
```

---

## Troubleshooting

**If models don't load**:

- Check OPENAI_API_KEY in .env file
- Verify internet connection
- Check console for API errors

**If streaming doesn't work**:

- Verify OPENAI_API_KEY is valid
- Check that useStream is called with correct model
- Look for errors in the error state

**If file picker doesn't work**:

- The file picker state and utilities are already complete
- Just ensure TextInput properly passes through the filePicker state

**If keyboard doesn't respond**:

- Make sure useInput is called in the component
- Check that input guards don't prevent all input
- Verify terminal supports the key codes

---

## Quick Implementation Checklist

- [ ] Step 1: Spinner animation working
- [ ] Step 2: fetchModels returns function (not promise)
- [ ] Step 3: Model selection with keyboard navigation
- [ ] Step 4: Text input with file picker
- [ ] Step 5: Stream state cleared at start
- [ ] Step 6: Full chat with message history
- [ ] Step 7: Cache variable renamed
- [ ] Testing: Full app works end-to-end

---

## Pro Tips for AI Agents

1. **Read before writing**: Always read the current file content first
2. **Preserve imports**: Don't remove existing imports, add new ones
3. **TypeScript**: Maintain proper types throughout
4. **Incremental**: Test after each step before moving to next
5. **Context**: Understand how components connect to each other
6. **Reference**: Look at similar components (FilePicker, ModelSelect) for patterns

---

## Final Verification

Once all steps are complete, your app should:

- ✅ Start with animated spinner while loading models
- ✅ Show model selection with arrow key navigation
- ✅ Accept text input with cursor indicator
- ✅ Support file attachments via @ mentions
- ✅ Stream AI responses in real-time
- ✅ Display message history
- ✅ Allow quitting with 'q' key
- ✅ Handle errors gracefully

Run: `npm run dev` and test all features!
