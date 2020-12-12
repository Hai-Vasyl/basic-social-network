import React from "react"
import { useDispatch } from "react-redux"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import { IUserLink } from "../interfaces"
import { BsPerson } from "react-icons/bs"

interface IUserLinkProps {
  user: IUserLink
  userId: string
  unattached: boolean
}

const UserLink: React.FC<IUserLinkProps> = ({ user, userId, unattached }) => {
  const dispatch = useDispatch()

  return (
    <button
      className={`chat-link ${userId === user.id && "chat-link--active"}`}
      key={user.id}
      onClick={() =>
        dispatch({
          type: SET_ACTIVE_CHAT,
          payload: `${unattached && "user"}_${user.id}`,
        })
      }>
      <div className='chat-link__img-container'>
        <img className='chat-link__img' src={user.ava} alt='chatImage' />
        <BsPerson className='chat-link__type' />
      </div>
      <div className='chat-link__title-container'>
        <span className='chat-link__title'>{user.username}</span>
      </div>
    </button>
  )
}

export default UserLink
