import React, { useState } from "react"
import { useSelector } from "react-redux"
import MsgContainer from "../components/MsgContainer"
import { AiOutlinePaperClip, AiOutlineSmile } from "react-icons/ai"
import { CREATE_MESSAGE } from "../fetching/mutations"
import { useMutation } from "@apollo/client"
import { RootStore } from "../redux/store"
import keyWords from "../modules/keyWords"
// @ts-ignore
import styles from "../styles/chat.module"

const ChatMessages: React.FC = () => {
  const {
    currentChat: { route },
    searchMessage: { searchStr },
  } = useSelector((state: RootStore) => state)
  const [createMessage, { data, error, loading }] = useMutation(CREATE_MESSAGE)
  const [message, setMessage] = useState("")

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (route.keyWord === keyWords.chatMessages) {
      createMessage({
        variables: { chat: route.chatId, content: message },
      })
      setMessage("")
    }
  }

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  return (
    <div className={styles.chat_msgWrapper}>
      <div
        className={`${styles.chat__labels} ${
          !searchStr && styles.chat__labels__close
        }`}
      >
        Search messages
      </div>
      <MsgContainer message={message} />
      <div className={styles.create_msg}>
        <button
          className={`${styles.create_msg__btn} ${styles.create_msg__clip_file}`}
        >
          <AiOutlinePaperClip />
        </button>
        <form onSubmit={handleSubmitForm} className={styles.create_msg__form}>
          <input
            className={styles.create_msg__input}
            type='text'
            value={message}
            placeholder='Write a message'
            onChange={handleChangeForm}
          />
          <button className='btn-handler'></button>
        </form>
        <button
          className={`${styles.create_msg__btn} ${styles.create_msg__emoji}`}
        >
          <AiOutlineSmile />
        </button>
      </div>
    </div>
  )
}

export default ChatMessages
