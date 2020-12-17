import React, { useEffect, useState } from "react"
import Auth from "./components/Auth"
import { SET_AUTH } from "./redux/auth/authTypes"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./components/Navbar"
import Routes from "./components/Routes"
import { useQuery, useSubscription } from "@apollo/client"
import { GET_USER_CHATS } from "./fetching/queries"
import { NEW_MESSAGE, NEW_NOTIFICATION } from "./fetching/subscriptions"
import { SET_CHATS, IChat } from "./redux/chats/chatsTypes"
import {
  SET_ACTIVE_CHAT,
  ADD_MESSAGE_CHAT,
} from "./redux/chatActive/chatActiveTypes"
import { RootStore } from "./redux/store"
import { SET_SEARCH_CHAT } from "./redux/searchChat/searchTypes"
import { SET_SEARCH_MESSAGE } from "./redux/searchMessage/searchTypes"
import { SET_CHATS_QUEUE } from "./redux/queueChats/queueTypes"
import Chat from "./components/Chat"

const App: React.FC = () => {
  const [initLoad, setInitLoad] = useState(true)
  const {
    chats,
    currentChat: { route },
    searchChat: { searchStr },
    auth: { user },
    queueChats: { chats: queueChats },
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
  const dispatch = useDispatch()

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
    if (
      newMsgData &&
      newMsgData.newMessage &&
      route.chatId === newMsgData.newMessage.chat.id
    ) {
      dispatch({ type: ADD_MESSAGE_CHAT, payload: newMsgData.newMessage })
    }
  }, [dispatch, newMsgData])

  console.log("NEW_NOTIFICATION: ", newNotification)
  if (initLoad) {
    return <div>LOADING ...</div>
  }

  return (
    <div>
      <Navbar />
      <Routes />
      <Auth />
      <Chat />
    </div>
  )
}

export default App
