import {
  SET_CHAT_QUEUE,
  SET_CHATS_QUEUE,
  REMOVE_CHAT_QUEUE,
  ChatsQueueReducerTypes,
} from "./queueTypes"

interface IInitState {
  chats: string[]
}

const initState: IInitState = {
  chats: [],
}

const queueChatsReducer = (
  state = initState,
  action: ChatsQueueReducerTypes
) => {
  switch (action.type) {
    case SET_CHAT_QUEUE:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      }
    case REMOVE_CHAT_QUEUE:
      return {
        ...state,
        chats: [...state.chats].filter((chatId) => chatId !== action.payload),
      }
    case SET_CHATS_QUEUE:
      return {
        ...state,
        chats: action.payload,
      }
    default:
      return state
  }
}

export default queueChatsReducer
