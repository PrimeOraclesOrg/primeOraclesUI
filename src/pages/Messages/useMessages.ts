import { useCallback, useMemo, useState } from "react";
import { ChatsFilter, ChatHistoryMessage } from "@/services/chatService/types";
import { chatsFilterFromTab } from "@/utils/chats";
import { useGetChatHistoryQuery } from "@/store/chatsApi";
import { usePaginatedChats } from "./usePaginatedChats";

export type MessageTab = "Все" | "Покупка" | "Продажа";

export const useMessages = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<MessageTab>("Все");
  const [optimisticMessagesByChatId, setOptimisticMessagesByChatId] = useState<
    Record<string, ChatHistoryMessage[]>
  >({});

  const filter = chatsFilterFromTab(activeTab);
  const { chats, isLoading, isFetching, hasMore, loadMore } = usePaginatedChats({
    filter,
    search: searchQuery,
    limit: 20,
  });

  const {
    data: chatHistory,
    isLoading: isChatHistoryLoading,
    isError: isChatHistoryError,
  } = useGetChatHistoryQuery(selectedChatId ?? "", {
    skip: !selectedChatId,
  });

  const selectedChat = selectedChatId
    ? (chats.find((c) => c.chat_id === selectedChatId) ?? null)
    : null;

  const optimisticMessages = selectedChatId
    ? (optimisticMessagesByChatId[selectedChatId] ?? [])
    : [];

  const saleCount = useMemo(
    () => (filter === ChatsFilter.SELL ? chats.reduce((acc, c) => acc + c.unread_count, 0) : 0),
    [chats, filter]
  );

  const handleSendMessage = useCallback(
    (text: string) => {
      if (!selectedChatId || !text.trim()) return;
      const newMessage: ChatHistoryMessage = {
        id: `opt-${Date.now()}`,
        author_id: "",
        message_text: text.trim(),
        created_at: new Date().toISOString(),
        is_own_message: true,
      };
      setOptimisticMessagesByChatId((prev) => ({
        ...prev,
        [selectedChatId]: [...(prev[selectedChatId] ?? []), newMessage],
      }));
    },
    [selectedChatId]
  );

  const handleConfirmOrder = useCallback(() => {
    if (!selectedChatId) return;
    const newMessage: ChatHistoryMessage = {
      id: `opt-confirm-${Date.now()}`,
      author_id: "",
      message_text: "Заказ подтвержден, спасибо!",
      created_at: new Date().toISOString(),
      is_own_message: false,
    };
    setOptimisticMessagesByChatId((prev) => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] ?? []), newMessage],
    }));
  }, [selectedChatId]);

  return {
    selectedChatId,
    setSelectedChatId,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    chatHistory,
    isChatHistoryLoading,
    isChatHistoryError,
    optimisticMessages,
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
