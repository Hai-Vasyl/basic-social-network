import React, { useState, useEffect } from "react"
// @ts-ignore
import styles from "../styles/chat.module"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"
import keyWords from "../modules/keyWords"
import { Link } from "react-router-dom"
import { BsX, BsGear, BsThreeDotsVertical } from "react-icons/bs"
import SearchSimple from "./SearchSimple"
import {
  CLEAR_SEARCH_MESSAGE,
  SET_SEARCH_MESSAGE,
} from "../redux/searchMessage/searchTypes"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import ButtonTab from "./ButtonTab"

interface IToolbarProps {
  Icon?: any
  title?: string
  searchedChatTitle?: string
  routeParams?: {
    keyWord: string
    chatId: string
  }
}

const Toolbar: React.FC<IToolbarProps> = ({
  Icon,
  title,
  searchedChatTitle,
  routeParams,
}) => {
  const {
    currentChat: { route },
    chats,
    auth: { user },
    searchMessage: { searchStr },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const [activeChat, setActiveChat] = useState({
    id: "",
    title: "",
    image: "",
    type: "",
    owner: "",
  })

  useEffect(() => {
    let activeChatData = [...chats].find((chat) => chat.id === route.chatId)

    const ownerActiveChat =
      activeChatData?.owners &&
      activeChatData.owners.find((owner) => owner.id !== user.id)
    const chatIndividual = activeChatData?.type === "individual"

    setActiveChat({
      id: chatIndividual ? ownerActiveChat?.id || "" : activeChatData?.id || "",
      title: chatIndividual
        ? ownerActiveChat?.username || ""
        : activeChatData?.title || "",
      image: chatIndividual
        ? ownerActiveChat?.ava || ""
        : activeChatData?.image || "",
      type: activeChatData?.type || "",
      owner: chatIndividual ? user.id : activeChatData?.owner?.id || "",
    })
  }, [route, chats])

  useEffect(() => {
    localStorage.setItem("searchMessage", searchStr)
  }, [searchStr])

  return (
    <>
      <div className={styles.chat__thumbnail}>
        {route.keyWord === keyWords.chatMessages ? (
          activeChat.type === "individual" ? (
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
          )
        ) : (
          <div className={styles.chat__wrapperImg}>
            <Icon className={styles.chat__image} />
          </div>
        )}
        <div className={styles.chat__title}>
          {route.keyWord === keyWords.chatMessages
            ? activeChat.title
            : `${title} ${
                route.keyWord === keyWords.chatConnect ||
                route.keyWord === keyWords.userConnect
                  ? searchedChatTitle
                  : activeChat.title
              }`}
        </div>
      </div>

      {route.keyWord === keyWords.chatMessages ? (
        <SearchSimple
          searchStr={searchStr}
          IconBtn={user.id === activeChat.owner ? BsGear : BsThreeDotsVertical}
          placeholder='Search message'
          changeForm={(event) =>
            dispatch({ type: SET_SEARCH_MESSAGE, payload: event.target.value })
          }
          clickBtn={() =>
            dispatch({
              type: SET_ACTIVE_CHAT,
              payload: {
                keyWord:
                  user.id === activeChat.owner
                    ? keyWords.chatEdit
                    : keyWords.chatInfo,
                chatId: route.chatId,
              },
            })
          }
          clearForm={() => dispatch({ type: CLEAR_SEARCH_MESSAGE })}
        />
      ) : (
        !!route.keyWord && (
          <ButtonTab
            Icon={BsX}
            click={() =>
              dispatch({
                type: SET_ACTIVE_CHAT,
                payload: routeParams,
              })
            }
          />
        )
      )}

      {/* <div className={styles.chat__toolbar_form}>
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
    </>
  )
}

export default Toolbar
