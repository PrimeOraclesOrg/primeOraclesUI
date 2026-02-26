import { baseApi } from "@/store/baseApi";
import { getChatHistory, getUserChats } from "@/services/chatService/chatService";
import {
  ChatHistoryResponse,
  GetChatsResponse,
  GetUserChatsArgs,
} from "@/services/chatService/types";

export const chatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserChats: builder.query<GetChatsResponse, GetUserChatsArgs>({
      queryFn: async (args) => {
        const { data, error } = await getUserChats(args);
        if (error) return { error };
        return { data };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (!queryArgs) return `${endpointName}()`;
        const { p_filter, p_search = "" } = queryArgs;
        return `${endpointName}-${p_filter}-${p_search}`;
      },
      merge: (currentCache, response, { arg }) => {
        if (arg.p_cursor == null) {
          return response;
        }
        const existingIds = new Set(currentCache.data.map((c) => c.chat_id));
        const newChats = response.data.filter((c) => !existingIds.has(c.chat_id));
        return {
          data: [...currentCache.data, ...newChats],
          hasMore: response.hasMore,
          nextCursor: response.nextCursor,
        };
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        if (!currentArg || !previousArg) return true;
        return (
          currentArg.p_filter !== previousArg.p_filter ||
          (currentArg.p_search ?? "") !== (previousArg.p_search ?? "")
        );
      },

      providesTags: ["Chats"],
    }),
    getChatHistory: builder.query<ChatHistoryResponse, string>({
      queryFn: async (p_chat_id) => {
        const { data, error } = await getChatHistory(p_chat_id);
        if (error) return { error };
        return { data };
      },
      providesTags: (_result, _err, chatId) => [{ type: "Chats", id: `history-${chatId}` }],
    }),
  }),
});

export const { useGetUserChatsQuery, useGetChatHistoryQuery } = chatsApi;
