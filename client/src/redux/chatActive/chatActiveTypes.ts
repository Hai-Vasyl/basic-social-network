export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT"
export const SET_MESSAGES_CHAT = "SET_MESSAGES_CHAT"

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
  payload: string
}
export interface setChatMessages {
  type: typeof SET_MESSAGES_CHAT
  payload: IchatMessage[]
}

export type ChatActiveReducerTypes = setActiveChat | setChatMessages
