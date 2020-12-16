import React from "react"
// @ts-ignore
import styles from "../styles/chat.module"
import { BsChatDots } from "react-icons/bs"

const ChatEmpty: React.FC = () => {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.msg_plug}>
        <BsChatDots className={styles.msg_plug__icon} />
        <div className={styles.msg_plug__title}>Start chatting</div>
        <div className={styles.msg_plug__description}>
          👉 Find friends, teammates, acquaintances and chat with them or create
          your own group and invite friends 😃
        </div>
      </div>
    </div>
  )
}

export default ChatEmpty
