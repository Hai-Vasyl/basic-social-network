import React from "react"
// @ts-ignore
import styles from "../styles/chat.module"
import { GET_CHAT_INFO } from "../fetching/queries"
import { useQuery } from "@apollo/client"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import UserInfo from "../components/UserInfo"
import ChatInfoComponent from "../components/ChatInfo"
import Loader from "../components/Loader"

interface IChatInfoProps {
  connect?: string
}

const ChatInfo: React.FC<IChatInfoProps> = ({ connect }) => {
  const {
    currentChat: { route },
    chats,
    auth: { user },
  } = useSelector((state: RootStore) => state)

  let isIndividualChat
  let chatOwner
  if (!connect?.length) {
    const chat = chats.find((chat) => chat.id === route.chatId)
    isIndividualChat = chat?.type === "individual"

    if (isIndividualChat) {
      chatOwner =
        chat?.owners && chat.owners.find((owner) => owner.id !== user.id)
    }
  }

  const { data, loading, error } = useQuery(GET_CHAT_INFO, {
    variables: {
      id: isIndividualChat ? chatOwner?.id : route.chatId,
      isChat: connect?.length ? connect === "chat" : !isIndividualChat,
    },
  })

  return (
    <div className={styles.chatWrapper}>
      {loading ? (
        <Loader />
      ) : connect === "user" || isIndividualChat ? (
        <UserInfo
          isConnect={!!connect?.length}
          {...data.getChatUserInfo.user}
        />
      ) : (
        <ChatInfoComponent
          isConnect={!!connect?.length}
          {...data.getChatUserInfo.chat}
        />
      )}
    </div>
  )
}

export default ChatInfo
