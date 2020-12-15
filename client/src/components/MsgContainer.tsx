import React, { useEffect, useRef } from "react"
import { RootStore } from "../redux/store"
import { useSelector, useDispatch } from "react-redux"
import { GET_CHAT_MESSAGES } from "../fetching/queries"
import { SET_MESSAGES_CHAT } from "../redux/chatActive/chatActiveTypes"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import moment from "moment"
// @ts-ignore
import styles from "../styles/chat.module"
import { IchatMessage } from "../redux/chatActive/chatActiveTypes"
import { BsChat } from "react-icons/bs"

const MsgContainer: React.FC = () => {
  const anchorMsg = useRef<HTMLDivElement>(null)
  const {
    auth: { user },
    currentChat: { route, messages },
    searchMessage: { messages: searchedMessages, searchStr },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const { data, error, loading } = useQuery(GET_CHAT_MESSAGES, {
    variables: { chat: route.chatId },
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

  const reduceMapMessages = (messages: IchatMessage[]) => {
    return messages.map((msg) => {
      const date = new Date(Number(msg.date))
      const dateRender = `${moment(date).calendar()} (${moment(
        date
      ).fromNow()})`
      return (
        <div
          key={msg.id}
          className={`${styles.message} ${
            user.id === msg.owner.id && styles.message__mine
          }`}
        >
          <div className={styles.message__user}>
            <Link
              className={styles.message__user_link}
              to={`/profile/${msg.owner.id}`}
            >
              <img
                src={msg.owner.ava}
                className={styles.message__ava}
                alt='userAva'
              />
            </Link>
          </div>
          <div className={styles.message__unit}>
            <span className={styles.message__triange}></span>
            <div className={styles.message__container_username}>
              <Link
                to={`/profile/${msg.owner.id}`}
                className={styles.message__username}
              >
                {msg.owner.username}
              </Link>
            </div>
            <div className={styles.message__container_content}>
              <span className={styles.message__content}>{msg.content}</span>
              <span className={styles.message__date}>{dateRender}</span>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className={styles.msg_container}>
      {(searchStr.length && searchedMessages.length) ||
      (!searchStr.length && messages.length) ? (
        reduceMapMessages(searchStr.length ? searchedMessages : messages)
      ) : (
        <div className={styles.msg_plug}>
          <BsChat className={styles.msg_plug__icon} />
          <div className={styles.msg_plug__title}>No messages</div>
        </div>
      )}
      <div className={styles.msg_anchor} ref={anchorMsg}></div>
    </div>
  )
}

export default MsgContainer
