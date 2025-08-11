import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chat } from "@/models/chat.model";

type ChatViewProps = {
  chat: Chat;
  onSendMessage?: (message: string) => void;
};

export default function ChatView({ chat, onSendMessage }: ChatViewProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    const message = inputRef.current?.value;
    if (message) {
      onSendMessage?.(message);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">{chat.title}</h2>
        <div className="mt-4">
          {chat.messages.map((message) => (
            <div key={message.id} className="mb-2">
              <strong>{message.role === "user" ? "You" : "AI"}: </strong>
              {message.content}
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center gap-2">
        <Input ref={inputRef} type="text" placeholder="Ask a question..." />
        <Button onClick={handleSendMessage} type="submit" variant="outline">
          Ask
        </Button>
      </div>
    </div>
  );
}
