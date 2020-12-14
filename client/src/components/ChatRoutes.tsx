import React from "react"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"

import ChatUserConnect from "../screens/ChatUserConnect"
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
      case "chat-messages":
        return <ChatMessages />
      case "chat-new":
        return <ChatCreateNew />
      case "user-connect":
        return <ChatUserConnect />
      case "chat-connect":
        return <ChatUserConnect />
      case "chat-edit":
        return <ChatEdit />
      case "chat-info":
        return <ChatInfo />
      default:
        return <ChatEmpty />
    }
  }

  return <>{setScreens()}</>
}

export default ChatRoutes
