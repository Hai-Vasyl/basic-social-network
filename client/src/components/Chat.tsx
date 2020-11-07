import React from "react"
import { RootStore } from "../redux/store"
import { useSelector, useDispatch } from "react-redux"

const Chat = () => {
  const { chats } = useSelector((state: RootStore) => state)
  console.log({ chats })
  return (
    <div>
      <div>Chat</div>
    </div>
  )
}

export default Chat
