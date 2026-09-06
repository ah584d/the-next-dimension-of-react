import { useState } from "react";
import { Box, Static, Text, useApp } from "ink";
import { useStream } from "../hooks/useStream.js";
import { TextInput } from "./TextInput.js";
import { Message, StaticItem } from "../utils/types.js";
import { Header, MessageRow } from "./Header.js";

interface ChatProps {
  model: string;
}

export const Chat = ({ model }: ChatProps) => {
  const { exit } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);

  // STEP 4: accumulate the content from the stream into the messages state
  const handleSubmit = (value: string) => {
    if (!value.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: value,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
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

      <TextInput onSubmit={handleSubmit} />
    </Box>


      // <TextInput onSubmit={handleSubmit} />

  );
};
