import { IMessage } from "../../interfaces"

export const SET_UNREAD_MESSAGES = "SET_UNREAD_MESSAGES"
export const SET_UNREAD_MESSAGE = "SET_UNREAD_MESSAGE"

export interface setUnreadMessages {
  type: typeof SET_UNREAD_MESSAGES
  payload: IMessage[]
}

export interface setUnreadMessage {
  type: typeof SET_UNREAD_MESSAGE
  payload: IMessage
}

export type UnreadMsgsReducerTypes = setUnreadMessages | setUnreadMessage
