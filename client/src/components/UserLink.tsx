import React from "react"
import { useDispatch } from "react-redux"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import { IUserLink } from "../interfaces"
// @ts-ignore
import styles from "../styles/chat.module"

interface IUserLinkProps {
  user: IUserLink
  userId: string
  keyWord: string
}

const UserLink: React.FC<IUserLinkProps> = ({ user, userId, keyWord }) => {
  const dispatch = useDispatch()

  return (
    <button
      className={`${styles.chat_link} ${
        userId === user.id && styles.chat_link__active
      }`}
      key={user.id}
      onClick={() =>
        dispatch({
          type: SET_ACTIVE_CHAT,
          payload: { chatId: user.id, keyWord },
        })
      }
    >
      <div className={styles.chat_link__img_container}>
        <img className={styles.chat_link__img} src={user.ava} alt='chatImage' />
      </div>
      <div className={styles.chat_link__info}>
        <div className={styles.chat_link__title_container}>
          <div className={styles.chat_link__title_content}>
            <span className={styles.chat_link__title}>{user.username}</span>
            <span className={styles.chat_link__last_msg}>{user.email}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default UserLink
