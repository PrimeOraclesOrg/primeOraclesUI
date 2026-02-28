import { useState, useEffect, useCallback } from "react";
import { ChatCursor, ChatsFilter } from "@/services/chatService/types";
import { useGetUserChatsQuery } from "@/store/chatsApi";

const DEFAULT_LIMIT = 20;

export interface UsePaginatedChatsParams {
  filter: ChatsFilter;
  search?: string;
  limit?: number;
}

export function usePaginatedChats({
  filter,
  search = "",
  limit = DEFAULT_LIMIT,
}: UsePaginatedChatsParams) {
  const [cursor, setCursor] = useState<ChatCursor | null>(null);

  useEffect(() => {
    setCursor(null);
  }, [filter, search]);

  const { data, isLoading, isFetching } = useGetUserChatsQuery({
    p_limit: limit,
    p_filter: filter,
    p_search: search.trim() ?? undefined,
    p_cursor: cursor ?? undefined,
  });

  const loadMore = useCallback(() => {
    if (data?.hasMore && data?.nextCursor) {
      setCursor(data.nextCursor);
    }
  }, [data?.hasMore, data?.nextCursor]);

  const refresh = useCallback(() => {
    setCursor(null);
  }, []);

  return {
    chats: data?.data ?? [],
    isLoading,
    isFetching,
    hasMore: data?.hasMore ?? false,
    loadMore,
    refresh,
  };
}
