import React, { useState, useEffect } from "react"
import { RootStore } from "../redux/store"
import { useSelector } from "react-redux"
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
import "../styles/chat.scss"

const Chat: React.FC = () => {
  const {
    auth: { user },
    chats,
    currentChat: { chatId },
  } = useSelector((state: RootStore) => state)
  const [message, setMessage] = useState("")
  const [searchedText, setSearchedText] = useState("")
  const [createMessage, { data, error, loading }] = useMutation(CREATE_MESSAGE)
  const {
    data: searchData,
    error: searchError,
    loading: searchLoad,
  } = useQuery(SEARCH_CHATS, { variables: { searchStr: searchedText } })

  useEffect(() => {
    localStorage.setItem("activeChat", chatId || "")
  }, [chatId])

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

  // const isMyChats = chatId.split("_").length !== 2
  console.log("DATA searched chats: ", searchData)
  return (
    <div className='chat'>
      <div className='chat__sidebar'>
        <div className='chat__toolbar'>
          <button className='chat__btn-add'>
            <BsPlus />
          </button>
          <form className='chat__searchbar'>
            <input
              type='text'
              className='chat__search'
              value={searchedText}
              onChange={handleChangeSearch}
            />
            <button className='chat__btn-search'>
              <BsSearch />
            </button>
          </form>
        </div>
        <div className='chat__stacks'>
          <div className='chat__searched-stack'>
            <div
              className={`chat__labels ${
                !searchedText &&
                !(
                  searchData &&
                  (searchData.searchChats.chats.length ||
                    searchData.searchChats.users.length)
                ) &&
                "chat__labels--close"
              }`}
            >
              Search results
            </div>
            <div
              className={`chat__empty-plug ${
                searchedText &&
                !(
                  searchData &&
                  (searchData.searchChats.chats.length ||
                    searchData.searchChats.users.length)
                ) &&
                "chat__empty-plug--active"
              }`}
            >
              Nothing found
            </div>
            <div className=''>
              {searchData &&
                searchData.searchChats.chats.map((chat: IChat) => {
                  return (
                    <ChatLink
                      unattached={true}
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
                    <UserLink unattached={true} user={user} userId={chatId} />
                  )
                })}
            </div>
          </div>
          <div className='chat__chats-stack'>
            <div className='chat__labels'>Your chats</div>
            {chats.map((chat) => {
              const chatIndividual = chat.type === "individual"
              const chatOwner: IChatOwner | undefined = getOwnerChat(
                chat.owners || []
              )
              return (
                <ChatLink
                  unattached={false}
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
      <div className='chat__main'>
        <div className='chat__toolbar'>
          <button className='chat__btn-add'>
            <BsPlus />
          </button>
        </div>
        <div className='chat-controller'>
          {/* {isMyChats ? ( */}
          <>
            <MsgContainer />
            <div className='create-msg'>
              <button className='create-msg__btn create-msg__clip-file'>
                <AiOutlinePaperClip />
              </button>
              <form onSubmit={handleSubmitForm} className='create-msg__form'>
                <input
                  className='create-msg__input'
                  type='text'
                  value={message}
                  placeholder='Write a message'
                  onChange={handleChangeForm}
                />
                <button className='btn-handler'></button>
              </form>
              <button className='create-msg__btn create-msg__emoji'>
                <AiOutlineSmile />
              </button>
            </div>
          </>
          {/* ) : (
            <div>Hello world</div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Chat
