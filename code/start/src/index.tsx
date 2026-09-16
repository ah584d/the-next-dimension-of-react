import { render } from "ink";
import { App } from "./App.js";

process.stdout.write("\x1b[2J\x1b[H");

//setTimeout(() => {}, 1_000_000);
render(<App />);
