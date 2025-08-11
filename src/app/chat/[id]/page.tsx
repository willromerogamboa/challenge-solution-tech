import ChatPageContainer from "./page-container";

type ChatPageParams = {
  id: string;
};

type ChatPageProps = {
  params: Promise<ChatPageParams>;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full h-full max-w-3xl p-8">
      <ChatPageContainer chatId={id} />
    </div>
  );
}
