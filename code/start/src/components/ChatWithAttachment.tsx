import  { useState, useTransition } from "react";
import { Box, Text, Static, useInput, useApp } from "ink";
import { TextInput } from "./TextInput.js";
import { Spinner } from "./Spinner.js";
import { useStream } from "../hooks/useStream.js";
import { Message, StaticItem } from "../utils/types.js";
import { Header, MessageRow } from "./Header.js";
import { TextInputAttachment } from "./TextInputAttachment.js";

interface ChatWithAttachmentProps {
  model: string;
}

export const ChatWithAttachment = ({ model }: ChatWithAttachmentProps) => {
  const { exit } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const { content, error, send } = useStream(model);
  const [isPending, startTransition] = useTransition();

  useInput((input) => {
    if (input === "q" && !isPending) exit();
  });

  const handleSubmit = (value: string, attachments: Record<string, unknown>) => {
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
  };

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
      {!isPending && <TextInputAttachment onSubmit={handleSubmit} />}
    </Box>
  );
};
