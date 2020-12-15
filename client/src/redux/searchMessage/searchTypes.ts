import { IchatMessage } from "../chatActive/chatActiveTypes"

export const SET_SEARCH_MESSAGE = "SET_SEARCH_MESSAGE"
export const SET_SEARCHED_MESSAGES = "SET_SEARCHED_MESSAGES"
export const CLEAR_SEARCH_MESSAGE = "CLEAR_SEARCH_MESSAGE"

export interface setSearchMessage {
  type: typeof SET_SEARCH_MESSAGE
  payload: string
}

export interface clearSearchMessage {
  type: typeof CLEAR_SEARCH_MESSAGE
}

export interface setSearchedMessages {
  type: typeof SET_SEARCHED_MESSAGES
  payload: IchatMessage[]
}

export type SearchChatReducerTypes =
  | clearSearchMessage
  | setSearchMessage
  | setSearchedMessages
