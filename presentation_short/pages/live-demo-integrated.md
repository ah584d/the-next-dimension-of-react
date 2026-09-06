---
layout: section
---

# Live Build

## AI Terminal Chat (17 min)

<!--
This section combines Core API explanation with live coding.
Explain Box, Text, hooks AS YOU USE THEM in the build.
No separate "here's the API" section - learn by doing.
-->

---
layout: center
---

## Start Skeleton

```bash
npm run dev
```

<div class="demo-note">
  Show the empty app running
</div>

<style scoped>
.demo-note {
  margin-top: 20px;
  padding: 12px;
  background: #0C0F0C;
  border: 1px solid #1E3320;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: #6B9E6B;
}
</style>

<!--
1 MINUTE: Quick environment check
"Here's our starting point. Components are empty. Let's fill them in."
Show the start folder, briefly explain structure.
-->

---

### Step 1: Spinner (2 min)

```tsx {all|3|5-8|10-14}
import { Text, useEffect, useState } from "ink";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export const Spinner = ({ label }: { label?: string }) => {
  const [frame, setFrame] = useState(0);

  // Same useEffect you know from web React
  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % FRAMES.length);
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <Text color="cyan">
      {FRAMES[frame]} {label ?? "Thinking..."}
    </Text>
  );
};
```

<!--
EXPLAIN WHILE CODING:
"I need state for the frame index..."
"useEffect to set up an interval - same as you'd use in a web app..."
"Update every 80ms, cycle through frames..."
"Clean up on unmount - same lifecycle..."
"Return a Text component - like a span..."

Run it: "And there's our animated spinner!"
-->

---

### Step 2: Model Selection (3 min)

```tsx {all|1|4|5|7-11|13-24}
// Stable promise - called once at module level
const modelsPromise = fetchModels();

const ModelList = ({ onSelect }) => {
  const models = use(modelsPromise); // React 19!
  const [cursor, setCursor] = useState(0);

  useInput((_input, key) => {
    if (key.upArrow) setCursor((prev) => Math.max(0, prev - 1));
    if (key.downArrow)
      setCursor((prev) => Math.min(models.length - 1, prev + 1));
    if (key.return) onSelect(models[cursor].id);
  });

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="yellow">
      <Text bold color="yellow">
        Select a model:
      </Text>
      {models.map((model, i) => (
        <Text key={model.id} color={i === cursor ? "green" : undefined}>
          {i === cursor ? "❯ " : "  "}
          {model.label}
        </Text>
      ))}
      <Text dimColor>↑/↓ navigate · Enter to confirm</Text>
    </Box>
  );
};
```

<!--
EXPLAIN WHILE CODING:
"use() hook - React 19 feature, unwraps promises..."
"Cursor state - tracking which item is selected..."
"useInput - like event listeners, but for keyboard..."
"Box with flexDirection - just like flexbox..."
"Map over models - exactly like you'd do in web React..."

Demo: Show arrow keys working, selection working
-->

---

#### Step 3: Text Input (3 min)

```tsx {all|3|4|6-16|18-28}
export const TextInput = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const { filePicker, attachments, isReading } = useFilePicker(value, setValue);

  useInput((input, key) => {
    if (filePicker.active || isReading) return; // Guard

    if (key.return) {
      onSubmit(value, attachments);
      setValue("");
      return;
    }
    if (key.backspace) setValue((v) => v.slice(0, -1));
    if (input && !key.ctrl && !key.meta) setValue((v) => v + input);
  });

  return (
    <Box flexDirection="column">
      <Box>
        <Text color="green">❯ </Text>
        <Text>{value}</Text>
        {isReading && <Text color="yellow"> reading…</Text>}
        <Text color="green">█</Text>
      </Box>
      {filePicker.active && <FilePicker {...filePicker} />}
    </Box>
  );
};
```

<!--
EXPLAIN WHILE CODING:
"Controlled input - useState for the value..."
"useFilePicker - custom hook, handles @ mentions..."
"Guard against input when file picker is active..."
"Enter to submit, backspace to delete..."
"Regular input appends to value..."
"Render prompt, value, cursor - looks like a terminal!"
"File picker shows up when you type @"

Demo: Type some text, show @ file picker
-->

---

#### Step 4: Chat with Streaming (5 min)

```tsx {all|2|5|7-9|11-22|24-35}
export const Chat = ({ model }) => {
  const [isPending, startTransition] = useTransition(); // React 19!
  const [messages, setMessages] = useState([]);
  const { content, error, send } = useStream(model);

  useInput((input) => {
    if (input === "q" && !isPending) exit();
  });

  const handleSubmit = (value, attachments) => {
    if (!value.trim() || isPending) return;

    const fileContext = Object.entries(attachments)
      .map(([name, content]) => `<file name="${name}">\n${content}\n</file>`)
      .join("\n");

    const userMsg = {
      role: "user",
      content: fileContext + value,
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
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Static
        items={[
          { type: "header" },
          ...messages.map((msg) => ({ type: "message", msg })),
        ]}
      >
        {(item) =>
          item.type === "header" ? (
            <Header model={model} />
          ) : (
            <MessageRow msg={item.msg} />
          )
        }
      </Static>
      {isPending && (
        <Box>
          <Text>{content || <Spinner />}</Text>
        </Box>
      )}
      {error && <Text color="red">Error: {error.message}</Text>}
      {!isPending && <TextInput onSubmit={handleSubmit} />}
    </Box>
  );
};
```

<!--
EXPLAIN WHILE CODING:
"useTransition - marks AI responses as non-urgent..."
"Build file context from attachments - XML format for AI..."
"User message with display text separate from full content..."
"startTransition wraps the async AI call..."
"Static component - terminal scrollback, doesn't re-render..."
"Show streaming content or spinner while pending..."
"Disable input while streaming..."

This is the complex one - take your time to explain clearly.
-->

---
layout: center
---

### Demo Time! (3 min)

<div class="demo-box">
  Run the completed app

  <div class="demo-steps">
    ✓ Model selection with keyboard<br>
    ✓ Type a message<br>
    ✓ Stream AI response in real-time<br>
    ✓ Attach files with @<br>
    ✓ Press 'q' to quit
  </div>

  <div class="demo-callout">
    "This is production-quality code."
  </div>
</div>

<style scoped>
.demo-box {
  padding: 32px;
  background: #0C0F0C;
  border: 2px solid #3CFF7A;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
}

.demo-steps {
  margin: 24px 0;
  font-size: 16px;
  color: #C8DEC4;
  line-height: 2;
  text-align: left;
  display: inline-block;
}

.demo-callout {
  margin-top: 24px;
  padding: 16px;
  background: #1E3320;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  color: #3CFF7A;
}
</style>

<!--
DEMO: Actually run and show it working
- Select a model
- Type "What's the capital of France?"
- Show it streaming
- Type @ and show file picker
- Attach a file and ask about it
- Show the response

"In 15 minutes, we built a working AI chat with file attachments.
Same React you already know. Just a different renderer."
-->

---

### What You Just Saw

<div class="recap-grid">
  <div class="recap-item">
    <div class="recap-icon">🎣</div>
    <div class="recap-text">useState, useEffect, useTransition</div>
    <div class="recap-note">Same hooks</div>
  </div>

  <div class="recap-item">
    <div class="recap-icon">🔄</div>
    <div class="recap-text">use(), Suspense</div>
    <div class="recap-note">React 19 features</div>
  </div>

  <div class="recap-item">
    <div class="recap-icon">📦</div>
    <div class="recap-text">Box, Text, useInput</div>
    <div class="recap-note">Terminal primitives</div>
  </div>

  <div class="recap-item">
    <div class="recap-icon">⚡</div>
    <div class="recap-text">Real-time streaming</div>
    <div class="recap-note">Non-blocking updates</div>
  </div>
</div>

<style scoped>
.recap-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 32px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.recap-item {
  padding: 24px;
  background: #0C0F0C;
  border: 1px solid #1E3320;
  border-radius: 8px;
  text-align: center;
}

.recap-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.recap-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  color: #3CFF7A;
  margin-bottom: 8px;
}

.recap-note {
  font-size: 14px;
  color: #6B9E6B;
}
</style>

<!--
Quick recap to solidify learning:
"Same React patterns you already know.
Just Box instead of div, Text instead of span.
Everything else - hooks, state, async - exactly the same."
-->
