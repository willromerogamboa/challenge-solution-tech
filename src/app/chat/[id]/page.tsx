import { redirect } from "next/navigation";

import { HydrateClient, prefetchChatDetail } from "@/lib/react-query";

import ChatPageContainer from "./page-container";

type ChatPageParams = {
  id: string;
};

type ChatPageProps = {
  params: Promise<ChatPageParams>;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;

  const dehydratedState = await prefetchChatDetail(id);

  if (dehydratedState.queries.length === 0) {
    redirect("/chat");
  }

  return (
    <HydrateClient state={dehydratedState}>
      <div className="mx-auto w-full h-full max-w-3xl p-8">
        <ChatPageContainer chatId={id} />
      </div>
    </HydrateClient>
  );
}
