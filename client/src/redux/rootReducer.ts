import { combineReducers } from "redux"
import authReducer from "./auth/authReducer"
import toggleReducer from "./toggle/toggleReducer"
import chatsReducer from "./chats/chatsReducer"
import chatActiveReducer from "./chatActive/chatActiveReducer"
import searchChatReducer from "./searchChat/searchReducer"
import searchMessageReducer from "./searchMessage/searchReducer"
import queueChatsReducer from "./queueChats/queueReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  toggle: toggleReducer,
  chats: chatsReducer,
  currentChat: chatActiveReducer,
  searchChat: searchChatReducer,
  searchMessage: searchMessageReducer,
  queueChats: queueChatsReducer,
})

export default rootReducer
