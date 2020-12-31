import { IMessage } from "../../interfaces"

export const SET_UNREAD_MESSAGES = "SET_UNREAD_MESSAGES"
export const SET_UNREAD_MESSAGE = "SET_UNREAD_MESSAGE"
export const DELETE_UNREAD_MESSAGES = "DELETE_UNREAD_MESSAGES"

export interface setUnreadMessages {
  type: typeof SET_UNREAD_MESSAGES
  payload: IMessage[]
}

export interface setUnreadMessage {
  type: typeof SET_UNREAD_MESSAGE
  payload: IMessage
}

export interface deleteUnreadMessages {
  type: typeof DELETE_UNREAD_MESSAGES
  payload: string
}

export type UnreadMsgsReducerTypes =
  | setUnreadMessages
  | setUnreadMessage
  | deleteUnreadMessages
