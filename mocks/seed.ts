import { nanoid } from "nanoid";

import { Chats } from "./dexie";
import type { Chat } from "./models";

export function generateAssistantReply(userText: string): string {
  return `Respuesta automática: Sobre "${userText}", aquí tienes información simulada. (mock)`;
}

export function initialSeed(): Chat[] {
  return [
    {
      id: nanoid(),
      title: "Bienvenido",
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: nanoid(),
          role: "assistant",
          content:
            "¡Hola! Soy tu asistente. Pregúntame sobre misión, visión, proyectos, etc. (mock)",
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ];
}

export async function ensureSeed() {
  const hasData = (await Chats.count()) > 0;

  if (!hasData) {
    const seed = initialSeed();
    await Promise.all(seed.map((c) => Chats.put(c)));
  }
}
