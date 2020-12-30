import React, { Fragment, useEffect } from "react"
import { getLinks } from "../modules/routes"
import { RootStore } from "../redux/store"
import { NavLink } from "react-router-dom"
import { BsSearch, BsBell, BsChatDots } from "react-icons/bs"
import { AiOutlineLogout, AiOutlineCheckCircle } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import {
  DROPDOWN_TOGGLE,
  AUTHFORM_TOGGLE,
  RESET_TOGGLE,
} from "../redux/toggle/toggleTypes"
// @ts-ignore
import styles from "../styles/navbar.module"
import { useQuery } from "@apollo/client"
import {
  GET_USER_NOTIFICATIONS,
  GET_UNREAD_MESSAGES,
} from "../fetching/queries"
import { SET_NOTIFICATIONS } from "../redux/notifications/notifTypes"
import { CHAT_TOGGLE, NOTIFICATIONS_TOGGLE } from "../redux/toggle/toggleTypes"
import { SET_UNREAD_MESSAGES } from "../redux/unreadMsgs/msgsTypes"

const Navbar: React.FC = () => {
  const {
    auth: { user, token },
    toggle: { dropDown, authForm, chat, notifications: notifToggle },
    notifications: { notifications },
    unreadMsgs: { messages },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const { data: dataNotifications } = useQuery(GET_USER_NOTIFICATIONS)
  const { data: dataMessages } = useQuery(GET_UNREAD_MESSAGES)

  useEffect(() => {
    const notifData = dataNotifications && dataNotifications.getNotifications
    if (notifData) {
      dispatch({ type: SET_NOTIFICATIONS, payload: notifData })
    }
  }, [dispatch, dataNotifications])

  useEffect(() => {
    const messages = dataMessages && dataMessages.getUnreadMessages
    if (messages) {
      dispatch({ type: SET_UNREAD_MESSAGES, payload: messages })
    }
  }, [dispatch, dataMessages])

  const handleDropDown = () => {
    dispatch({ type: DROPDOWN_TOGGLE })
  }

  let countUnreadNotif = 0
  notifications.forEach((notif) => {
    if (!notif.active) {
      countUnreadNotif++
    }
  })
  const links = getLinks(user.id)
  return (
    <div className={styles.nav}>
      <div className={styles.nav__menu}>
        <NavLink
          exact
          to='/'
          className={styles.logoLink}
          onClick={() => dispatch({ type: RESET_TOGGLE })}
        >
          <span className={styles.logoLink__logotype}>InWired</span>
        </NavLink>
        <form className={styles.search}>
          <input
            type='text'
            className={styles.search__input}
            placeholder='Search'
          />
          <button className={styles.search__btn}>
            <BsSearch className={styles.search__icon} />
          </button>
        </form>
        {links.map(({ Title, ...link }) => {
          if (
            (link.to === "/bookmarks" || link.to === `/profile/${user.id}`) &&
            !token
          ) {
            return
          } else {
            if (link.to === `/profile/${user.id}`) {
              return (
                <Fragment key={link.to}>
                  <button
                    className={`${styles.link} ${styles.link_popup} ${
                      chat && styles.link__active
                    }`}
                    onClick={() => dispatch({ type: CHAT_TOGGLE })}
                  >
                    <span
                      className={`${styles.link__counter} ${
                        messages.length && styles.link__counter__appear
                      }`}
                    >
                      {messages.length > 25 ? "25+" : messages.length}
                    </span>
                    <BsChatDots />
                  </button>
                  <button
                    className={`${styles.link} ${styles.link_popup} ${
                      notifToggle && styles.link__active
                    }`}
                    onClick={() => dispatch({ type: NOTIFICATIONS_TOGGLE })}
                  >
                    <span
                      className={`${styles.link__counter} ${
                        countUnreadNotif && styles.link__counter__appear
                      }`}
                    >
                      {countUnreadNotif > 5 ? "5+" : countUnreadNotif}
                    </span>
                    <BsBell />
                  </button>
                  <div className={styles.dropdown}>
                    <button
                      className={`${styles.dropdown__btn} ${
                        dropDown && styles.dropdown__btn__active
                      }`}
                      onClick={handleDropDown}
                    >
                      <img
                        className={styles.dropdown__ava}
                        src={user.ava}
                        alt='userAva'
                      />
                    </button>
                    <div
                      onClick={() => dispatch({ type: RESET_TOGGLE })}
                      className={`${styles.dropdown__menu} ${
                        dropDown && styles.dropdown__menu__active
                      }`}
                    >
                      <span className={styles.dropdown__triangle}></span>
                      <NavLink {...link}>
                        <Title className={styles.link_extend__icon} />
                        <span className={styles.link_extend__title}>
                          Profile
                        </span>
                      </NavLink>
                      <button className={styles.link_extend}>
                        <AiOutlineLogout className={styles.link_extend__icon} />
                        <span className={styles.link_extend__title}>
                          Log Out
                        </span>
                      </button>
                    </div>
                  </div>
                </Fragment>
              )
            }
            return (
              <NavLink
                key={link.to}
                {...link}
                onClick={() => dispatch({ type: RESET_TOGGLE })}
              >
                <Title />
              </NavLink>
            )
          }
        })}
        {!token.length && (
          <button
            className={`${styles.link_signup} ${
              authForm && styles.link_signup__active
            }`}
            onClick={() => dispatch({ type: AUTHFORM_TOGGLE })}
          >
            <AiOutlineCheckCircle className={styles.link_signup__icon} />
            <span className={styles.link_signup__title}>Sign Up</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
