export const SET_SEARCH_MESSAGE = "SET_SEARCH_MESSAGE"
export const CLEAR_SEARCH_MESSAGE = "CLEAR_SEARCH_MESSAGE"

export interface setSearchMessage {
  type: typeof SET_SEARCH_MESSAGE
  payload: string
}

export interface clearSearchMessage {
  type: typeof CLEAR_SEARCH_MESSAGE
}

export type SearchChatReducerTypes = clearSearchMessage | setSearchMessage
