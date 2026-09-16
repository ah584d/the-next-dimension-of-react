import { useState, useTransition } from "react";
import { Box, Text, Static, useInput, useApp } from "ink";
import { TextInput } from "./TextInput.js";
import { Spinner } from "./Spinner.js";
import { useStream } from "../hooks/useStream.js";
import { Message, StaticItem } from "../utils/types.js";
import { Header, MessageRow } from "./Header.js";
interface ChatWithModelProps {
  model: string;
}

export const ChatWithModel = ({ model }: ChatWithModelProps) => {
  const { exit } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const { content: streamContent, error, send } = useStream(model);
  const [isPending, startTransition] = useTransition();

  useInput((input) => {
    if (input === "q" && !isPending) exit();
  });

  const handleSubmit = (value: string) => {
    if (!value.trim() || isPending) return;

    const userMsg: Message = {
      role: "user",
      content: value,
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
            {streamContent ? <Text>{streamContent}</Text> : <Spinner />}
          </Box>
        </Box>
      )}

      {error && <Text color="red">Error: {error.message}</Text>}
      {!isPending && <TextInput onSubmit={handleSubmit} />}
    </Box>
  );
};
