import React from "react"
import { IChatOwner } from "../interfaces"
import { useDispatch } from "react-redux"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import { IChat } from "../redux/chats/chatsTypes"
import { BsLock, BsPeople, BsPerson } from "react-icons/bs"
// @ts-ignore
import styles from "../styles/chat.module"

interface IChatLinkProps {
  chat: IChat
  chatId: string
  chatIndividual: boolean
  chatOwner: IChatOwner | undefined
  keyWord: string
  isAuthOwner?: boolean
}

const ChatLink: React.FC<IChatLinkProps> = ({
  chatOwner,
  chat,
  chatId,
  chatIndividual,
  keyWord,
  isAuthOwner,
}) => {
  const dispatch = useDispatch()
  return (
    <button
      className={`${styles.chat_link} ${
        chatId === chat.id && styles.chat_link__active
      }`}
      key={chat.id}
      onClick={() =>
        dispatch({
          type: SET_ACTIVE_CHAT,
          payload: { chatId: chat.id, keyWord },
        })
      }
    >
      <div
        className={`${styles.chat_link__img_container} ${
          isAuthOwner && styles.chat_link__img_container__active
        }`}
      >
        <img
          className={styles.chat_link__img}
          src={chatIndividual ? chatOwner?.ava : chat.image}
          alt='chatImage'
        />
        {chatIndividual ? (
          <BsPerson className={styles.chat_link__type} />
        ) : chat.type === "privet" ? (
          <BsLock className={styles.chat_link__type} />
        ) : (
          <BsPeople className={styles.chat_link__type} />
        )}
      </div>
      <div className={styles.chat_link__title_container}>
        <span className={styles.chat_link__title}>
          {chatIndividual ? chatOwner?.username : chat.title}
        </span>
      </div>
    </button>
  )
}

export default ChatLink
