import {
  SET_CHATS,
  CHANGE_CHAT_LAST_MSG,
  ChatsReducerTypes,
  IChat,
} from "./chatsTypes"

const initState: IChat[] = []

const chatsReducer = (
  state = initState,
  action: ChatsReducerTypes
): IChat[] => {
  switch (action.type) {
    case SET_CHATS:
      return action.payload
    case CHANGE_CHAT_LAST_MSG:
      return [...state].map((chat) => {
        if (chat.id === action.payload.chatId) {
          return { ...chat, lastMessage: action.payload.message }
        }
        return chat
      })
    default:
      return state
  }
}

export default chatsReducer
