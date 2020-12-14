export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT"
export const SET_MESSAGES_CHAT = "SET_MESSAGES_CHAT"
export const ADD_MESSAGE_CHAT = "ADD_MESSAGE_CHAT"

export interface IchatMessage {
  id: string
  content: string
  date: string
  owner: {
    id: string
    username: string
    ava: string
  }
  chat: {
    id: string
  }
}

export interface setActiveChat {
  type: typeof SET_ACTIVE_CHAT
  payload: { chatId: string; keyWord: string }
}
export interface setChatMessages {
  type: typeof SET_MESSAGES_CHAT
  payload: IchatMessage[]
}
export interface addNewMessage {
  type: typeof ADD_MESSAGE_CHAT
  payload: IchatMessage
}

export type ChatActiveReducerTypes =
  | setActiveChat
  | setChatMessages
  | addNewMessage
