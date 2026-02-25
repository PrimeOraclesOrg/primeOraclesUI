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
