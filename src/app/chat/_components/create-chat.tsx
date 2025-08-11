"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CreateChatProps = {
  onCreate: (title: string) => void;
};

export default function CreateChat({ onCreate }: CreateChatProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateChat = async () => {
    const title = inputRef.current?.value;
    if (title) {
      onCreate(title);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Create a New Chat</h1>
      <p className="text-lg mb-5">Enter a title for your chat.</p>

      <div className="flex w-full max-w-sm items-center gap-2">
        <Input ref={inputRef} type="text" placeholder="Title" />
        <Button onClick={handleCreateChat} type="submit" variant="outline">
          Create
        </Button>
      </div>
    </div>
  );
}
