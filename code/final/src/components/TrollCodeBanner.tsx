import React from "react";
import { Box, Text } from "ink";
import { ISRAEL, IsraeliFlag } from "./Israel.js";

const CODE = [
  " ██████╗ ██████╗ ██████╗ ███████╗",
  "██╔════╝██╔═══██╗██╔══██╗██╔════╝",
  "██║     ██║   ██║██║  ██║█████╗  ",
  "██║     ██║   ██║██║  ██║██╔══╝  ",
  "╚██████╗╚██████╔╝██████╔╝███████╗",
  " ╚═════╝ ╚═════╝ ╚═════╝╚══════╝",
];


export const TrollCodeBanner: React.FC = () => (
  <Box flexDirection="column" paddingLeft={1}>
    <Box flexDirection="row" alignItems="flex-start">
      <Box flexDirection="column">
        {ISRAEL.map((line, i) => (
          <Text key={i} color="green">
            {line}
          </Text>
        ))}
        {CODE.map((line, i) => (
          <Text key={i} color="cyan">
            {line}
          </Text>
        ))}
      </Box>
      {/* <TrollDoll /> */}
      <IsraeliFlag />
    </Box>
    <Box marginTop={1}>
      <Text dimColor>React in your terminal</Text>
    </Box>
  </Box>
);
