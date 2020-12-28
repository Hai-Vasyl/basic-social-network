import React, { useEffect } from "react"
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
import { GET_CHAT_USERS } from "../fetching/queries"
import { useQuery } from "@apollo/client"
import Loader from "./Loader"
import UserLinks from "./UserLinks"
import ChatInfoBasic from "./ChatInfoBasic"

export interface IChatInfoProps {
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
  const { data: chatUsers, loading: loadChatUsers } = useQuery(GET_CHAT_USERS, {
    variables: { chatId: info.id },
  })

  useEffect(() => {
    const addAccessData = addAData.data && addAData.data.addUserAccess
    const rmAccessData = removeAData.data && removeAData.data.removeUserAccess
    if (addAccessData) {
      dispatch({ type: SET_CHATS, payload: addAccessData })

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
      <ChatInfoBasic
        info={info}
        handleConnect={handleConnect}
        isNotified={!!isNotified}
      />

      {loadChatUsers ? (
        <Loader />
      ) : (
        <UserLinks members={chatUsers.getChatUsers} owner={info.owner} />
      )}
    </>
  )
}

export default ChatInfo
