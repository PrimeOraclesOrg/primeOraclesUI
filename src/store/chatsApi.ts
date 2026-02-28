import { baseApi } from "@/store/baseApi";
import {
  getChatHistory,
  getUserChats,
  sendMessageService,
} from "@/services/chatService/chatService";
import {
  ChatHistoryMessage,
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
    sendMessage: builder.mutation<void, { p_chat_id: string; p_message_text: string }>({
      queryFn: async (arg) => {
        const { error } = await sendMessageService(arg.p_chat_id, arg.p_message_text);
        if (error) return { error };
        return { data: undefined };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const optimisticMessage: ChatHistoryMessage = {
          id: `opt-${Date.now()}`,
          author_id: "",
          message_text: arg.p_message_text,
          created_at: new Date().toISOString(),
          is_own_message: true,
        };
        dispatch(
          chatsApi.util.updateQueryData("getChatHistory", arg.p_chat_id, (draft) => {
            if (draft?.messages) draft.messages.push(optimisticMessage);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          dispatch(
            chatsApi.util.updateQueryData("getChatHistory", arg.p_chat_id, (draft) => {
              if (draft?.messages) {
                draft.messages = draft.messages.filter((m) => m.id !== optimisticMessage.id);
              }
            })
          );
        }
      },
      invalidatesTags: (_result, error) => (error ? [] : ["Chats"]),
    }),
  }),
});

export const { useGetUserChatsQuery, useGetChatHistoryQuery, useSendMessageMutation } = chatsApi;
