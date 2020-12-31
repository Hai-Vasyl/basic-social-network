export const SET_CHATS = "SET_CHATS"
export const CHANGE_CHAT_LAST_MSG = "CHANGE_CHAT_LAST_MSG"

export interface IOwnerChat {
  id: string
  username: string
  email: string
  ava: string
}

export interface ILastMessage {
  id: string
  content: string
  date: string
  owner: {
    id: string
    username: string
    email: string
  }
  chat: {
    id: string
  }
}

export interface IChat {
  id: string
  title: string
  channel: string
  description: string
  date: string
  image: string
  owner?: {
    id: string
  }
  owners?: IOwnerChat[]
  type: string
  lastMessage?: ILastMessage
}

export interface setChats {
  type: typeof SET_CHATS
  payload: IChat[]
}

export interface chageLastMessageChat {
  type: typeof CHANGE_CHAT_LAST_MSG
  payload: { chatId: string; message: ILastMessage }
}

export type ChatsReducerTypes = setChats | chageLastMessageChat
