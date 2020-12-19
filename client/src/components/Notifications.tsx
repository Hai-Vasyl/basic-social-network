import React from "react"
// @ts-ignore
import styles from "../styles/notifications.module"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"
import ButtonTab from "./ButtonTab"
import { BsX, BsLock, BsCheck } from "react-icons/bs"
import { convertDate } from "../helpers/convertDate"
import UserCard from "./UserCard"
import ChatCard from "./ChatCard"
import Button from "./Button"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"
// id
//       title
//       description
//       channel
//       active
//       date
//       type
//       userId {
//         id
//         username
//         email
//         typeUser
//         ava
//       }
//       chatId {
//         id
//         title
//         type
//         image
//       }

const Notifications: React.FC = () => {
  const {
    toggle: { notifications: notifToggle },
    notifications: { notifications },
  } = useSelector((state: RootStore) => state)
  return (
    <div
      className={`${styles.wrapper} ${notifToggle && styles.wrapper__active}`}
    >
      <h3 className='popup-title'>Notidications</h3>
      <div className={styles.notifies}>
        {notifications.map((notif) => {
          return (
            <div className={styles.notify} key={notif.id}>
              <div className={styles.notify__toolbar}>
                <button className={styles.notify__checkbox}>
                  {notif.active && <BsCheck />}
                </button>
                <div className={styles.notify__title_wrapper}>
                  {notif.type === "access" && (
                    <div className={styles.notify__icon}>
                      <BsLock />
                    </div>
                  )}
                  <div className={styles.notify__title}>{notif.title}</div>
                </div>
                <ButtonTab Icon={BsX} click={() => {}} />
              </div>
              <div className={styles.notify__section}>
                <div>
                  <h4 className={styles.notify__subtitle}>Description:</h4>
                  <p className={styles.notify__description}>
                    {notif.description}
                  </p>
                  <p className={styles.notify__date}>
                    Created: <span>{convertDate(notif.date)}</span>
                  </p>
                </div>
                <div className={styles.notify__card}>
                  <h4 className={styles.notify__card_title}>Requester:</h4>
                  <UserCard
                    isLink={false}
                    isEnvChat={false}
                    user={notif.userId}
                    lighter
                  />
                </div>
                <div className={styles.notify__card}>
                  <h4 className={styles.notify__card_title}>Chat:</h4>
                  <ChatCard isEnvChat={false} chat={notif.chatId} lighter />
                </div>
                <div className={styles.notify__btns}>
                  <Button
                    exClass={stylesBtn.btn_primary}
                    click={() => {}}
                    Icon={AiOutlineCheck}
                    title='Give access'
                  />
                  <Button
                    exClass={stylesBtn.btn_simple}
                    click={() => {}}
                    Icon={AiOutlineClose}
                    title='Deny access'
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Notifications
