import Dexie, { Table } from "dexie";

import type { Chat } from "./models";

class ChatDB extends Dexie {
  chats!: Table<Chat, string>;

  constructor() {
    super("mock-chat-db");

    this.version(1).stores({
      chats: "id, createdAt, title",
    });
  }
}

export const db = new ChatDB();

export const Chats = {
  getAll: async () => db.chats.orderBy("createdAt").reverse().toArray(),
  get: async (id: string) => db.chats.get(id),
  put: async (chat: Chat) => db.chats.put(chat),
  delete: async (id: string) => db.chats.delete(id),
  count: async () => db.chats.count(),
};
