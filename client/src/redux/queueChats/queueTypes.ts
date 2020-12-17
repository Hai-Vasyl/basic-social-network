export const SET_CHAT_QUEUE = "SET_CHAT_QUEUE"
export const SET_CHATS_QUEUE = "SET_CHATS_QUEUE"
export const REMOVE_CHAT_QUEUE = "REMOVE_CHAT_QUEUE"

interface setChatQueue {
  type: typeof SET_CHAT_QUEUE
  payload: string
}

interface removeChatQueue {
  type: typeof REMOVE_CHAT_QUEUE
  payload: string
}

interface setChatsQueue {
  type: typeof SET_CHATS_QUEUE
  payload: string[]
}

export type ChatsQueueReducerTypes =
  | setChatQueue
  | setChatsQueue
  | removeChatQueue
