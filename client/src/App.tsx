import React, { useEffect } from "react"
import Auth from "./components/Auth"
import { SET_AUTH } from "./redux/auth/authTypes"
import { RootStore } from "./redux/store"
import { useSelector, useDispatch } from "react-redux"
import Navbar from "./components/Navbar"
import Routes from "./components/Routes"

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let auth = localStorage.getItem("auth") || ""
    if (auth.length) {
      auth = JSON.parse(auth)
      dispatch({ type: SET_AUTH, payload: { auth, init: true } })
    }
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <Routes />
      <Auth />
    </div>
  )
}

export default App
