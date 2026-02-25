import { MessagesTemplate } from "@/components/templates";
import { useMessages } from "./useMessages";

export const Messages = () => {
  const {
    chats,
    selectedChatId,
    selectedChat,
    chatHistory,
    isChatHistoryLoading,
    isChatHistoryError,
    optimisticMessages,
    activeTab,
    searchQuery,
    saleCount,
    setSelectedChatId,
    setSearchQuery,
    setActiveTab,
    handleSendMessage,
    handleConfirmOrder,
    isLoading,
    isFetching,
    hasMore,
    loadMore,
  } = useMessages();

  return (
    <MessagesTemplate
      chats={chats}
      selectedChatId={selectedChatId}
      selectedChat={selectedChat}
      chatHistory={chatHistory}
      isChatHistoryLoading={isChatHistoryLoading}
      isChatHistoryError={isChatHistoryError}
      optimisticMessages={optimisticMessages}
      activeTab={activeTab}
      searchQuery={searchQuery}
      saleBadgeCount={saleCount}
      onSelectChat={setSelectedChatId}
      onSearchChange={setSearchQuery}
      onTabChange={setActiveTab}
      onSendMessage={handleSendMessage}
      onConfirmOrder={handleConfirmOrder}
      isLoading={isLoading}
      isLoadMoreFetching={isFetching && !isLoading}
      hasMore={hasMore}
      onLoadMore={loadMore}
    />
  );
};
