import { combineReducers } from "redux"
import authReducer from "./auth/authReducer"
import toggleReducer from "./toggle/toggleReducer"
import chatsReducer from "./chats/chatsReducer"
import chatActiveReducer from "./chatActive/chatActiveReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  toggle: toggleReducer,
  chats: chatsReducer,
  currentChat: chatActiveReducer,
})

export default rootReducer
