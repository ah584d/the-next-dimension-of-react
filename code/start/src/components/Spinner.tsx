import { useState, useEffect } from "react";
import { Text } from "ink";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export const Spinner = ({ label }: { label?: string }) => {
  const [frame, setFrame] = useState(0);

  // DEMO: STEP 1
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((frame) => (frame + 1) % FRAMES.length);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text color="cyan">
      {FRAMES[frame]} {label ?? "Loading..."}
    </Text>
  );

  // DEMO: END STEP 1
  return null;
};
