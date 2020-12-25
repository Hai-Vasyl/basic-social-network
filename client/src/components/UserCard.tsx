import React from "react"
// @ts-ignore
import styles from "../styles/card.module"
import { useHistory } from "react-router-dom"
import { RiUserSettingsLine } from "react-icons/ri"
import { IOwner } from "../interfaces"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"
import { CHAT_OPEN } from "../redux/toggle/toggleTypes"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import keyWords from "../modules/keyWords"

interface IUserCardProps {
  isEnvChat: boolean
  isLink: boolean
  user: IOwner
  lighter?: boolean
}

const UserCard: React.FC<IUserCardProps> = ({
  user,
  isEnvChat,
  isLink,
  lighter,
}) => {
  const { chats } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  let isPinned = false
  let chatId: string

  chats.forEach((chat) => {
    if (chat.owners && chat.owners.find((owner) => owner.id === user.id)) {
      isPinned = true
      chatId = chat.id
    }
  })

  const handleLink = () => {
    if (isLink) {
      history.push(`/profile/${user.id}`)
    } else {
      if (!isEnvChat) {
        dispatch({ type: CHAT_OPEN })
      }
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: {
          keyWord: isPinned ? keyWords.chatMessages : keyWords.userConnect,
          chatId: isPinned ? chatId : user.id,
        },
      })
    }
  }

  return (
    <div className={`${styles.card} ${lighter && styles.card_light}`}>
      <button onClick={handleLink} className={styles.card__link}>
        <img src={user.ava} alt='userImage' className={styles.card__image} />
        {user.typeUser === "admin" && (
          <div className={styles.card__icon}>
            <RiUserSettingsLine />
          </div>
        )}
      </button>
      <div className={styles.card__about}>
        <button onClick={handleLink} className={styles.card__title}>
          {user.username}
        </button>
        <p className={styles.card__subtitle}>{user.email}</p>
      </div>
    </div>
  )
}

export default UserCard
