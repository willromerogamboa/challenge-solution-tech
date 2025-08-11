import { Message } from "./message.model";

export type Chat = {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
};
