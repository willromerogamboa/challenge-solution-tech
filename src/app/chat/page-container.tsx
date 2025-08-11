"use client";

import { useRouter } from "next/navigation";

import { useCreateChat } from "@/hooks/use-chat";

import CreateChat from "./_components/create-chat";

export default function NewPageContainer() {
  const router = useRouter();

  const { mutateAsync: createChat } = useCreateChat();

  const handleCreateChat = async (title: string) => {
    const chat = await createChat({ title, firstMessage: "" });
    router.push(`/chat/${chat.id}`);
  };

  return (
    <div className="w-full h-full">
      <CreateChat onCreate={handleCreateChat} />
    </div>
  );
}
