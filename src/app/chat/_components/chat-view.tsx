"use client";

import { useRef } from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFileUploads } from "@/hooks/use-file-uploads";
import { Chat } from "@/models/chat.model";

import FilePreviewGrid from "./file-preview-grid";
import MessageList from "./message-list";
import UploadTrigger from "./upload-trigger";

type ChatViewProps = {
  chat: Chat;
  isLoading?: boolean;
  onSendMessage?: (message: string, files?: File[]) => void;
};

export default function ChatView({
  chat,
  isLoading,
  onSendMessage,
}: ChatViewProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { files, addFiles, removeFile, clearFiles } = useFileUploads();

  const handleSendMessage = () => {
    const message = inputRef.current?.value;

    if (message) {
      onSendMessage?.(
        message,
        files.map((file) => file.file)
      );

      inputRef.current!.value = "";
      clearFiles();
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">{chat.title}</h2>
        <div className="mt-4">
          <MessageList chat={chat} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <FilePreviewGrid
          files={files}
          onRemove={removeFile}
          disabled={isLoading}
        />

        <div className="flex w-full items-center gap-2">
          <UploadTrigger onFiles={addFiles} disabled={isLoading} />

          <Input ref={inputRef} type="text" placeholder="Ask a question..." />

          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={handleSendMessage}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
          </Button>
        </div>
      </div>
    </div>
  );
}
