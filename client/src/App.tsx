import React, { useEffect, useState } from "react"
import Auth from "./components/Auth"
import { SET_AUTH } from "./redux/auth/authTypes"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./components/Navbar"
import Routes from "./components/Routes"
import { useQuery, useSubscription } from "@apollo/client"
import { GET_USER_CHATS } from "./fetching/queries"
import { NEW_MESSAGE } from "./fetching/subscriptions"
import { SET_CHATS } from "./redux/chats/chatsTypes"
import {
  SET_ACTIVE_CHAT,
  ADD_MESSAGE_CHAT,
} from "./redux/chatActive/chatActiveTypes"
import { RootStore } from "./redux/store"
import Chat from "./components/Chat"

const App: React.FC = () => {
  const [initLoad, setInitLoad] = useState(true)
  const {
    chats,
    currentChat: { chatId },
  } = useSelector((state: RootStore) => state)
  const { data } = useQuery(GET_USER_CHATS, { pollInterval: 60000 })
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
    const chatId = localStorage.getItem("activeChat")
    dispatch({ type: SET_ACTIVE_CHAT, payload: chatId })
  }, [dispatch])

  useEffect(() => {
    if (
      newMsgData &&
      newMsgData.newMessage &&
      chatId === newMsgData.newMessage.chat.id
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
