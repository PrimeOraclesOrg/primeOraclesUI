import { supabase, normalizeError } from "@/utils";
import { ServiceResult } from "@/types/serviceTypes";
import { Json } from "@/types/supabase";
import { ChatCursor, GetChatsResponse, GetUserChatsArgs } from "./types";

export async function getUserChats({
  p_limit,
  p_filter,
  p_search,
  p_cursor,
}: GetUserChatsArgs): Promise<ServiceResult<GetChatsResponse>> {
  try {
    const { data: rows, error } = await supabase.rpc("rpc_get_user_chats", {
      p_limit,
      p_filter,
      p_search: p_search?.trim() || null,
      p_cursor: (p_cursor as unknown as Json) ?? null,
    });

    if (error) throw error;

    const last = rows[rows.length - 1] ?? null;
    const hasMore = last?.has_more ?? false;
    const nextCursor = last?.next_cursor ? (last.next_cursor as unknown as ChatCursor) : null;

    return {
      data: { data: rows, hasMore, nextCursor },
      error: null,
    };
  } catch (err) {
    return normalizeError(err);
  }
}
