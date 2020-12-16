import React from "react"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import keyWords from "../modules/keyWords"

// import ChatUserConnect from "../screens/ChatUserConnect"
import ChatMessages from "../screens/ChatMessages"
import ChatCreateNew from "../screens/ChatCreateNew"
import ChatEdit from "../screens/ChatEdit"
import ChatInfo from "../screens/ChatInfo"
import ChatEmpty from "../screens/ChatEmpty"

const ChatRoutes: React.FC = () => {
  const {
    currentChat: { route },
  } = useSelector((state: RootStore) => state)

  const setScreens = () => {
    switch (route.keyWord) {
      case keyWords.chatMessages:
        return <ChatMessages />
      case keyWords.chatCreateNew:
        return <ChatCreateNew />
      case keyWords.userConnect:
        return <ChatInfo connect='user' />
      case keyWords.chatConnect:
        return <ChatInfo connect='chat' />
      case keyWords.chatEdit:
        return <ChatEdit />
      case keyWords.chatInfo:
        return <ChatInfo />
      default:
        return <ChatEmpty />
    }
  }

  return <>{setScreens()}</>
}

export default ChatRoutes
