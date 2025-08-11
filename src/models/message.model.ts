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
