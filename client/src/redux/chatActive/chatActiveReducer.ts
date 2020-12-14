import {
  SET_ACTIVE_CHAT,
  ChatActiveReducerTypes,
  IchatMessage,
  SET_MESSAGES_CHAT,
  ADD_MESSAGE_CHAT,
} from "./chatActiveTypes"

interface IChatActiveState {
  route: {
    chatId: string
    keyWord: string
  }
  messages: IchatMessage[]
}

const initState: IChatActiveState = {
  route: { chatId: "", keyWord: "" },
  messages: [],
}

const chatActiveRedicer = (
  state = initState,
  action: ChatActiveReducerTypes
): IChatActiveState => {
  switch (action.type) {
    case SET_ACTIVE_CHAT:
      return {
        ...state,
        route: action.payload,
      }
    case SET_MESSAGES_CHAT:
      return {
        ...state,
        messages: action.payload,
      }
    case ADD_MESSAGE_CHAT:
      return {
        ...state,
        messages: [...state.messages, { ...action.payload }],
      }
    default:
      return state
  }
}

export default chatActiveRedicer
