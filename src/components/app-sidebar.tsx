"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Edit, MoreHorizontal, SearchIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useChatHistory, useDeleteChat } from "@/hooks/use-chat";

import SearchChats from "./search-chats";

const items = [
  {
    title: "New Chat",
    url: "/chat",
    icon: Edit,
  },
];

export function AppSidebar() {
  const router = useRouter();

  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const { data: chats } = useChatHistory();
  const { mutateAsync: deleteChat } = useDeleteChat();

  const handleDeleteChat = async (chatId: string) => {
    await deleteChat(chatId);
    router.push("/chat");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <h2>Solution Tech</h2>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span
                    className="cursor-pointer"
                    onClick={() => setIsOpenSearch(true)}
                  >
                    <SearchIcon />
                    <span>Search Chats</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {chats && (
          <SidebarGroup>
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/chat/${chat.id}`}>
                        <span>{chat.title}</span>
                      </Link>
                    </SidebarMenuButton>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <MoreHorizontal />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem
                          onClick={() => handleDeleteChat(chat.id)}
                        >
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter />

      <SearchChats open={!!isOpenSearch} onOpenChange={setIsOpenSearch} />
    </Sidebar>
  );
}
