import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { Spinner } from "./Spinner.js";

interface Props {
  onSubmit: (value: string, attachments: Record<string, string>) => void;
}

export const TextInput = ({ onSubmit }: Props) => {
  const [value, setValue] = useState("");
  // DEMO: STEP 4
  useInput((input, key) => {
    if (key.return) {
      onSubmit(value, {});
      setValue("");
      return;
    }

    if (key.backspace || key.delete) {
      setValue((v) => v.slice(0, -1));
      return;
    }
    if (input && !key.ctrl && !key.meta) {
      setValue((v) => v + input);
    }
  });

  return (
    <Box flexDirection="column">
      <Box>
        <Text color="green">❯ </Text>
        <Text>{value}</Text>
        {/* {isReading && <Text color="yellow"> reading…</Text>}
        {!isReading && Object.keys(attachments).length > 0 && (
          <Text color="yellow"> [{Object.keys(attachments).join(", ")}]</Text>
        )} */}
        <Text color="green">█</Text>
      </Box>

      {/* {filePicker.active && (
        <FilePicker query={filePicker.query} cursor={filePicker.cursor} />
      )} */}
    </Box>
  );
  // DEMO: END STEP 4

  // return <Spinner />;
};
