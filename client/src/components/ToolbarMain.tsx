import React, { useEffect, useState } from "react"
// @ts-ignore
import styles from "../styles/chat.module"
import { Link } from "react-router-dom"
import keyWords from "../modules/keyWords"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import Toolbar from "./Toolbar"
import {
  BsLightning,
  BsLink45Deg,
  BsChatDots,
  BsPencilSquare,
  BsInfo,
  BsChatSquareDots,
} from "react-icons/bs"

interface IToolbarMainProps {
  searchActiveChat: {
    title: string
  }
}

const ToolbarMain: React.FC<IToolbarMainProps> = ({ searchActiveChat }) => {
  const {
    currentChat: { route },
    chats,
    auth: { user },
  } = useSelector((state: RootStore) => state)

  const setToolbar = () => {
    switch (route.keyWord) {
      case keyWords.chatConnect:
        return (
          <Toolbar
            routeParams={{ chatId: "", keyWord: "" }}
            Icon={BsLightning}
            title='Connect to'
            searchedChatTitle={searchActiveChat.title}
          />
        )
      case keyWords.userConnect:
        return (
          <Toolbar
            routeParams={{ chatId: "", keyWord: "" }}
            Icon={BsLink45Deg}
            title='Subscribe to'
            searchedChatTitle={searchActiveChat.title}
          />
        )
      case keyWords.chatCreateNew:
        return (
          <Toolbar
            Icon={BsChatDots}
            title='Create new chat'
            routeParams={{ chatId: "", keyWord: "" }}
          />
        )
      case keyWords.chatEdit:
        return (
          <Toolbar
            Icon={BsPencilSquare}
            title='Edit information of'
            routeParams={{
              chatId: route.chatId,
              keyWord: keyWords.chatMessages,
            }}
          />
        )
      case keyWords.chatInfo:
        return (
          <Toolbar
            Icon={BsInfo}
            title='Information of'
            routeParams={{
              chatId: route.chatId,
              keyWord: keyWords.chatMessages,
            }}
          />
        )
      case keyWords.chatMessages:
        return <Toolbar />
      default:
        return <Toolbar Icon={BsChatSquareDots} title='Choose chat' />
    }
  }

  return (
    <div className={styles.chat__toolbar}>
      {setToolbar()}
      {/* <div className={styles.chat__thumbnail}>
            {route.keyWord === "chat-messages" &&
              (activeChat.type === "individual" ? (
                <Link
                  className={styles.chat__wrapperImg}
                  to={`/profile/${activeChat.id}`}
                >
                  <img
                    className={styles.chat__image}
                    src={activeChat.image}
                    alt='imgThumbnail'
                  />
                </Link>
              ) : (
                <div className={styles.chat__wrapperImg}>
                  <img
                    className={styles.chat__image}
                    src={activeChat.image}
                    alt='imgThumbnail'
                  />
                </div>
              ))}
            <div className={styles.chat__title}>{activeChat.title}</div>
          </div>
          <div className={styles.chat__toolbar_form}>
            {route.keyWord === "chat-messages" && (
              <form className={styles.chat__searchbar}>
                <input
                  type='text'
                  className={styles.chat__search}
                  // value={searchedText}
                  // onChange={handleChangeSearch}
                  placeholder='Search message'
                />
                <button className={styles.chat__btn_search}>
                  <BsSearch />
                </button>
              </form>
            )}
            <button
              className={`${styles.chat__btn_add} ${styles.chat__btn_info}`}
            >
              {user.id === activeChat.owner ? (
                <BsGear />
              ) : (
                <BsThreeDotsVertical />
              )}
            </button>
          </div> */}
    </div>
  )
}

export default ToolbarMain
