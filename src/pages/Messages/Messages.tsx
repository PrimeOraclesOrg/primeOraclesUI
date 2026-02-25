import { MessagesTemplate } from "@/components/templates";
import { useMessages } from "./useMessages";

export const Messages = () => {
  const {
    chats,
    selectedChatId,
    selectedChat,
    messages,
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
      messages={messages}
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
