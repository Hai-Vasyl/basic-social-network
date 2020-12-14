import React from "react"
import { RootStore } from "../redux/store"
import { useSelector } from "react-redux"

const ChatUserConnect: React.FC = () => {
  const {
    auth: { user },
    currentChat: { route },
  } = useSelector((state: RootStore) => state)

  return (
    <div>
      Hello world! {route.chatId} {route.keyWord}
    </div>
  )
}

export default ChatUserConnect
