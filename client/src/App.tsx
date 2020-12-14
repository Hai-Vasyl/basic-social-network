import React, { useEffect, useState } from "react"
import Auth from "./components/Auth"
import { SET_AUTH } from "./redux/auth/authTypes"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./components/Navbar"
import Routes from "./components/Routes"
import { useQuery, useSubscription } from "@apollo/client"
import { GET_USER_CHATS } from "./fetching/queries"
import { NEW_MESSAGE } from "./fetching/subscriptions"
import { SET_CHATS, IChat } from "./redux/chats/chatsTypes"
import {
  SET_ACTIVE_CHAT,
  ADD_MESSAGE_CHAT,
} from "./redux/chatActive/chatActiveTypes"
import { RootStore } from "./redux/store"
import { SET_SEARCH_CHAT } from "./redux/searchChat/searchTypes"
import Chat from "./components/Chat"

const App: React.FC = () => {
  const [initLoad, setInitLoad] = useState(true)
  const {
    chats,
    currentChat: { route },
    searchChat: { searchStr },
  } = useSelector((state: RootStore) => state)
  const { data, loading: chatsLoading } = useQuery(GET_USER_CHATS, {
    pollInterval: 60000,
  })
  const { data: newMsgData, loading, error } = useSubscription(NEW_MESSAGE, {
    variables: { channels: chats.map((chat) => chat.channel) },
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
    const searchChatStrt = localStorage.getItem("searchChat")
    dispatch({ type: SET_SEARCH_CHAT, payload: searchChatStrt || "" })
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
