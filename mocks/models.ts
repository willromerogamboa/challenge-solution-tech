export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type Chat = {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
};
