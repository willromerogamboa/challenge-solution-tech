export type MessageFile = {
  name: string;
  url: string;
  isImage: boolean;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  files?: MessageFile[];
  createdAt: string;
};

export type Chat = {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
};
