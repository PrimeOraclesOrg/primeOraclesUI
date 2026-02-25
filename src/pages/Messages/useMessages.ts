import { useCallback, useMemo, useState } from "react";
import { ChatsFilter } from "@/services/chatService/types";
import { chatsFilterFromTab } from "@/utils/chats";
import { usePaginatedChats } from "./usePaginatedChats";

export type MessageTab = "Все" | "Покупка" | "Продажа";

export interface Message {
  id: string;
  sender: "user" | "them";
  text: string;
  time: string;
}

const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "m1", sender: "them", text: "Рад слышать, да погнали! Как раз время", time: "21:01" },
    { id: "m2", sender: "them", text: "Оставь еще отзыв, спасибо", time: "21:01" },
    { id: "m3", sender: "user", text: "Все работает, го в доту?", time: "21:00" },
  ],
  "2": [{ id: "m4", sender: "them", text: "Добро пожаловать в Prime Oracle:", time: "12:00" }],
};

export const useMessages = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<MessageTab>("Все");
  const [messagesByConversation, setMessagesByConversation] = useState(MOCK_MESSAGES);

  const filter = chatsFilterFromTab(activeTab);
  const { chats, isLoading, isFetching, hasMore, loadMore } = usePaginatedChats({
    filter,
    search: searchQuery,
    limit: 20,
  });

  const selectedChat = selectedChatId
    ? (chats.find((c) => c.chat_id === selectedChatId) ?? null)
    : null;

  const messages = selectedChatId ? (messagesByConversation[selectedChatId] ?? []) : [];

  const saleCount = useMemo(
    () => (filter === ChatsFilter.SELL ? chats.reduce((acc, c) => acc + c.unread_count, 0) : 0),
    [chats, filter]
  );

  const handleSendMessage = useCallback(
    (text: string) => {
      if (!selectedChatId || !text.trim()) return;
      const newMessage: Message = {
        id: `m-${Date.now()}`,
        sender: "user",
        text: text.trim(),
        time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessagesByConversation((prev) => ({
        ...prev,
        [selectedChatId]: [...(prev[selectedChatId] ?? []), newMessage],
      }));
    },
    [selectedChatId]
  );

  const handleConfirmOrder = useCallback(() => {
    if (!selectedChatId) return;
    setMessagesByConversation((prev) => ({
      ...prev,
      [selectedChatId]: [
        ...(prev[selectedChatId] ?? []),
        {
          id: `m-${Date.now()}`,
          sender: "them",
          text: "Заказ подтвержден, спасибо!",
          time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    }));
  }, [selectedChatId]);

  return {
    selectedChatId,
    setSelectedChatId,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    messagesByConversation,
    setMessagesByConversation,
    messages,
    saleCount,
    handleSendMessage,
    handleConfirmOrder,
    isLoading,
    isFetching,
    hasMore,
    loadMore,
    chats,
    selectedChat,
  };
};
