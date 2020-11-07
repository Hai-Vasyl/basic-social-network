import { SET_CHATS, ChatsReducerTypes, IChat } from "./chatsTypes"

const initState: IChat[] = []

const chatsReducer = (
  state = initState,
  action: ChatsReducerTypes
): IChat[] => {
  switch (action.type) {
    case SET_CHATS:
      return action.payload
    default:
      return state
  }
}

export default chatsReducer
