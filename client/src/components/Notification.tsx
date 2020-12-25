import React from "react"
import ButtonTab from "./ButtonTab"
import { BsX, BsLock, BsCheck, BsExclamationCircle } from "react-icons/bs"
import { convertDate } from "../helpers/convertDate"
import UserCard from "./UserCard"
import ChatCard from "./ChatCard"
import Button from "./Button"
// @ts-ignore
import stylesBtn from "../styles/button.module"
// @ts-ignore
import styles from "../styles/notifications.module"
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"
import { INotification } from "../redux/notifications/notifTypes"
import { DELETE_NOTIFICATION } from "../redux/notifications/notifTypes"
import { useDispatch } from "react-redux"

interface INotifProps {
  notif: INotification
  notifAccessDenied: boolean
  clickCheck(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
  giveAccess(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
  denyAccess(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
}

const Notification: React.FC<INotifProps> = ({
  notif,
  clickCheck,
  giveAccess,
  denyAccess,
  notifAccessDenied,
}) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.notify} key={notif.id}>
      <div className={styles.notify__toolbar}>
        <button className={styles.notify__checkbox} onClick={clickCheck}>
          {notif.active && <BsCheck />}
        </button>
        <div className={styles.notify__title_wrapper}>
          <div className={styles.notify__icon}>
            {notifAccessDenied ? <BsExclamationCircle /> : <BsLock />}
          </div>
          <div className={styles.notify__title}>{notif.title}</div>
        </div>
        <ButtonTab Icon={BsX} click={denyAccess} />
      </div>
      <div className={styles.notify__section}>
        <div>
          <h4 className={styles.notify__subtitle}>Description:</h4>
          <p className={styles.notify__description}>{notif.description}</p>
          <p className={styles.notify__date}>
            Created: <span>{convertDate(notif.date)}</span>
          </p>
        </div>
        <div className={styles.notify__card}>
          <h4 className={styles.notify__card_title}>
            {notifAccessDenied ? "Chat owner" : "Requester"}:
          </h4>
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
        {!notifAccessDenied && (
          <div className={styles.notify__btns}>
            <Button
              exClass={stylesBtn.btn_primary}
              click={giveAccess}
              Icon={AiOutlineCheck}
              title='Give access'
            />
            <Button
              exClass={stylesBtn.btn_simple}
              click={denyAccess}
              Icon={AiOutlineClose}
              title='Deny access'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Notification
