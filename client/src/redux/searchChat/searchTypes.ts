export const SET_SEARCH_CHAT = "SET_SEARCH_CHAT"
export const CLEAR_SEARCH_CHAT = "CLEAR_SEARCH_CHAT"

export interface setSearchChat {
  type: typeof SET_SEARCH_CHAT
  payload: string
}

export interface clearSearchChat {
  type: typeof CLEAR_SEARCH_CHAT
}

export type SearchChatReducerTypes = setSearchChat | clearSearchChat
