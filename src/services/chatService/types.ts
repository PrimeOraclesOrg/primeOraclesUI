import { Database } from "@/types/supabase";

export enum ChatsFilter {
  ALL = "all",
  BUY = "buy",
  SELL = "sell",
}

/**
 * Cursor for keyset pagination of user chats.
 * Matches the next_cursor shape returned by get_user_chats RPC.
 */
export type ChatCursor = {
  has_unread: boolean;
  updated_at: string;
  chat_id: string;
};

/**
 * Single chat row from get_user_chats (camelCase API shape).
 * Does not include hasMore/nextCursor; those are taken from the last row for the response.
 */
export type UserChat = Database["public"]["Functions"]["rpc_get_user_chats"]["Returns"][0];

/**
 * Response shape for getUserChats endpoint.
 */
export type GetChatsResponse = {
  data: UserChat[];
  hasMore: boolean;
  nextCursor: ChatCursor | null;
};

/**
 * Arguments for getUserChats endpoint.
 */
export type GetUserChatsArgs = Omit<
  Database["public"]["Functions"]["rpc_get_user_chats"]["Args"],
  "p_cursor"
> & {
  p_cursor?: ChatCursor | null;
};

/**
 * Chat history (rpc_get_chat_history) types.
 * Matches the JSON shape returned by the RPC.
 */
export type ChatHistoryMessage = {
  id: string;
  author_id: string;
  message_text: string;
  created_at: string;
  is_own_message: boolean;
};

export type ChatHistoryChat = {
  id: string;
  is_closed: boolean;
  created_at: string;
  purchase_confirmation_deadline: string | null;
  product_instructions: string | null;
};

export type ChatHistoryPerson = {
  id: string;
  username: string;
  avatar_path: string | null;
};

export type ChatHistoryResponse = {
  chat: ChatHistoryChat;
  buyer: ChatHistoryPerson;
  seller: ChatHistoryPerson;
  messages: ChatHistoryMessage[];
};
