import React, { useEffect, useRef } from "react"
import { RootStore } from "../redux/store"
import { useSelector, useDispatch } from "react-redux"
import { GET_CHAT_MESSAGES } from "../fetching/queries"
import { SET_MESSAGES_CHAT } from "../redux/chatActive/chatActiveTypes"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import moment from "moment"

const MsgContainer: React.FC = () => {
  const anchorMsg = useRef<HTMLDivElement>(null)
  const {
    auth: { user },
    currentChat: { chatId, messages },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const { data, error, loading } = useQuery(GET_CHAT_MESSAGES, {
    variables: { chat: chatId },
    fetchPolicy: "cache-and-network",
  })

  useEffect(() => {
    if (data && data.chatMessages) {
      dispatch({ type: SET_MESSAGES_CHAT, payload: data.chatMessages })
    }
  }, [dispatch, data])

  useEffect(() => {
    anchorMsg.current?.scrollIntoView({ behavior: "smooth" })
  })

  return (
    <div className='msg-container'>
      {messages.map((msg) => {
        const date = new Date(Number(msg.date)).toString()
        const dateRender = `${moment(date).calendar()} (${moment(date)
          .startOf("hour")
          .fromNow()})`
        return (
          <div
            key={msg.id}
            className={`message ${
              user.id === msg.owner.id && "message__mine"
            }`}>
            <div className='message__user'>
              <Link
                className='message__user-link'
                to={`/profile/${msg.owner.id}`}>
                <img
                  src={msg.owner.ava}
                  className='message__ava'
                  alt='userAva'
                />
              </Link>
            </div>
            <div className='message__unit'>
              <span className='message__triange'></span>
              <div className='message__container-username'>
                <Link
                  to={`/profile/${msg.owner.id}`}
                  className='message__username'>
                  {msg.owner.username}
                </Link>
              </div>
              <div className='message__container-content'>
                <span className='message__content'>{msg.content}</span>
                <span className='message__date'>{dateRender}</span>
              </div>
            </div>
          </div>
        )
      })}
      <div className='msg-anchor' ref={anchorMsg}></div>
    </div>
  )
}

export default MsgContainer
