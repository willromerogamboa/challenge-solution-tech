"use client";

import { useChat, useSendMessage } from "@/hooks/use-chat";

import ChatView from "../_components/chat-view";

type ChatPageContainerProps = {
  chatId: string;
};

export default function ChatPageContainer({ chatId }: ChatPageContainerProps) {
  const { data } = useChat(chatId);
  const { mutate: sendMessage } = useSendMessage();

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleSendMessage = (message: string) => {
    sendMessage({ chatId, content: message });
  };

  return <ChatView chat={data} onSendMessage={handleSendMessage} />;
}
