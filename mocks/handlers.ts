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
  http.get("/api/chats", ({ request }) => {
    const searchParams = new URLSearchParams(request.url.split("?")[1]);
    const search = searchParams.get("search");

    const filteredChats = search
      ? db.filter(
          (chat) =>
            chat.title.toLowerCase().includes(search.toLowerCase()) ||
            chat.messages.some((message) =>
              message.content.toLowerCase().includes(search.toLowerCase())
            )
        )
      : db;

    return HttpResponse.json({ chats: filteredChats });
  }),

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

    const form = await request.formData();
    const content = form.get("content") as string;
    const files = form.getAll("files") as File[];

    const now = new Date().toISOString();
    const userMsg: Message = {
      id: nanoid(),
      role: "user",
      content,
      files: files.map((file) => {
        const isImage = file.type.startsWith("image/");
        const isPdf = file.type === "application/pdf";
        const isVideo = file.type.startsWith("video/");

        const previewUrl = isImage
          ? `https://picsum.photos/500/500`
          : isVideo
          ? `https://filesamples.com/samples/video/mp4/sample_640x360.mp4`
          : isPdf
          ? `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`
          : "";

        return {
          name: file.name,
          url: previewUrl,
          isImage,
        };
      }),
      createdAt: now,
    };

    const assistantMsg: Message = {
      id: nanoid(),
      role: "assistant",
      content: generateAssistantReply(content),
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
