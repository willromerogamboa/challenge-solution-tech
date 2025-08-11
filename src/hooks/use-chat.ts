"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { qk } from "@/lib/react-query";
import { Chat } from "@/models/chat.model";
import { chatService } from "@/services/chat.service";

export function useChatHistory() {
  return useQuery<Chat[]>({
    queryKey: qk.chats,
    queryFn: () => chatService.list(),
  });
}

export function useChat(id: string) {
  return useQuery<Chat>({
    queryKey: qk.chat(id),
    queryFn: () => chatService.get(id),
  });
}

export function useCreateChat() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; firstMessage?: string }) => {
      return chatService.create(data);
    },
    onSuccess: (chat) => {
      qc.setQueryData<Chat[]>(qk.chats, (prev) => [chat, ...(prev || [])]);
      qc.setQueryData(qk.chat(chat.id), chat);
    },
  });
}

export function useSendMessage() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: { chatId: string; content: string }) =>
      chatService.sendMessage(data.chatId, data.content),
    onSuccess: (chat) => {
      qc.setQueryData(qk.chat(chat.id), chat);

      qc.setQueryData<Chat[]>(qk.chats, (prev) => {
        if (!prev) {
          return [chat];
        }

        const rest = prev.filter((c) => c.id !== chat.id);

        return [chat, ...rest];
      });
    },
  });
}

export function useDeleteChat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => chatService.delete(id),
    onSuccess: (_, id) => {
      qc.setQueryData<Chat[]>(
        qk.chats,
        (prev) => prev?.filter((c) => c.id !== id) ?? prev
      );

      qc.removeQueries({ queryKey: qk.chat(id) });
    },
  });
}
