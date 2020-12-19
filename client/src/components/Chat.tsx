import React, { useState, useEffect } from "react"
import { RootStore } from "../redux/store"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlinePaperClip, AiOutlineSmile } from "react-icons/ai"
import {
  BsPlus,
  BsSearch,
  BsGear,
  BsThreeDotsVertical,
  BsChatSquare,
} from "react-icons/bs"
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
import { REMOVE_CHAT_QUEUE } from "../redux/queueChats/queueTypes"

const Chat: React.FC = () => {
  const {
    auth: { user },
    chats,
    currentChat: { route },
    searchChat: { searchStr },
    queueChats: { chats: queueChats },
    toggle: { chat },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const {
    data: searchData,
    error: searchError,
    loading: searchLoad,
    refetch: refetchSearchChats,
  } = useQuery(SEARCH_CHATS, { variables: { searchStr } })

  useEffect(() => {
    if (
      route.keyWord === keyWords.chatMessages ||
      route.keyWord === keyWords.userConnect ||
      route.keyWord === keyWords.chatConnect
    ) {
      refetchSearchChats()
    }
  }, [route])

  useEffect(() => {
    refetchSearchChats()
  }, [chats])

  useEffect(() => {
    chats.forEach((chat) => {
      queueChats.forEach((chatId) => {
        if (chat.id === chatId) {
          dispatch({ type: REMOVE_CHAT_QUEUE, payload: chatId })
        }
      })
    })
  }, [chats, dispatch, queueChats])

  useEffect(() => {
    localStorage.setItem("searchChat", searchStr)
  }, [searchStr])

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    dispatch({ type: SET_SEARCH_CHAT, payload: value })
  }

  const getOwnerChat = (owners: IChatOwner[]) => {
    const chatOwner = owners.find((owner) => owner.id !== user.id)
    return chatOwner
  }

  return (
    <div className={`${styles.chat} ${chat && styles.chat__open}`}>
      <div className={styles.chat__sidebar}>
        <div className={styles.chat__toolbar}>
          <SearchSimple
            searchStr={searchStr}
            IconBtn={BsPlus}
            placeholder='Search chat / user'
            changeForm={handleChangeSearch}
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
          <div
            className={`${styles.chat__searched_stack} ${
              !searchStr.length && styles.chat__searched_stack__close
            }`}
          >
            <div
              className={`${styles.chat__labels} ${
                !searchStr && styles.chat__labels__close
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
        <ToolbarMain />

        <div className={styles.chat_controller}>
          <ChatRoutes />
        </div>
      </div>
    </div>
  )
}

export default Chat
