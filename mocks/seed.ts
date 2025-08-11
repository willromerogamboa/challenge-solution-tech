import { nanoid } from "nanoid";

import type { Chat, Message } from "./models";

export function generateAssistantReply(userText: string): string {
  return `Respuesta automática: Sobre "${userText}", aquí tienes información simulada. (mock)`;
}

export function initialMessageSeed(): Message {
  return {
    id: nanoid(),
    role: "assistant",
    content:
      "¡Hola! Soy tu asistente. Pregúntame sobre misión, visión, proyectos, etc. (mock)",
    createdAt: new Date().toISOString(),
  };
}

export function initialChatSeed(): Chat[] {
  return [
    {
      id: nanoid(),
      title: "Bienvenido",
      createdAt: new Date().toISOString(),
      messages: [initialMessageSeed()],
    },
  ];
}
