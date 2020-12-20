import React, { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
// @ts-ignore
import styles from "../styles/chatinfo.module"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import { RiUserSettingsLine } from "react-icons/ri"
import {
  BsPersonPlus,
  BsPerson,
  BsLock,
  BsPeople,
  BsPlusSquare,
  BsSlashSquare,
  BsBell,
} from "react-icons/bs"
import Button from "./Button"
import { convertDate } from "../helpers/convertDate"
import { useMutation } from "@apollo/client"
import {
  ADD_USER_ACCESS,
  REMOVE_USER_ACCESS,
  CREATE_NOTIFICATION,
} from "../fetching/mutations"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"
import { SET_CHATS } from "../redux/chats/chatsTypes"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import keyWords from "../modules/keyWords"
import { SET_CHAT_QUEUE } from "../redux/queueChats/queueTypes"
import { IOwner } from "../interfaces"
import UserCard from "./UserCard"

interface IChatInfoProps {
  date: string
  description: string
  id: string
  image: string
  title: string
  type: string
  owner: IOwner
  isConnect?: boolean
}

const ChatInfo: React.FC<IChatInfoProps> = (info) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    currentChat: { route },
    auth: { user },
    queueChats: { chats: queueChats },
  } = useSelector((state: RootStore) => state)
  const [addAccess, addAData] = useMutation(ADD_USER_ACCESS)
  const [removeAccess, removeAData] = useMutation(REMOVE_USER_ACCESS)
  const [createNotification, notificationData] = useMutation(
    CREATE_NOTIFICATION
  )

  useEffect(() => {
    const addAccessData = addAData.data && addAData.data.addUserAccess
    const rmAccessData = removeAData.data && removeAData.data.removeUserAccess
    if (addAccessData) {
      dispatch({ type: SET_CHATS, payload: addAccessData })

      // let activeChatId
      // addAccessData.forEach((chat: IChat) => {
      //   if (chat.type === "individual") {
      //     const ownerChat =
      //       chat.owners && chat.owners.find((owner) => owner.id === info.id)
      //     if (!!ownerChat) {
      //       activeChatId = chat.id
      //     }
      //   }
      // })

      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: { keyWord: keyWords.chatMessages, chatId: info.id },
      })
    } else if (rmAccessData) {
      dispatch({ type: SET_CHATS, payload: rmAccessData })
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: { keyWord: keyWords.chatConnect, chatId: info.id },
      })
    }
  }, [dispatch, addAData.data, removeAData.data])

  useEffect(() => {
    localStorage.setItem("queueChats", JSON.stringify(queueChats))
  }, [queueChats])

  useEffect(() => {
    const notifData =
      notificationData.data && notificationData.data.createNotification
    if (notifData) {
      dispatch({ type: SET_CHAT_QUEUE, payload: notifData.chatId.id })
    }
  }, [dispatch, notificationData.data])

  const handleConnect = () => {
    if (info.isConnect) {
      if (info.type === "privet") {
        createNotification({
          variables: {
            title: `Access request for user ${user.username}`,
            description: `Access user ${user.username} to private chat ${info.title}.`,
            type: "access",
            chatId: info.id,
            userId: user.id,
            channel: info.owner.id,
          },
        })
      } else {
        addAccess({ variables: { chatId: info.id, userId: user.id } })
      }
    } else {
      removeAccess({ variables: { chatId: info.id, userId: user.id } })
    }
  }

  const isNotified =
    queueChats.length && queueChats.find((chatId) => chatId === info.id)

  return (
    <>
      <div className={styles.info}>
        <div className={styles.info__preview}>
          <div className={styles.info__link}>
            <img
              className={styles.info__image}
              src={info.image}
              alt='chatImage'
            />
            {info.type == "privet" ? (
              <div className={styles.info__icon}>
                <BsLock />
              </div>
            ) : (
              <div className={styles.info__icon}>
                <BsPeople />
              </div>
            )}
          </div>
          <div className={styles.info__btn}>
            {isNotified && info.type === "privet" ? (
              <div className={styles.info__warning}>
                Wait until the chat owner allows you to access
              </div>
            ) : (
              <Button
                title={
                  info.isConnect
                    ? info.type === "privet"
                      ? "Notify owner"
                      : "Connect"
                    : "Disconnect"
                }
                Icon={
                  info.isConnect
                    ? info.type === "privet"
                      ? BsBell
                      : BsPlusSquare
                    : BsSlashSquare
                }
                exClass={`${stylesBtn.btn_activated}`}
                click={handleConnect}
              />
            )}
          </div>
        </div>
        <div className={styles.info__about}>
          <div className={styles.info__main}>
            <div className={styles.info__title}>{info.title}</div>
            <p className={styles.info__subtitle}>
              Access:
              <span className={styles.info__subtitle_text}>{info.type}</span>
            </p>
          </div>

          <div className={styles.info__extended}>
            <div
              className={`${styles.info__field} ${styles.info__field_section}`}
            >
              Description:
              <span className={styles.info__text}>
                {info.description ? (
                  info.description
                ) : (
                  <span className={styles.info__plug}>empty</span>
                )}
              </span>
            </div>
            <div className={`${styles.info__field} ${styles.info__field_date}`}>
              Last updated:
              <span className={styles.info__text}>
                {convertDate(info.date)}
              </span>
            </div>
          </div>

          <UserCard user={info.owner} isEnvChat isLink={false} />
        </div>
      </div>

      {/* <div className={styles.info__btns}>
        <Button
          Icon={BsPersonPlus}
          title='Follow'
          exClass={stylesBtn.btn_primary}
          click={() => {}}
        />
        <Button
          Icon={BsPerson}
          title='Profile'
          exClass={stylesBtn.btn_simple}
          click={() => history.push(`/profile/${info.id}`)}
        />
        <Button
          Icon={BsDashCircle}
          title='Unsubscribe'
          exClass={`${stylesBtn.btn_activated} ${styles.info__btn_unsubscribe}`}
          click={() => {}}
        />
      </div> */}
    </>
  )
}

export default ChatInfo
