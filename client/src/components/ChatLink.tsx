import React from "react"
import { IChatOwner, IMessage } from "../interfaces"
import { useDispatch, useSelector } from "react-redux"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import { IChat } from "../redux/chats/chatsTypes"
import { BsLock, BsPeople, BsPerson } from "react-icons/bs"
import { RootStore } from "../redux/store"
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
  const {
    unreadMsgs: { messages },
    auth: { user },
  } = useSelector((state: RootStore) => state)

  const getMessageCount = () => {
    let count = 0
    messages.forEach((msg) => {
      if (msg.chat.id === chat.id) {
        count++
      }
    })

    return count
  }

  const msgCount = getMessageCount()

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
        {!chatIndividual && (
          <div className={styles.chat_link__type}>
            {chat.type === "public" ? <BsPeople /> : <BsLock />}
          </div>
        )}
      </div>
      <div className={styles.chat_link__info}>
        <div className={styles.chat_link__title_container}>
          <div className={styles.chat_link__title_content}>
            <span className={styles.chat_link__title}>
              {chatIndividual ? chatOwner?.username : chat.title}
            </span>
            {chat.lastMessage && chat.lastMessage.id && (
              <span className={styles.chat_link__last_msg}>
                {chat.type !== "individual" ? (
                  <span className={styles.chat_link__msg_username}>
                    {chat.lastMessage.owner.id === user.id
                      ? "You"
                      : chat.lastMessage.owner.username}
                    :
                  </span>
                ) : (
                  chat.lastMessage.owner.id === user.id && (
                    <span className={styles.chat_link__msg_username}>You:</span>
                  )
                )}
                {chat.lastMessage.content}
              </span>
            )}
          </div>
          <span
            className={`${styles.chat_link__counter_msg} ${
              msgCount && styles.chat_link__counter_msg__active
            }`}
          >
            <span>{msgCount > 25 ? "25+" : msgCount}</span>
          </span>
        </div>
      </div>
    </button>
  )
}

export default ChatLink
