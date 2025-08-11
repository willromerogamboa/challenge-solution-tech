"use client";

import { Chat } from "@/models/chat.model";

import MessageItem from "./message-item";

export default function MessageList({ chat }: { chat: Chat }) {
  return (
    <>
      {chat.messages.map((m) => (
        <MessageItem key={m.id} message={m} />
      ))}
    </>
  );
}
