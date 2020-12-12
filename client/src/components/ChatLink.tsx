import React from "react"
import { IChatOwner } from "../interfaces"
import { useDispatch } from "react-redux"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import { IChat } from "../redux/chats/chatsTypes"
import { BsLock, BsPeople, BsPerson } from "react-icons/bs"

interface IChatLinkProps {
  chat: IChat
  chatId: string
  chatIndividual: boolean
  chatOwner: IChatOwner | undefined
  unattached: boolean
}

const ChatLink: React.FC<IChatLinkProps> = ({
  chatOwner,
  chat,
  chatId,
  chatIndividual,
  unattached,
}) => {
  const dispatch = useDispatch()
  return (
    <button
      className={`chat-link ${chatId === chat.id && "chat-link--active"}`}
      key={chat.id}
      onClick={() =>
        dispatch({
          type: SET_ACTIVE_CHAT,
          payload: `${unattached && "chat"}_${chat.id}`,
        })
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
}

export default ChatLink
