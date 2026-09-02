import { Box, Text } from "ink";
import { Spinner } from "./Spinner.js";
import { Message } from "../utils/types.js";

export const Header = ({ model }: { model: string }) => (
  <Box borderStyle="round" borderColor="cyan" paddingX={2} marginBottom={1}>
    <Text bold color="cyan">
      AI Terminal{" "}
    </Text>
    <Text dimColor>model: {model} · q to quit</Text>
  </Box>
);

export const MessageRow = ({ msg }: { msg: Message }) => (
  <Box marginBottom={1} flexDirection="column">
    <Text color={msg.role === "user" ? "yellow" : "green"} bold>
      {msg.role === "user" ? "You" : "AI"}
    </Text>
    <Box paddingLeft={2}>
      {msg.content ? (
        <Text>{msg.displayText ?? msg.content}</Text>
      ) : (
        <Spinner />
      )}
    </Box>
  </Box>
);