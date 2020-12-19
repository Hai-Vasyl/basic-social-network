import React from "react"
// @ts-ignore
import styles from "../styles/card.module"
import { BsLock, BsPeople, BsBell } from "react-icons/bs"
import { IChatCard } from "../interfaces"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"
import keyWords from "../modules/keyWords"
import { CHAT_OPEN } from "../redux/toggle/toggleTypes"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"

interface IChatCardProps {
  isEnvChat: boolean
  chat: IChatCard
  lighter?: boolean
}

const ChatCard: React.FC<IChatCardProps> = ({ chat, isEnvChat, lighter }) => {
  const { chats } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const isPinned = chats.find((pinnedChat) => pinnedChat.id === chat.id)

  const getChatTypeIcon = (type: string) => {
    switch (type) {
      case "public":
        return <BsPeople />
      case "privet":
        return <BsLock />
      default:
        return <BsBell />
    }
  }

  const handleLink = () => {
    if (!isEnvChat) {
      dispatch({ type: CHAT_OPEN })
    }
    dispatch({
      type: SET_ACTIVE_CHAT,
      payload: {
        keyWord: isPinned ? keyWords.chatMessages : keyWords.chatConnect,
        chatId: chat.id,
      },
    })
  }

  return (
    <div className={`${styles.card} ${lighter && styles.card_light}`}>
      <button className={styles.card__link} onClick={handleLink}>
        <img src={chat.image} alt='chatImage' className={styles.card__image} />
        <div className={styles.card__icon}>{getChatTypeIcon(chat.type)}</div>
      </button>
      <div className={styles.card__about}>
        <button className={styles.card__title} onClick={handleLink}>
          {chat.title}
        </button>
      </div>
    </div>
  )
}

export default ChatCard
