import { useState, use, Suspense } from "react";
import { Box, Text, useInput } from "ink";
import { fetchModels } from "../api/fetchModels.js";

import { Spinner } from "./Spinner.js";

interface ModelListProps {
  onSelect: (modelId: string) => void;
}

const ModelList = ({ onSelect }: ModelListProps) => {
  // STEP 1: Implement the Spinner Component
 // return <Spinner />;

  // DEMO: STEP 2 - Implement the ModelList component
  const models = use(fetchModels);

  // DEMO: STEP 3.1 - Implement the cursor state and input handling
  const [cursor, setCursor] = useState(0);
  useInput((_input, key) => {
    if (key.upArrow) setCursor((prev) => Math.max(0, prev - 1));
    if (key.downArrow)
      setCursor((prev) => Math.min(models.length - 1, prev + 1));
    if (key.return) onSelect(models[cursor].id);
  });
  // DEMO: END STEP 3.1

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor="yellow"
      padding={1}
    >
      <Text bold color="yellow">
        Select a model:
      </Text>
      {models.map((model, i) => (
        <Box key={model.id}>
          {/* <Text color={"green"}>{model.label}</Text> */}

          {/* DEMO: STEP 3.2  - Implement the cursor highlight */}

          <Box>
            <Text color={i === cursor ? "green" : undefined}>
              {i === cursor ? "❯ " : "  "}
              {model.label}
            </Text>
          </Box>

          {/* DEMO: END STEP 3.2 */}
        </Box>
      ))}
      <Box marginTop={1}>
        <Text dimColor>↑/↓ navigate · Enter to confirm</Text>
      </Box>
    </Box>
  );
  // DEMO: END STEP 2
};

export const ModelSelect = ({ onSelect }: ModelListProps) => (
  <Suspense fallback={<Spinner label="Loading models…" />}>
    <ModelList onSelect={onSelect} />
  </Suspense>
);
