import React, { useState, useEffect } from "react"
import { RootStore } from "../redux/store"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlinePaperClip, AiOutlineSmile } from "react-icons/ai"
import { BsPlus, BsSearch, BsLock, BsPeople, BsPerson } from "react-icons/bs"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import { CREATE_MESSAGE } from "../fetching/mutations"
import { useMutation } from "@apollo/client"
import MsgContainer from "./MsgContainer"
import "../styles/chat.scss"

interface IChatOwner {
  id: string
  ava: string
  username: string
}

const Chat: React.FC = () => {
  const {
    auth: { user },
    chats,
    currentChat: { chatId },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const [createMessage, { data, error, loading }] = useMutation(CREATE_MESSAGE)

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

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createMessage({
      variables: { chat: chatId, content: message },
    })
    setMessage("")
    console.log("Form submited!")
  }

  console.log("DATA CREATED MESSAGE: ", data)
  return (
    <div className='chat'>
      <div className='chat__sidebar'>
        <div className='chat__toolbar'>
          <button className='chat__btn-add'>
            <BsPlus />
          </button>
          <form className='chat__searchbar'>
            <input type='text' className='chat__search' />
            <button className='chat__btn-search'>
              <BsSearch />
            </button>
          </form>
        </div>
        {/* <div>sdf</div> */}
        <div className='chat__chats-stack'>
          {chats.map((chat) => {
            let chatIndividual = chat.type === "individual"
            let chatOwner: IChatOwner | undefined
            if (chatIndividual) {
              chatOwner = getOwnerChat(chat.owners || [])
            }
            return (
              <button
                className={`chat-link ${
                  chatId === chat.id && "chat-link--active"
                }`}
                key={chat.id}
                onClick={() =>
                  dispatch({ type: SET_ACTIVE_CHAT, payload: chat.id })
                }>
                <div className='chat-link__img-container'>
                  <img
                    className='chat-link__img'
                    src={chatIndividual ? chatOwner?.ava : chat.image}
                    alt='chatImage'
                  />
                  {chatIndividual ? (
                    <BsPerson className='chat-link__type' />
                  ) : chat.type === "privet" ? (
                    <BsLock className='chat-link__type' />
                  ) : (
                    <BsPeople className='chat-link__type' />
                  )}
                </div>
                <div className='chat-link__title-container'>
                  <span className='chat-link__title'>
                    {chatIndividual ? chatOwner?.username : chat.title}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <div className='chat__main'>
        <div className='chat__toolbar'>
          <button className='chat__btn-add'>
            <BsPlus />
          </button>
          {/* <form className='chat__searchbar'>
            <input type='text' className='chat__search' />
            <button className='chat__btn-search'>
              <BsSearch />
            </button>
          </form> */}
        </div>
        <div className='chat-controller'>
          <MsgContainer />
          <div className='create-msg'>
            <button className='create-msg__btn create-msg__clip-file'>
              <AiOutlinePaperClip />
            </button>
            <form onSubmit={handleSubmitForm} className='create-msg__form'>
              <input
                className='create-msg__input'
                type='text'
                placeholder='Write a message'
                onChange={handleChangeForm}
              />
              <button className='btn-handler'></button>
            </form>
            <button className='create-msg__btn create-msg__emoji'>
              <AiOutlineSmile />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
