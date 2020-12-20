import React, { useEffect } from "react"
// @ts-ignore
import styles from "../styles/notifications.module"
import { useSelector, useDispatch } from "react-redux"
import { RootStore } from "../redux/store"
import Notification from "./Notification"
import {
  CHECK_NOTIFICATION,
  ADD_USER_ACCESS,
  CREATE_NOTIFICATION,
} from "../fetching/mutations"
import { useMutation } from "@apollo/client"
import {
  INotification,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "../redux/notifications/notifTypes"
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
  const dispatch = useDispatch()
  const {
    toggle: { notifications: notifToggle },
    notifications: { notifications },
    auth: { user },
  } = useSelector((state: RootStore) => state)
  const [checkNotification, { data, loading }] = useMutation(CHECK_NOTIFICATION)
  const [addUserAccess] = useMutation(ADD_USER_ACCESS)
  const [createNotification] = useMutation(CREATE_NOTIFICATION)

  useEffect(() => {
    if (data && data.checkNotification) {
      dispatch({ type: UPDATE_NOTIFICATION, payload: data.checkNotification })
    }
  }, [dispatch, data])

  const handleAddUserAccess = (notif: INotification) => {
    addUserAccess({
      variables: {
        userId: notif.userId.id,
        chatId: notif.chatId.id,
      },
    })
    dispatch({ type: DELETE_NOTIFICATION, payload: notif.id })
  }

  const handleDenyAccess = (notif: INotification) => {
    const { userId, chatId } = notif
    createNotification({
      variables: {
        title: `Access denied for user ${userId.username}`,
        description: `Access user ${userId.username} to private chat ${chatId.title} was denied by chat owner ${user.id}.`,
        type: "access-denied",
        chatId: chatId.id,
        userId: user.id,
        channel: userId.id,
      },
    })
    dispatch({ type: DELETE_NOTIFICATION, payload: notif.id })
  }

  return (
    <div
      className={`${styles.wrapper} ${notifToggle && styles.wrapper__active}`}
    >
      <h3 className='popup-title'>Notidications</h3>
      <div className={styles.notifies}>
        {notifications.map((notif) => {
          return (
            <Notification
              key={notif.id}
              notifAccessDenied={notif.type === "access-denied"}
              notif={notif}
              giveAccess={() => handleAddUserAccess(notif)}
              denyAccess={() => handleDenyAccess(notif)}
              clickCheck={() =>
                checkNotification({
                  variables: {
                    notifId: notif.id,
                  },
                })
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default Notifications
