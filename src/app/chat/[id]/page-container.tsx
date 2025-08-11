"use client";

import { useChat, useSendMessage } from "@/hooks/use-chat";

import ChatView from "../_components/chat-view";

type ChatPageContainerProps = {
  chatId: string;
};

export default function ChatPageContainer({ chatId }: ChatPageContainerProps) {
  const { data, isLoading } = useChat(chatId);
  const { mutate: sendMessage } = useSendMessage();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSendMessage = (message: string, files?: File[]) => {
    sendMessage({ chatId, content: message, files });
  };

  return (
    <>{data && <ChatView chat={data} onSendMessage={handleSendMessage} />}</>
  );
}
