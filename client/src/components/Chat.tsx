import React, { useState, useEffect } from "react"
import { RootStore } from "../redux/store"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlinePaperClip, AiOutlineSmile } from "react-icons/ai"
import { BsPlus, BsSearch, BsGear, BsThreeDotsVertical } from "react-icons/bs"
import { SEARCH_CHATS } from "../fetching/queries"
import { useMutation, useQuery } from "@apollo/client"
import MsgContainer from "./MsgContainer"
import { IChatOwner, IUserLink, IUserSearch, IChatSearch } from "../interfaces"
import { IChat } from "../redux/chats/chatsTypes"
import ChatLink from "./ChatLink"
import UserLink from "./UserLink"
import ChatConnect from "../screens/ChatUserConnect"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import { Link } from "react-router-dom"
// @ts-ignore
import styles from "../styles/chat.module"
import ChatRoutes from "../components/ChatRoutes"
import {
  SET_SEARCH_CHAT,
  CLEAR_SEARCH_CHAT,
} from "../redux/searchChat/searchTypes"
import keyWords from "../modules/keyWords"
import ToolbarMain from "./ToolbarMain"
import SearchSimple from "./SearchSimple"

const Chat: React.FC = () => {
  const {
    auth: { user },
    chats,
    currentChat: { route },
    searchChat: { searchStr },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const {
    data: searchData,
    error: searchError,
    loading: searchLoad,
  } = useQuery(SEARCH_CHATS, { variables: { searchStr } })
  const [searchActiveChat, setSearchActiveChat] = useState({
    title: "",
  })

  useEffect(() => {
    const userSearched =
      searchData &&
      searchData.searchChats.users.find(
        (user: IUserSearch) => user.id === route.chatId
      )
    const chatSearched =
      searchData &&
      searchData.searchChats.chats.find(
        (chat: IChatSearch) => chat.id === route.chatId
      )
    if (!!userSearched) {
      setSearchActiveChat((prev) => ({ ...prev, title: userSearched.username }))
    } else if (!!chatSearched) {
      setSearchActiveChat((prev) => ({ ...prev, title: chatSearched.title }))
    } else {
      setSearchActiveChat((prev) => ({ ...prev, title: "" }))
    }
  }, [route, searchData])

  useEffect(() => {
    localStorage.setItem("searchChat", searchStr)
  }, [searchStr])

  const getOwnerChat = (owners: IChatOwner[]) => {
    const chatOwner = owners.find((owner) => owner.id !== user.id)
    return chatOwner
  }

  return (
    <div className={styles.chat}>
      <div className={styles.chat__sidebar}>
        <div className={styles.chat__toolbar}>
          <SearchSimple
            searchStr={searchStr}
            IconBtn={BsPlus}
            placeholder='Search chat / user'
            changeForm={(event) =>
              dispatch({ type: SET_SEARCH_CHAT, payload: event.target.value })
            }
            clickBtn={() =>
              dispatch({
                type: SET_ACTIVE_CHAT,
                payload: {
                  keyWord: keyWords.chatCreateNew,
                  chatId: route.chatId,
                },
              })
            }
            clearForm={() => dispatch({ type: CLEAR_SEARCH_CHAT })}
          />
        </div>
        <div className={styles.chat__stacks}>
          <div className={styles.chat__searched_stack}>
            <div
              className={`${styles.chat__labels} ${
                !searchStr &&
                !(
                  searchData &&
                  (searchData.searchChats.chats.length ||
                    searchData.searchChats.users.length)
                ) &&
                styles.chat__labels__close
              }`}
            >
              Search results
            </div>
            <div
              className={`${styles.chat__empty_plug} ${
                searchStr &&
                !(
                  searchData &&
                  (searchData.searchChats.chats.length ||
                    searchData.searchChats.users.length)
                ) &&
                styles.chat__empty_plug__active
              }`}
            >
              Nothing found
            </div>
            <div>
              {searchData &&
                searchData.searchChats.chats.map((chat: IChat) => {
                  return (
                    <ChatLink
                      keyWord={keyWords.chatConnect}
                      key={chat.id}
                      chatOwner={undefined}
                      chat={chat}
                      chatId={route.chatId}
                      chatIndividual={false}
                    />
                  )
                })}
            </div>
            <div>
              {searchData &&
                searchData.searchChats.users.map((user: IUserLink) => {
                  return (
                    <UserLink
                      keyWord={keyWords.userConnect}
                      key={user.id}
                      user={user}
                      userId={route.chatId}
                    />
                  )
                })}
            </div>
          </div>
          <div className={styles.chat__chats_stack}>
            <div className={styles.chat__labels}>Your chats</div>
            {chats.map((chat) => {
              const chatIndividual = chat.type === "individual"
              const chatOwner: IChatOwner | undefined = getOwnerChat(
                chat.owners || []
              )
              return (
                <ChatLink
                  keyWord={keyWords.chatMessages}
                  key={chat.id}
                  chatOwner={chatOwner}
                  chat={chat}
                  chatId={route.chatId}
                  chatIndividual={chatIndividual}
                  isAuthOwner={
                    chatIndividual ? true : chat.owner?.id === user.id
                  }
                />
              )
            })}
          </div>
        </div>
      </div>

      <div className={styles.chat__main}>
        <ToolbarMain searchActiveChat={searchActiveChat} />
        {/* 
        <div className={styles.chat__toolbar}>
          <div className={styles.chat__thumbnail}>
            {route.keyWord === keyWords.chatMessages &&
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
            {route.keyWord === keyWords.chatMessages && (
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
          </div>
        </div> */}

        <div className={styles.chat_controller}>
          <ChatRoutes />
        </div>
      </div>
    </div>
  )
}

export default Chat
