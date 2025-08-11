import { http, HttpResponse } from "msw";
import { nanoid } from "nanoid";

import { Chats } from "./dexie";
import type { Chat, Message } from "./models";
import { ensureSeed, generateAssistantReply } from "./seed";

export const handlers = [
  http.get("/api/chats", async () => {
    await ensureSeed();
    const chats = await Chats.getAll();
    return HttpResponse.json({ chats });
  }),

  http.get("/api/chats/:id", async ({ params }) => {
    await ensureSeed();

    const chat = await Chats.get(String(params.id));

    if (!chat) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json({ chat });
  }),

  http.post("/api/chats", async ({ request }) => {
    await ensureSeed();

    const body = (await request.json()) as { firstMessage?: string };
    const id = nanoid();
    const now = new Date().toISOString();

    const messages: Message[] = [];

    if (body.firstMessage?.trim()) {
      messages.push({
        id: nanoid(),
        role: "user",
        content: body.firstMessage,
        createdAt: now,
      });

      messages.push({
        id: nanoid(),
        role: "assistant",
        content: generateAssistantReply(body.firstMessage),
        createdAt: new Date().toISOString(),
      });
    }

    const chat: Chat = {
      id,
      title: body.firstMessage ? body.firstMessage.slice(0, 40) : "Nuevo chat",
      createdAt: now,
      messages,
    };

    await Chats.put(chat);

    return HttpResponse.json({ chat }, { status: 201 });
  }),

  http.post("/api/chats/:id/messages", async ({ params, request }) => {
    await ensureSeed();

    const chatId = String(params.id);
    const body = (await request.json()) as { content: string };

    const chat = await Chats.get(chatId);

    if (!chat) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    const now = new Date().toISOString();
    const userMsg: Message = {
      id: nanoid(),
      role: "user",
      content: body.content,
      createdAt: now,
    };
    const assistantMsg: Message = {
      id: nanoid(),
      role: "assistant",
      content: generateAssistantReply(body.content),
      createdAt: new Date().toISOString(),
    };

    chat.messages.push(userMsg, assistantMsg);
    chat.title = body.content.slice(0, 40) || chat.title;
    chat.createdAt = now;

    await Chats.put(chat);

    return HttpResponse.json({ message: assistantMsg, chat });
  }),

  http.delete("/api/chats/:id", async ({ params }) => {
    await ensureSeed();
    await Chats.delete(String(params.id));
    return HttpResponse.json({ ok: true });
  }),
];
