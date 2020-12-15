import {
  CLEAR_SEARCH_MESSAGE,
  SET_SEARCH_MESSAGE,
  SearchChatReducerTypes,
} from "./searchTypes"

interface IInitState {
  searchStr: string
}

const initState: IInitState = {
  searchStr: "",
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
    default:
      return state
  }
}

export default searchMessageReducer
