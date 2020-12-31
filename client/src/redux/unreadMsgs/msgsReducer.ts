import {
  SET_UNREAD_MESSAGES,
  SET_UNREAD_MESSAGE,
  DELETE_UNREAD_MESSAGES,
  UnreadMsgsReducerTypes,
} from "./msgsTypes"
import { IMessage } from "../../interfaces"

interface IInitState {
  messages: IMessage[]
}

const initState: IInitState = {
  messages: [],
}

const unreadMsgsReducer = (
  state = initState,
  action: UnreadMsgsReducerTypes
) => {
  switch (action.type) {
    case SET_UNREAD_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      }
    case SET_UNREAD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case DELETE_UNREAD_MESSAGES:
      return {
        ...state,
        messages: state.messages.filter(
          (msg) => msg.chat.id !== action.payload
        ),
      }
    default:
      return state
  }
}

export default unreadMsgsReducer
