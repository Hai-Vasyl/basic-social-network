import React, { useEffect, useState } from "react"
import Auth from "./components/Auth"
import { SET_AUTH } from "./redux/auth/authTypes"
import { useDispatch } from "react-redux"
import Navbar from "./components/Navbar"
import Routes from "./components/Routes"
import { useQuery } from "@apollo/client"
import { GET_USER_CHATS } from "./fetching/queries"
import { SET_CHATS } from "./redux/chats/chatsTypes"
import { SET_ACTIVE_CHAT } from "./redux/chatActive/chatActiveTypes"
import Chat from "./components/Chat"

const App: React.FC = () => {
  const [initLoad, setInitLoad] = useState(true)
  const { data } = useQuery(GET_USER_CHATS, { pollInterval: 60000 })
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
    //TODO: add here subscriptions
  }, [dispatch, data])

  useEffect(() => {
    const chatId = localStorage.getItem("activeChat")
    dispatch({ type: SET_ACTIVE_CHAT, payload: chatId })
  }, [dispatch])

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
