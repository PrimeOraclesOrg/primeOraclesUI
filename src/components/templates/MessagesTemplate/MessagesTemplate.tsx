import { useState, useRef, useEffect } from "react";
import { Bot, ChevronLeft, Plus, Send } from "lucide-react";
import { MessageTab } from "@/pages/Messages/useMessages";
import { MainLayout } from "@/components/templates/MainLayout/MainLayout";
import { SearchBar } from "@/components/molecules/SearchBar/SearchBar";
import { RatingStars } from "@/components/atoms/RatingStars/RatingStars";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChatHistoryMessage, ChatHistoryResponse, UserChat } from "@/services/chatService/types";
import { formatDate } from "@/utils/formatters";
import { buildCoverUrl } from "@/utils/base64ToBlob";
import { formatMessageTime } from "@/utils/chats";

interface MessagesTemplateProps {
  chats: UserChat[];
  selectedChatId: string | null;
  selectedChat: UserChat | null;
  chatHistory: ChatHistoryResponse | null;
  optimisticMessages: ChatHistoryMessage[];
  isChatHistoryLoading: boolean;
  isChatHistoryError: boolean;
  activeTab: MessageTab;
  searchQuery: string;
  saleBadgeCount: number;
  onSelectChat: (id: string | null) => void;
  onSearchChange: (value: string) => void;
  onTabChange: (tab: MessageTab) => void;
  onSendMessage: (text: string) => void;
  onConfirmOrder: () => void;
  isSendMessageLoading?: boolean;
  isSendMessageError?: boolean;
  isLoading?: boolean;
  isLoadMoreFetching?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function MessagesTemplate({
  chats,
  selectedChatId,
  selectedChat,
  chatHistory,
  optimisticMessages,
  isChatHistoryLoading = false,
  isChatHistoryError = false,
  activeTab,
  searchQuery,
  saleBadgeCount,
  onSelectChat,
  onSearchChange,
  onTabChange,
  onSendMessage,
  onConfirmOrder,
  isSendMessageLoading = false,
  isSendMessageError = false,
  isLoading = false,
  isLoadMoreFetching = false,
  hasMore = false,
  onLoadMore,
}: MessagesTemplateProps) {
  const messagesToShow: ChatHistoryMessage[] = [
    ...(chatHistory?.messages ?? []),
    ...optimisticMessages,
  ];
  const [messageInput, setMessageInput] = useState("");
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const resetMessageInputSize = () => {
    const textarea = messageInputRef.current;
    if (!textarea) return;

    textarea.style.height = "";
    textarea.style.overflowY = "hidden";
  };

  const handleSelectChat = (chatId: string | null) => {
    resetMessageInputSize();
    onSelectChat(chatId);
  };

  const handleTabChange = (tab: MessageTab) => {
    onTabChange(tab);
    onSelectChat(null);
  };

  useEffect(() => {
    const textarea = messageInputRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    const computedStyles = window.getComputedStyle(textarea);
    const lineHeight = Number.parseFloat(computedStyles.lineHeight) || 20;
    const paddingTop = Number.parseFloat(computedStyles.paddingTop) || 0;
    const paddingBottom = Number.parseFloat(computedStyles.paddingBottom) || 0;
    const minHeight = Number.parseFloat(computedStyles.minHeight) || 0;
    const maxHeight = lineHeight * 8 + paddingTop + paddingBottom;
    const contentHeight = textarea.scrollHeight;
    const nextHeight = Math.min(contentHeight, maxHeight);

    if (nextHeight <= minHeight) {
      textarea.style.height = "";
    } else {
      textarea.style.height = `${nextHeight}px`;
    }
    textarea.style.overflowY = contentHeight > maxHeight ? "auto" : "hidden";
  }, [messageInput]);

  const submitMessage = () => {
    if (!messageInput.trim() || isSendMessageLoading) return;
    onSendMessage(messageInput);
    setMessageInput("");
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage();
  };

  const handleMessageInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  };

  const showListOnMobile = !selectedChatId;
  const showChatOnMobile = !!selectedChatId;

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-6rem)] min-h-[400px] flex-col lg:h-[calc(100vh-8rem)] lg:min-h-[500px] lg:flex-row">
        {/* Left panel - full width on mobile when no chat selected; sidebar on desktop */}
        <div
          className={cn(
            "flex w-full flex-col border-border lg:w-80 lg:shrink-0 lg:border-r",
            showListOnMobile ? "flex" : "hidden lg:flex"
          )}
        >
          <div className="flex justify-center border-b border-border p-2 sm:p-3 lg:block">
            <div className="w-full max-w-xl lg:max-w-none">
              <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Поиск.." />
            </div>
          </div>
          <div className="border-b border-border px-2 pb-2 sm:px-3">
            <div className="flex w-full items-center">
              {(["Все", "Покупка", "Продажа"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={cn(
                    "relative flex flex-1 items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors",
                    activeTab === tab
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                  {tab === "Продажа" && saleBadgeCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="h-6 min-w-6 rounded-full px-2 text-sm font-medium"
                    >
                      {saleBadgeCount}
                    </Badge>
                  )}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
                  Загрузка…
                </div>
              ) : chats.length === 0 ? (
                <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
                  Диалоги не найдены
                </div>
              ) : (
                chats.map((chat) => (
                  <button
                    key={chat.chat_id}
                    type="button"
                    onClick={() => handleSelectChat(chat.chat_id)}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-border p-3 text-left transition-colors hover:bg-accent/50",
                      selectedChatId === chat.chat_id && "bg-accent/50 border-l-2 border-l-primary"
                    )}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted lg:h-10 lg:w-10">
                      {chat.product_cover_url ? (
                        <img
                          src={buildCoverUrl(chat.product_cover_url)}
                          alt={chat.product_title}
                          className="h-10 w-10 rounded object-cover lg:h-8 lg:w-8"
                        />
                      ) : (
                        <Bot className="h-6 w-6 text-muted-foreground lg:h-5 lg:w-5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-medium text-foreground lg:text-sm">
                        {chat.product_title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {chat.last_message_text ?? ""}
                      </p>
                    </div>
                    {chat.unread_count > 0 && (
                      <Badge
                        variant="default"
                        className="h-5 min-w-5 shrink-0 rounded-full px-1.5 text-xs"
                      >
                        {chat.unread_count}
                      </Badge>
                    )}
                  </button>
                ))
              )}
            </div>
            {!isLoading && hasMore && onLoadMore && (
              <div className="shrink-0 border-t border-border p-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onLoadMore}
                  disabled={isLoadMoreFetching}
                >
                  {isLoadMoreFetching ? "Загрузка…" : "Загрузить ещё"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right panel - on mobile only visible when a conversation is selected */}
        <div
          className={cn(
            "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
            showChatOnMobile ? "flex" : "hidden lg:flex"
          )}
        >
          {!selectedChat ? (
            <div className="flex flex-1 items-center justify-center px-4 text-center text-muted-foreground">
              Выберите диалог
            </div>
          ) : (
            <>
              {/* Header with back button on mobile */}
              <div className="flex items-center gap-2 border-b border-border p-3 sm:gap-3 sm:p-4">
                <button
                  type="button"
                  onClick={() => handleSelectChat(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
                  aria-label="Назад к списку"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  {selectedChat.product_cover_url ? (
                    <img
                      src={buildCoverUrl(selectedChat.product_cover_url)}
                      alt={selectedChat.product_title}
                      className="h-8 w-8 rounded object-cover"
                    />
                  ) : (
                    <Bot className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold text-foreground sm:text-lg">
                    {selectedChat.product_title}
                  </h2>
                  <RatingStars rating={0} reviewCount={0} size="sm" />
                </div>
              </div>

              {/* Date */}
              <p className="px-3 py-2 text-center text-xs text-muted-foreground sm:px-4 sm:text-sm">
                {formatDate(selectedChat.chat_created_at)}
              </p>

              {/* System message (payment pending) */}
              {!!selectedChat.purchase_confirmation_deadline && (
                <p className="px-3 py-2 text-center text-xs text-muted-foreground sm:px-4 sm:text-sm">
                  Вы оплатили покупку. У вас есть 24 часа на подтверждения товара, после чего
                  средства поступят продавцу автоматически
                </p>
              )}

              {/* Product confirmation card */}
              {!!selectedChat.purchase_confirmation_deadline && (
                <div className="mx-3 mb-4 rounded-lg border border-border bg-card p-3 sm:mx-4 sm:p-4">
                  <div className="mb-4 flex gap-3 sm:gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted text-center text-xs text-muted-foreground sm:h-24 sm:w-24">
                      {selectedChat.product_cover_url ? (
                        <img
                          src={buildCoverUrl(selectedChat.product_cover_url)}
                          alt={selectedChat.product_title}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      ) : (
                        <span className="p-2">SNEAKER BOT</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">{selectedChat.product_title}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedChat.counterparty_username}
                      </p>
                      <RatingStars rating={0} reviewCount={0} size="sm" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-foreground">Ссылка на продукт</Label>
                      <p className="mt-1 text-sm text-muted-foreground">-</p>
                    </div>
                    {chatHistory?.chat?.product_instructions && (
                      <div>
                        <Label className="text-foreground">Инструкция к продукту</Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {chatHistory.chat.product_instructions}
                        </p>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/10"
                      onClick={onConfirmOrder}
                    >
                      Подтвердить заказ
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-2 sm:px-4">
                {isChatHistoryLoading ? (
                  <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
                    Загрузка…
                  </div>
                ) : isChatHistoryError ? (
                  <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
                    Ошибка загрузки истории чата
                  </div>
                ) : messagesToShow.length === 0 ? (
                  <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
                    Нет сообщений
                  </div>
                ) : (
                  messagesToShow.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex items-end gap-1.5 sm:gap-2",
                        msg.is_own_message ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div
                        className={cn(
                          "min-w-0 max-w-[85%] break-words rounded-lg px-3 py-2 text-sm sm:max-w-[75%]",
                          msg.is_own_message
                            ? "bg-primary/20 text-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {msg.message_text}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatMessageTime(msg.created_at)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Message input */}
              <div className="shrink-0 border-t border-border p-2 sm:p-3">
                {isSendMessageError && (
                  <p className="mb-2 text-sm text-destructive">Не удалось отправить сообщение</p>
                )}
                <form onSubmit={handleSubmitMessage} className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground sm:h-10 sm:w-10"
                    aria-label="Прикрепить"
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <Textarea
                    id="message-input"
                    ref={messageInputRef}
                    rows={1}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleMessageInputKeyDown}
                    placeholder="Написать сообщение..."
                    disabled={isSendMessageLoading}
                    className="min-h-10 min-w-0 flex-1 resize-none border-border py-2 text-base focus-visible:ring-primary sm:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isSendMessageLoading}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50 sm:h-10 sm:w-10"
                    aria-label="Отправить сообщение"
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
