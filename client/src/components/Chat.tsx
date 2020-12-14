import React, { useState, useEffect } from "react"
import { RootStore } from "../redux/store"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlinePaperClip, AiOutlineSmile } from "react-icons/ai"
import { BsPlus, BsSearch, BsGear, BsThreeDotsVertical } from "react-icons/bs"
import { CREATE_MESSAGE } from "../fetching/mutations"
import { SEARCH_CHATS } from "../fetching/queries"
import { useMutation, useQuery } from "@apollo/client"
import MsgContainer from "./MsgContainer"
import { IChatOwner, IUserLink } from "../interfaces"
import { IChat } from "../redux/chats/chatsTypes"
import ChatLink from "./ChatLink"
import UserLink from "./UserLink"
import ChatConnect from "../screens/ChatUserConnect"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import { Link } from "react-router-dom"
// @ts-ignore
import styles from "../styles/chat.module"
import ChatRoutes from "../components/ChatRoutes"
import { SET_SEARCH_CHAT } from "../redux/searchChat/searchTypes"

// users {
//   id
//   username
//   email
//   ava
// }
// chats {
//   id
//   title
//   image
//   type
//   owner {
//     id
//   }
// }

const Chat: React.FC = () => {
  const {
    auth: { user },
    chats,
    currentChat: { route },
    searchChat: { searchStr },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  // const [searchedText, setSearchedText] = useState("")
  const [createMessage, { data, error, loading }] = useMutation(CREATE_MESSAGE)
  const {
    data: searchData,
    error: searchError,
    loading: searchLoad,
  } = useQuery(SEARCH_CHATS, { variables: { searchStr } })
  const [activeChat, setActiveChat] = useState({
    id: "",
    title: "",
    image: "",
    type: "",
    owner: "",
  })

  useEffect(() => {
    localStorage.setItem("searchChat", searchStr)
  }, [searchStr])

  useEffect(() => {
    let activeChatData = [...chats].find((chat) => chat.id === route.chatId)
    if (!activeChatData) {
      return
    }
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

  const getOwnerChat = (owners: IChatOwner[]) => {
    const chatOwner = owners.find((owner) => owner.id !== user.id)
    return chatOwner
  }

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  // const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchedText(event.target.value)
  // }

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (route.keyWord === "chat-messages") {
      createMessage({
        variables: { chat: route.chatId, content: message },
      })
      setMessage("")
    }
  }

  // const activeChatPinned = chatId && chatId.split("_").length !== 2
  // console.log("DATA searched chats: ", searchData)
  // console.log("Active chat: ", activeChat)
  return (
    <div className={styles.chat}>
      <div className={styles.chat__sidebar}>
        <div className={styles.chat__toolbar}>
          <button className={styles.chat__btn_add}>
            <BsPlus />
          </button>
          <form className={styles.chat__searchbar}>
            <input
              type='text'
              className={styles.chat__search}
              value={searchStr}
              onChange={(event) =>
                dispatch({ type: SET_SEARCH_CHAT, payload: event.target.value })
              }
              placeholder='Search chat / user'
            />
            <button className={styles.chat__btn_search}>
              <BsSearch />
            </button>
          </form>
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
                      keyWord='chat-connect'
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
                      keyWord='user-connect'
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
                  keyWord='chat-messages'
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
        <div className={styles.chat__toolbar}>
          <div className={styles.chat__thumbnail}>
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
          </div>
        </div>

        <div className={styles.chat_controller}>
          <ChatRoutes />
        </div>
      </div>
    </div>
  )
}

export default Chat
