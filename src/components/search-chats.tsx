"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSearchChats } from "@/hooks/use-chat";
import { MessageCircleIcon } from "lucide-react";

type SearchChatsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SearchChats({ open, onOpenChange }: SearchChatsProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const { data: chats, isLoading } = useSearchChats(search);

  const handleGoToChat = (id: string) => {
    router.push(`/chat/${id}`);
    setSearch("");
    onOpenChange(false);
  };

  return (
    <CommandDialog
      open={open}
      showCloseButton
      onOpenChange={onOpenChange}
      className="min-h-80"
    >
      <Command shouldFilter={false}>
        <CommandInput placeholder="Search chats..." onValueChange={setSearch} />

        <CommandList>
          <CommandGroup>
            {!isLoading && chats?.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

            {chats?.map((chat) => (
              <CommandItem
                key={chat.id}
                value={chat.id}
                className="cursor-pointer"
                onSelect={handleGoToChat}
              >
                <MessageCircleIcon />
                <span>{chat.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
