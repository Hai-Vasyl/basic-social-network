import React from "react"
import { useSelector } from "react-redux"
import MsgContainer from "../components/MsgContainer"
import { AiOutlinePaperClip, AiOutlineSmile } from "react-icons/ai"
// @ts-ignore
import styles from "../styles/chat.module"

const ChatMessages: React.FC = () => {
  return (
    <div className={styles.chat_msgWrapper}>
      <MsgContainer />
      <div className={styles.create_msg}>
        <button
          className={`${styles.create_msg__btn} ${styles.create_msg__clip_file}`}
        >
          <AiOutlinePaperClip />
        </button>
        <form
          // onSubmit={handleSubmitForm}
          className={styles.create_msg__form}
        >
          <input
            className={styles.create_msg__input}
            type='text'
            // value={message}
            placeholder='Write a message'
            // onChange={handleChangeForm}
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
