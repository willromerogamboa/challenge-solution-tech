import { dehydrate } from "@tanstack/react-query";

import { chatService } from "@/services/chat.service";

import { qk } from "./keys";
import { getQueryClient } from "./query-client";

export async function prefetchChatList() {
  const qc = getQueryClient();

  await qc.prefetchQuery({
    queryKey: qk.chats,
    queryFn: () => chatService.list(),
  });

  return dehydrate(qc);
}

export async function prefetchChatDetail(id: string) {
  const qc = getQueryClient();

  await qc.prefetchQuery({
    queryKey: qk.chat(id),
    queryFn: () => chatService.get(id),
  });

  return dehydrate(qc);
}

export async function prefetchChatsWithDetail(id?: string) {
  const qc = getQueryClient();

  await qc.prefetchQuery({
    queryKey: qk.chats,
    queryFn: () => chatService.list(),
  });

  if (id) {
    await qc.prefetchQuery({
      queryKey: qk.chat(id),
      queryFn: () => chatService.get(id),
    });
  }

  return dehydrate(qc);
}
