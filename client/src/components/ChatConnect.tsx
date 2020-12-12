import React from "react"
import { RootStore } from "../redux/store"
import { useSelector } from "react-redux"

const ChatConnect = () => {
  const {
    auth: { user },
    currentChat: { chatId },
  } = useSelector((state: RootStore) => state)

  return <div>Hello world! {chatId}</div>
}

export default ChatConnect
