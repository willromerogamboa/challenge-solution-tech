import { http, HttpResponse } from "msw";
import { nanoid } from "nanoid";

import type { Chat, Message } from "./models";
import {
  generateAssistantReply,
  initialChatSeed,
  initialMessageSeed,
} from "./seed";

let db: Chat[] = initialChatSeed();

export const handlers = [
  http.get("/api/chats", () => HttpResponse.json({ chats: db })),

  http.get("/api/chats/:id", ({ params }) => {
    const chat = db.find((c) => c.id === params.id);

    if (!chat) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json({ chat });
  }),

  http.post("/api/chats", async ({ request }) => {
    const body = (await request.json()) as {
      title: string;
      firstMessage?: string;
    };

    const id = nanoid();
    const now = new Date().toISOString();

    const messages: Message[] = [];

    messages.push(initialMessageSeed());

    if (body.firstMessage?.trim()) {
      messages.push({
        id: nanoid(),
        role: "assistant",
        content: generateAssistantReply(body.firstMessage),
        createdAt: new Date().toISOString(),
      });
    }

    const chat: Chat = {
      id,
      title: body.title || "Nuevo chat",
      createdAt: now,
      messages,
    };

    db.unshift(chat);

    return HttpResponse.json({ chat }, { status: 201 });
  }),

  http.post("/api/chats/:id/messages", async ({ params, request }) => {
    const chat = db.find((c) => c.id === params.id);

    if (!chat) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    const body = (await request.json()) as { content: string };

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
    return HttpResponse.json({ message: assistantMsg, chat });
  }),

  http.delete("/api/chats/:id", ({ params }) => {
    db = db.filter((c) => c.id !== params.id);
    return HttpResponse.json({ ok: true });
  }),
];
