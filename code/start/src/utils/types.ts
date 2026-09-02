export interface Message {
  role: "user" | "assistant";
  content: string;
  displayText?: string;
}

export type StaticItem = { type: "header" } | { type: "message"; msg: Message };
