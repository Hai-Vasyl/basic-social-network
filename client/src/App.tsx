import React, { useEffect, useState, useRef } from "react"
import Auth from "./components/Auth"
import { SET_AUTH } from "./redux/auth/authTypes"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./components/Navbar"
import Routes from "./components/Routes"
import { useQuery, useSubscription, useMutation } from "@apollo/client"
import { GET_USER_CHATS } from "./fetching/queries"
import { NEW_MESSAGE, NEW_NOTIFICATION } from "./fetching/subscriptions"
import { SET_MESSAGE_READ } from "./fetching/mutations"
import {
  SET_CHATS,
  IChat,
  CHANGE_CHAT_LAST_MSG,
} from "./redux/chats/chatsTypes"
import {
  SET_ACTIVE_CHAT,
  ADD_MESSAGE_CHAT,
} from "./redux/chatActive/chatActiveTypes"
import { RootStore } from "./redux/store"
import { SET_SEARCH_CHAT } from "./redux/searchChat/searchTypes"
import { SET_SEARCH_MESSAGE } from "./redux/searchMessage/searchTypes"
import {
  SET_CHATS_QUEUE,
  REMOVE_CHAT_QUEUE,
} from "./redux/queueChats/queueTypes"
import Chat from "./components/Chat"
import Notifications from "./components/Notifications"
import { SET_NOTIFICATION } from "./redux/notifications/notifTypes"
import { SET_UNREAD_MESSAGE } from "./redux/unreadMsgs/msgsTypes"
import { CHAT_OPEN, NOTIFICATIONS_TOGGLE } from "./redux/toggle/toggleTypes"
import { IMessageToast } from "./interfaces"
import { RiUserSettingsLine } from "react-icons/ri"
import { BsPeople, BsLock } from "react-icons/bs"
import Toast from "./components/Toast"
// @ts-ignore
import stylesToast from "./styles/toast.module"
import keyWords from "./modules/keyWords"
import { INotification } from "./redux/notifications/notifTypes"
import notifTypes from "./modules/notifTypes"

const App: React.FC = () => {
  const [initLoad, setInitLoad] = useState(true)
  const prevMessage = useRef(null)
  const {
    chats,
    currentChat: { route },
    searchChat: { searchStr },
    auth: { user },
    queueChats: { chats: queueChats },
    toggle: { chat, notifications },
  } = useSelector((state: RootStore) => state)
  const { data, loading: chatsLoading } = useQuery(GET_USER_CHATS, {
    pollInterval: 60000,
  })
  const { data: newMsgData } = useSubscription(NEW_MESSAGE, {
    variables: { channels: chats.map((chat) => chat.channel) },
  })
  const { data: newNotification } = useSubscription(NEW_NOTIFICATION, {
    variables: { channels: [user.id] },
  })
  const [notifToasts, setNotifToasts] = useState<INotification[]>([
    {
      id: "1",
      title: "Access to user",
      description: "Some new messge from some user!",
      date: new Date(),
      type: "access",
      userId: {
        id: "1",
        username: "User_One",
        email: "sdfsdf",
        ava:
          "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
        typeUser: "admin",
      },
      chatId: {
        id: "1",
        title: "Some_chat",
        type: "individual",
        image:
          "https://www.pinclipart.com/picdir/big/559-5594866_necktie-drawing-vector-round-avatar-user-icon-png.png",
      },
    },
  ])
  const [messageToasts, setMessageToasts] = useState<IMessageToast[]>([
    {
      id: "1",
      content: "Some new messge from some user!",
      date: new Date(),
      owner: {
        id: "1",
        username: "User_One",
        ava:
          "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
        typeUser: "admin",
      },
      chat: {
        id: "1",
        title: "Some_chat",
        type: "individual",
        image:
          "https://www.pinclipart.com/picdir/big/559-5594866_necktie-drawing-vector-round-avatar-user-icon-png.png",
      },
    },
    // {
    //   id: "2",
    //   content: "Some new messge from some user!",
    //   date: new Date(),
    //   owner: {
    //     id: "2",
    //     username: "User_One",
    //     ava:
    //       "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
    //     typeUser: "admin",
    //   },
    //   chat: {
    //     id: "2",
    //     title: "Some_chat",
    //     type: "privet",
    //     image:
    //       "https://www.pinclipart.com/picdir/big/559-5594866_necktie-drawing-vector-round-avatar-user-icon-png.png",
    //   },
    // },
  ])
  const [setMessageRead] = useMutation(SET_MESSAGE_READ)
  const dispatch = useDispatch()

  useEffect(() => {
    const newNotifData = newNotification && newNotification.newNotification

    if (newNotifData) {
      if (newNotifData.type === notifTypes.accessDenied.keyWord) {
        dispatch({
          type: REMOVE_CHAT_QUEUE,
          payload: newNotifData.chatId.id,
        })
      }
      setNotifToasts((prev) => [...prev, newNotifData])
      dispatch({ type: SET_NOTIFICATION, payload: newNotifData })
    }
  }, [dispatch, newNotification])

  useEffect(() => {
    let auth = localStorage.getItem("auth") || ""
    if (auth.length) {
      auth = JSON.parse(auth)
      dispatch({ type: SET_AUTH, payload: { auth, init: true } })
    }
    setInitLoad(false)
  }, [dispatch])

  useEffect(() => {
    if (data && data.userChats) {
      dispatch({ type: SET_CHATS, payload: data.userChats })
    }
  }, [dispatch, data])

  useEffect(() => {
    const searchChatStr = localStorage.getItem("searchChat")
    const searchMessageStr = localStorage.getItem("searchMessage")
    dispatch({ type: SET_SEARCH_CHAT, payload: searchChatStr || "" })
    dispatch({ type: SET_SEARCH_MESSAGE, payload: searchMessageStr || "" })
  }, [dispatch])

  useEffect(() => {
    const queueChats = localStorage.getItem("queueChats")
    dispatch({ type: SET_CHATS_QUEUE, payload: JSON.parse(queueChats || "[]") })
  }, [dispatch])

  useEffect(() => {
    if (!chatsLoading) {
      const lsChatActive = localStorage.getItem("activeChat")
      // const existsActiveChat = data.userChats.find(
      //   (chat: IChat) => chat.id === lsChatActive
      // )
      // if (
      //   !!existsActiveChat ||
      //   (!existsActiveChat && lsChatActive?.split("_").length === 2)
      // ) {
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: lsChatActive?.length
          ? JSON.parse(lsChatActive)
          : { chatId: "", keyWord: "" },
      })
      // } else {
      //   dispatch({ type: SET_ACTIVE_CHAT, payload: "" })
      //   localStorage.setItem("activeChat", "")
      // }
    }
  }, [dispatch, chatsLoading])

  useEffect(() => {
    if (!chatsLoading) {
      localStorage.setItem("activeChat", JSON.stringify(route))
    }
  }, [route, chatsLoading])

  useEffect(() => {
    const interval = setInterval(() => {
      if (messageToasts.length) {
        setMessageToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== prevToasts[0].id)
        )
      }
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [messageToasts])

  useEffect(() => {
    const interval = setInterval(() => {
      if (notifToasts.length) {
        setNotifToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== prevToasts[0].id)
        )
      }
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [notifToasts])

  useEffect(() => {
    const newMsg = newMsgData && newMsgData.newMessage

    if (newMsg) {
      if (prevMessage.current === newMsg.id) {
        return
      }
      prevMessage.current = newMsg.id
      if (newMsg.chat.id === route.chatId) {
        dispatch({ type: ADD_MESSAGE_CHAT, payload: newMsgData.newMessage })
      }

      // if (newMsg.owner.id !== user.id) {
      //   if (
      //     (chat &&
      //       newMsg.chat.id === route.chatId &&
      //       keyWords.chatMessages !== route.keyWord) ||
      //     newMsg.chat.id !== route.chatId
      //   ) {
      //     setMessageToasts((prevToasts) => [...prevToasts, newMsg])
      //     dispatch({ type: SET_UNREAD_MESSAGE, payload: newMsg })
      //     setUnreadMessage({ variables: { messageId: newMsg.id } })
      //   } else if (!chat) {
      //     setMessageToasts((prevToasts) => [...prevToasts, newMsg])
      //     dispatch({ type: SET_UNREAD_MESSAGE, payload: newMsg })
      //     setUnreadMessage({ variables: { messageId: newMsg.id } })
      //   }
      // }

      if (chat) {
        if (
          newMsg.chat.id === route.chatId &&
          keyWords.chatMessages === route.keyWord
        ) {
          setMessageRead({
            variables: { messageId: newMsg.id },
          })
        } else {
          setMessageToasts((prevToasts) => [...prevToasts, newMsg])
          dispatch({ type: SET_UNREAD_MESSAGE, payload: newMsg })
        }
      } else {
        setMessageToasts((prevToasts) => [...prevToasts, newMsg])
        dispatch({ type: SET_UNREAD_MESSAGE, payload: newMsg })
      }

      dispatch({
        type: CHANGE_CHAT_LAST_MSG,
        payload: { chatId: newMsg.chat.id, message: newMsg },
      })
    }
  }, [dispatch, newMsgData])

  const handleLinkToChat = (chatId: string, messageId: string) => {
    dispatch({ type: CHAT_OPEN })
    dispatch({
      type: SET_ACTIVE_CHAT,
      payload: { keyWord: keyWords.chatMessages, chatId },
    })
    setMessageToasts(messageToasts.filter((msg) => msg.id !== messageId))
  }

  const handlePopupNotifications = (notifId: string) => {
    if (!notifications) {
      dispatch({ type: NOTIFICATIONS_TOGGLE })
    }
    setNotifToasts(notifToasts.filter((notif) => notif.id !== notifId))
  }

  const handleCloseToast = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    messageId: string
  ) => {
    event.stopPropagation()
    setMessageToasts(messageToasts.filter((msg) => msg.id !== messageId))
  }

  const handleCloseNotifToast = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    notifId: string
  ) => {
    event.stopPropagation()
    setNotifToasts(notifToasts.filter((notif) => notif.id !== notifId))
  }

  // TODO: function
  const newDummyFunction = () => {
    console.log("New dummy f")
  }

  const getIconToastByType = (type: string) => {
    switch (type) {
      case notifTypes.accessDenied.keyWord:
        return notifTypes.accessDenied.icon
      case notifTypes.accessAllowed.keyWord:
        return notifTypes.accessAllowed.icon
      default:
        return notifTypes.access.icon
    }
  }

  if (initLoad) {
    return <div>LOADING ...</div>
  }

  return (
    <div>
      <Navbar />
      <Routes />
      <Auth />
      <Chat />
      <Notifications />
      <div className={`${stylesToast.wrapper} ${stylesToast.wrapper_right}`}>
        {notifToasts.map((toast) => {
          return (
            <Toast
              key={toast.id}
              close={(event) => handleCloseNotifToast(event, toast.id)}
              click={() => handlePopupNotifications(toast.id)}
              isNotification
              Image={getIconToastByType(toast.type)}
              title={toast.title}
              content={toast.description}
              date={toast.date}
            />
          )
        })}
      </div>
      <div className={stylesToast.wrapper}>
        {messageToasts.map((toast) => {
          return (
            <Toast
              key={toast.id}
              close={(event) => handleCloseToast(event, toast.id)}
              click={() => handleLinkToChat(toast.chat.id, toast.id)}
              Icon={
                toast.chat.type === "individual"
                  ? toast.owner.typeUser === "admin"
                    ? RiUserSettingsLine
                    : RiUserSettingsLine
                  : toast.chat.type === "public"
                  ? BsPeople
                  : BsLock
              }
              Image={
                toast.chat.type === "individual"
                  ? toast.owner.ava
                  : toast.chat.image
              }
              title={
                toast.chat.type === "individual"
                  ? toast.owner.username
                  : toast.chat.title
              }
              member={
                toast.chat.type !== "individual" ? toast.owner.username : ""
              }
              content={toast.content}
              date={toast.date}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
