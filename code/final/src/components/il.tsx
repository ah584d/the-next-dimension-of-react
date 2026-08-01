import React from "react";
import { Box, Text } from "ink";

const ISRAEL = [
  "██╗███████╗██████╗  █████╗ ███████╗██╗     ",
  "██║██╔════╝██╔══██╗██╔══██╗██╔════╝██║     ",
  "██║███████╗██████╔╝███████║█████╗  ██║     ",
  "██║╚════██║██╔══██╗██╔══██║██╔══╝  ██║     ",
  "██║███████║██║  ██║██║  ██║███████╗███████╗",
  "╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝",
];

const IsraeliFlag: React.FC = () => (
  <Box flexDirection="column" marginLeft={3}>
    {/* Top blue stripe */}
    <Text color="blue">{"═════════════════════════"}</Text>
    <Text color="blue">{"═════════════════════════"}</Text>

    {/* White space */}
    <Text color="white">{"                         "}</Text>

    {/* Star of David (Magen David) */}
    <Text color="blue">{"            ▲            "}</Text>
    <Text color="blue">{"           / \\           "}</Text>
    <Text color="blue">{"      ════/   \\════      "}</Text>
    <Text color="blue">{"       \\         /       "}</Text>
    <Text color="blue">{"        \\       /        "}</Text>
    <Text color="blue">{"        /       \\        "}</Text>
    <Text color="blue">{"       /         \\       "}</Text>
    <Text color="blue">{"      ════\\   /════      "}</Text>
    <Text color="blue">{"           \\ /           "}</Text>
    <Text color="blue">{"            ▼            "}</Text>

    {/* White space */}
    <Text color="white">{"                         "}</Text>

    {/* Bottom blue stripe */}
    <Text color="blue">{"═════════════════════════"}</Text>
    <Text color="blue">{"═════════════════════════"}</Text>
  </Box>
);
