import { Chat } from "@/models/chat.model";
import { Message } from "@/models/message.model";

import { HttpClient } from "./http-client";

type ListResponse = { chats: Chat[] };
type GetResponse = { chat: Chat };
type CreateResponse = { chat: Chat };
type SendResponse = { message: Message; chat: Chat };
type DeleteResponse = { ok: true };

class ChatService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async list(): Promise<Chat[]> {
    return this.httpClient.get<ListResponse>("/chats").then((res) => res.chats);
  }

  async get(id: string): Promise<Chat> {
    return this.httpClient
      .get<GetResponse>(`/chats/${id}`)
      .then((res) => res.chat);
  }

  async create(data: { title: string; firstMessage?: string }): Promise<Chat> {
    return this.httpClient
      .post<CreateResponse>("/chats", data)
      .then((res) => res.chat);
  }

  async sendMessage(
    chatId: string,
    content: string,
    files?: File[]
  ): Promise<Chat> {
    const formData = new FormData();

    formData.append("content", content);
    files?.forEach((file) => formData.append("files", file));

    return this.httpClient
      .post<SendResponse>(`/chats/${chatId}/messages`, formData)
      .then((res) => res.chat);
  }

  async delete(id: string): Promise<void> {
    return this.httpClient
      .delete<DeleteResponse>(`/chats/${id}`)
      .then(() => {});
  }
}

export const chatService = new ChatService(new HttpClient());
