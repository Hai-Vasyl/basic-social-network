import React from "react"
// @ts-ignore
import styles from "../styles/chat.module"
import { GET_CHAT_INFO } from "../fetching/queries"
import { useQuery } from "@apollo/client"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import UserInfo from "../components/UserInfo"
import ChatInfoComponent from "../components/ChatInfo"

const ChatInfo: React.FC = () => {
  const {
    currentChat: { route },
    chats,
    auth: { user },
  } = useSelector((state: RootStore) => state)
  const chat = chats.find((chat) => chat.id === route.chatId)
  const isIndividualChat = chat?.type === "individual"

  let chatOwner
  if (isIndividualChat) {
    chatOwner =
      chat?.owners && chat.owners.find((owner) => owner.id !== user.id)
  }
  const { data, loading, error } = useQuery(GET_CHAT_INFO, {
    variables: {
      id: isIndividualChat ? chatOwner?.id : route.chatId,
      isChat: !isIndividualChat,
    },
  })

  console.log(data)
  if (loading) {
    return <div>LOADING ...</div>
  }
  return (
    <div className={styles.chatWrapper}>
      {isIndividualChat ? (
        <UserInfo {...data.getChatUserInfo.user} />
      ) : (
        <ChatInfoComponent {...data.getChatUserInfo.chat} />
      )}
    </div>
  )
}

export default ChatInfo
