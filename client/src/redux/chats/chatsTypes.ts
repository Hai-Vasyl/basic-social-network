export const SET_CHATS = "SET_CHATS"

export interface IOwnerChat {
  id: string
  username: string
  email: string
  ava: string
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
}

export interface setChats {
  type: typeof SET_CHATS
  payload: IChat[]
}

export type ChatsReducerTypes = setChats
