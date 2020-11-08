import {
  SET_ACTIVE_CHAT,
  ChatActiveReducerTypes,
  IchatMessage,
  SET_MESSAGES_CHAT,
} from "./chatActiveTypes"

interface IChatActiveState {
  chatId: string
  messages: IchatMessage[]
}

const initState: IChatActiveState = {
  chatId: "",
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
        chatId: action.payload,
      }
    case SET_MESSAGES_CHAT:
      return {
        ...state,
        messages: action.payload,
      }
    default:
      return state
  }
}

export default chatActiveRedicer
