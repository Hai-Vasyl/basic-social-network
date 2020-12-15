import {
  CLEAR_SEARCH_MESSAGE,
  SET_SEARCH_MESSAGE,
  SET_SEARCHED_MESSAGES,
  SearchChatReducerTypes,
} from "./searchTypes"
import { IchatMessage } from "../chatActive/chatActiveTypes"

interface IInitState {
  searchStr: string
  messages: IchatMessage[]
}

const initState: IInitState = {
  searchStr: "",
  messages: [],
}

const searchMessageReducer = (
  state = initState,
  action: SearchChatReducerTypes
) => {
  switch (action.type) {
    case SET_SEARCH_MESSAGE:
      return {
        ...state,
        searchStr: action.payload,
      }
    case CLEAR_SEARCH_MESSAGE:
      return {
        ...state,
        searchStr: "",
      }
    case SET_SEARCHED_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      }
    default:
      return state
  }
}

export default searchMessageReducer
