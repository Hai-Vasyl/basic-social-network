import React, { useState, useEffect } from "react"
import { RootStore } from "../redux/store"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlinePaperClip, AiOutlineSmile } from "react-icons/ai"
import { BsPlus, BsSearch, BsLock, BsPeople, BsPerson } from "react-icons/bs"
import { CREATE_MESSAGE } from "../fetching/mutations"
import { SEARCH_CHATS } from "../fetching/queries"
import { useMutation, useQuery } from "@apollo/client"
import MsgContainer from "./MsgContainer"
import { IChatOwner, IUserLink } from "../interfaces"
import { IChat } from "../redux/chats/chatsTypes"
import ChatLink from "./ChatLink"
import UserLink from "./UserLink"
import ChatConnect from "./ChatConnect"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
// @ts-ignore
import styles from "../styles/chat.module"

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
    currentChat: { chatId },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const [searchedText, setSearchedText] = useState("")
  const [createMessage, { data, error, loading }] = useMutation(CREATE_MESSAGE)
  const {
    data: searchData,
    error: searchError,
    loading: searchLoad,
  } = useQuery(SEARCH_CHATS, { variables: { searchStr: searchedText } })
  const [activeChat, setActiveChat] = useState({
    id: "",
    title: "",
    image: "",
    type: "",
  })

  useEffect(() => {
    if (!chatId) {
      return
    }
    let activeChatData = [...chats].find((chat) => chat.id === chatId)

    const ownerActiveChat =
      activeChatData?.owners &&
      activeChatData.owners.find((owner) => owner.id !== user.id)
    const chatIndividual = activeChatData?.type === "individual"
    setActiveChat({
      id: activeChatData?.id || "",
      title: chatIndividual
        ? ownerActiveChat?.username || ""
        : activeChatData?.title || "",
      image: chatIndividual
        ? ownerActiveChat?.ava || ""
        : activeChatData?.image || "",
      type: activeChatData?.type || "",
    })
  }, [chatId, chats])

  const getOwnerChat = (owners: IChatOwner[]) => {
    const chatOwner = owners.find((owner) => owner.id !== user.id)
    return chatOwner
  }

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(event.target.value)
  }

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createMessage({
      variables: { chat: chatId, content: message },
    })
    setMessage("")
  }

  const activeChatPinned = chatId && chatId.split("_").length !== 2
  console.log("DATA searched chats: ", searchData)
  console.log("Active chat: ", activeChat)
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
              value={searchedText}
              onChange={handleChangeSearch}
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
                !searchedText &&
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
                searchedText &&
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
                      attached={false}
                      key={chat.id}
                      chatOwner={undefined}
                      chat={chat}
                      chatId={chatId}
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
                      attached={false}
                      key={user.id}
                      user={user}
                      userId={chatId}
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
                  attached={true}
                  key={chat.id}
                  chatOwner={chatOwner}
                  chat={chat}
                  chatId={chatId}
                  chatIndividual={chatIndividual}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.chat__main}>
        <div className={styles.chat__toolbar}>
          {chatId && chatId.split("_").length !== 2 && (
            <button className={styles.chat__btn_add}>
              <BsPlus />
            </button>
          )}
        </div>
        <div className={styles.chat_controller}>
          {activeChatPinned ? (
            <>
              <MsgContainer />
              <div className={styles.create_msg}>
                <button
                  className={`${styles.create_msg__btn} ${styles.create_msg__clip_file}`}
                >
                  <AiOutlinePaperClip />
                </button>
                <form
                  onSubmit={handleSubmitForm}
                  className={styles.create_msg__form}
                >
                  <input
                    className={styles.create_msg__input}
                    type='text'
                    value={message}
                    placeholder='Write a message'
                    onChange={handleChangeForm}
                  />
                  <button className='btn-handler'></button>
                </form>
                <button
                  className={`${styles.create_msg__btn} ${styles.create_msg__emoji}`}
                >
                  <AiOutlineSmile />
                </button>
              </div>
            </>
          ) : (
            <div>Hello world</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat
