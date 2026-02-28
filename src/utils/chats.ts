import { MessageTab } from "@/pages/Messages/useMessages";
import { ChatsFilter } from "@/services/chatService/types";

export const chatsFilterFromTab = (tab: MessageTab): ChatsFilter => {
  switch (tab) {
    case "Покупка":
      return ChatsFilter.BUY;
    case "Продажа":
      return ChatsFilter.SELL;
    default:
      return ChatsFilter.ALL;
  }
};

export const formatMessageTime = (date: string): string => {
  return new Date(date).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
