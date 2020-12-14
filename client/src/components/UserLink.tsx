import React from "react"
import { useDispatch } from "react-redux"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import { IUserLink } from "../interfaces"
import { BsPerson } from "react-icons/bs"
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
        <BsPerson className={styles.chat_link__type} />
      </div>
      <div className={styles.chat_link__title_container}>
        <span className={styles.chat_link__title}>{user.username}</span>
      </div>
    </button>
  )
}

export default UserLink
