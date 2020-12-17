import React, { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
// @ts-ignore
import styles from "../styles/chatinfo.module"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import { RiUserSettingsLine } from "react-icons/ri"
import {
  BsPersonPlus,
  BsPerson,
  BsDashCircle,
  BsPlusCircle,
} from "react-icons/bs"
import Button from "./Button"
import { convertDate } from "../helpers/convertDate"
import { useMutation } from "@apollo/client"
import { ADD_USER_ACCESS, REMOVE_USER_ACCESS } from "../fetching/mutations"
import { SET_CHATS } from "../redux/chats/chatsTypes"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import keyWords from "../modules/keyWords"
import { IChat } from "../redux/chats/chatsTypes"

interface IUserInfoProps {
  ava: string
  date: string
  email: string
  firstname: string
  lastname: string
  id: string
  username: string
  typeUser: string
  isConnect?: boolean
}

const UserInfo: React.FC<IUserInfoProps> = (info) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    currentChat: { route },
    chats,
  } = useSelector((state: RootStore) => state)
  const [addAccess, addAData] = useMutation(ADD_USER_ACCESS)
  const [removeAccess, removeAData] = useMutation(REMOVE_USER_ACCESS)

  useEffect(() => {
    const addAccessData = addAData.data && addAData.data.addUserAccess
    const rmAccessData = removeAData.data && removeAData.data.removeUserAccess
    if (addAccessData) {
      dispatch({ type: SET_CHATS, payload: addAccessData })

      let activeChatId
      addAccessData.forEach((chat: IChat) => {
        if (chat.type === "individual") {
          const ownerChat =
            chat.owners && chat.owners.find((owner) => owner.id === info.id)
          if (!!ownerChat) {
            activeChatId = chat.id
          }
        }
      })

      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: { keyWord: keyWords.chatMessages, chatId: activeChatId },
      })
    } else if (rmAccessData) {
      dispatch({ type: SET_CHATS, payload: rmAccessData })
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: { keyWord: keyWords.userConnect, chatId: info.id },
      })
    }
  }, [dispatch, addAData.data, removeAData.data])

  const handleSubscribe = () => {
    if (info.isConnect) {
      addAccess({ variables: { chatId: null, userId: info.id } })
    } else {
      removeAccess({ variables: { chatId: route.chatId, userId: null } })
    }
  }

  return (
    <>
      <div className={styles.info}>
        <div className={styles.info__preview}>
          <Link className={styles.info__link} to={`/profile/${info.id}`}>
            <img
              className={styles.info__image}
              src={info.ava}
              alt='userImage'
            />
            {info.typeUser == "admin" && (
              <div className={styles.info__icon}>
                <RiUserSettingsLine />
              </div>
            )}
          </Link>
        </div>
        <div className={styles.info__about}>
          <div className={styles.info__main}>
            <Link className={styles.info__title} to={`/profile/${info.id}`}>
              {info.username}
            </Link>
            <p className={styles.info__subtitle}>{info.email}</p>
          </div>

          <div className={styles.info__extended}>
            <div className={styles.info__field}>
              Firstname:
              <span className={styles.info__text}>
                {info.firstname ? (
                  info.firstname
                ) : (
                  <span className={styles.info__plug}>empty</span>
                )}
              </span>
            </div>
            <div className={styles.info__field}>
              Lastname:
              <span className={styles.info__text}>
                {info.lastname ? (
                  info.lastname
                ) : (
                  <span className={styles.info__plug}>empty</span>
                )}
              </span>
            </div>
            <div className={`${styles.info__field} ${styles.info__field_date}`}>
              Last updated:
              <span className={styles.info__text}>
                {convertDate(info.date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.info__btns}>
        <Button
          Icon={BsPersonPlus}
          title='Follow'
          exClass={stylesBtn.btn_primary}
          click={() => {}}
        />
        <Button
          Icon={BsPerson}
          title='Profile'
          exClass={stylesBtn.btn_simple}
          click={() => history.push(`/profile/${info.id}`)}
        />
        <Button
          Icon={info.isConnect ? BsPlusCircle : BsDashCircle}
          title={info.isConnect ? "Subscribe" : "Unsubscribe"}
          exClass={`${stylesBtn.btn_activated} ${styles.info__btn_unsubscribe}`}
          click={handleSubscribe}
        />
      </div>
    </>
  )
}

export default UserInfo
