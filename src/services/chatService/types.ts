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
export interface ChatCursor {
  has_unread: boolean;
  updated_at: string;
  chat_id: string;
}

/**
 * Single chat row from get_user_chats (camelCase API shape).
 * Does not include hasMore/nextCursor; those are taken from the last row for the response.
 */
export type UserChat = Database["public"]["Functions"]["rpc_get_user_chats"]["Returns"][0];

/**
 * Response shape for getUserChats endpoint.
 */
export interface GetChatsResponse {
  data: UserChat[];
  hasMore: boolean;
  nextCursor: ChatCursor | null;
}

/**
 * Arguments for getUserChats endpoint.
 */
export type GetUserChatsArgs = Omit<
  Database["public"]["Functions"]["rpc_get_user_chats"]["Args"],
  "p_cursor"
> & {
  p_cursor?: ChatCursor | null;
};
