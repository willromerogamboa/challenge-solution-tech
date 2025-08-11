"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import {
  FileIcon,
  ImageIcon,
  Loader2,
  Paperclip,
  PlusCircle,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Chat } from "@/models/chat.model";

type FileUpload = {
  id: string;
  name: string;
  type: string;
  size: number;
  file: File;
  previewUrl?: string;
  isImage: boolean;
};

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);

  const handleSendMessage = () => {
    const message = inputRef.current?.value;

    if (message) {
      onSendMessage?.(
        message,
        uploadedFiles.map((file) => file.file)
      );

      setUploadedFiles([]);
      inputRef.current!.value = "";
    }
  };

  const handleFileInputChange = () => {
    const files = fileInputRef.current?.files;

    if (!files || files.length === 0) {
      return;
    }

    const next: FileUpload[] = Array.from(files).map((file) => {
      const isImage = file.type.startsWith("image/");
      const previewUrl = isImage ? URL.createObjectURL(file) : undefined;

      return {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        file,
        isImage,
        previewUrl,
      };
    });

    setUploadedFiles((prev) => {
      const dedup = [...prev];

      next.forEach((n) => {
        const exists = dedup.some(
          (p) => p.name === n.name && p.size === n.size
        );

        if (!exists) {
          dedup.push(n);
        } else if (n.previewUrl) {
          URL.revokeObjectURL(n.previewUrl);
        }
      });

      return dedup;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((file) => file.id === id);

      if (file?.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }

      return prev.filter((file) => file.id !== id);
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) {
      return "0 B";
    }

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
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

      <input
        hidden
        type="file"
        ref={fileInputRef}
        accept="image/*,.pdf,.mp4"
        onChange={handleFileInputChange}
      />

      <div className="flex flex-col gap-1">
        <div>
          {uploadedFiles.length > 0 && (
            <div className="mt-3 mb-2 border rounded-xl p-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="relative border rounded-lg overflow-hidden group"
                  >
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="absolute right-2 top-2 z-10 inline-flex items-center justify-center rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100 transition"
                      aria-label={`Eliminar ${file.name}`}
                      title="Eliminar"
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {file.isImage && file.previewUrl ? (
                      <div className="flex flex-col">
                        <Image
                          src={file.previewUrl}
                          alt={file.name}
                          className="h-36 w-full object-cover"
                          width={144}
                          height={144}
                        />
                        <div className="p-2 w-full">
                          <div className="truncate text-sm font-medium">
                            {file.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatBytes(file.size)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-32 w-full flex flex-col items-center justify-center p-3">
                        <div className="mb-2">
                          {file.type === "application/pdf" ? (
                            <FileIcon className="h-8 w-8" />
                          ) : file.type === "video/mp4" ? (
                            <FileIcon className="h-8 w-8" />
                          ) : (
                            <ImageIcon className="h-8 w-8" />
                          )}
                        </div>

                        <div className="px-2 text-center w-full">
                          <div
                            title={file.name}
                            className="truncate text-sm font-medium"
                          >
                            {file.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatBytes(file.size)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" type="button" size="icon">
                <PlusCircle />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                  <Paperclip />
                  <span>Add photos & files</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

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
