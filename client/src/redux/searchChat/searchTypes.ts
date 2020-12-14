export const SET_SEARCH_CHAT = "SET_SEARCH_CHAT"

export interface setSearchChat {
  type: typeof SET_SEARCH_CHAT
  payload: string
}

export type SearchChatReducerTypes = setSearchChat
