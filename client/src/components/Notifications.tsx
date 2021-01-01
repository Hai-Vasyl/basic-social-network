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
  DELETE_NOTIFICATION as DELETE_NOTIFICATION_MUTATION,
} from "../fetching/mutations"
import { useMutation } from "@apollo/client"
import {
  INotification,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "../redux/notifications/notifTypes"
import notifTypes from "../modules/notifTypes"

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
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION_MUTATION)

  useEffect(() => {
    if (data && data.checkNotification) {
      dispatch({ type: UPDATE_NOTIFICATION, payload: data.checkNotification })
    }
  }, [dispatch, data])

  const getInitVariableConfig = (
    userId: { username: string; id: string },
    chatId: { title: string; id: string },
    type: string
  ) => {
    return {
      title: `Access ${
        type === notifTypes.accessAllowed.keyWord ? "allowed" : "denied"
      } for user ${userId.username}`,
      description: `Access user ${userId.username} to private chat ${
        chatId.title
      } was ${
        type === notifTypes.accessAllowed.keyWord ? "allowed" : "denied"
      } by chat owner ${user.username}.`,
      type:
        type === notifTypes.accessAllowed.keyWord
          ? notifTypes.accessAllowed.keyWord
          : notifTypes.accessDenied.keyWord,
      chatId: chatId.id,
      userId: user.id,
      channel: userId.id,
    }
  }

  const handleAddUserAccess = (notif: INotification) => {
    const { userId, chatId } = notif
    addUserAccess({
      variables: {
        userId: userId.id,
        chatId: chatId.id,
      },
    })

    createNotification({
      variables: getInitVariableConfig(
        userId,
        chatId,
        notifTypes.accessAllowed.keyWord
      ),
    })
    deleteNotification({ variables: { notifId: notif.id } })
    dispatch({ type: DELETE_NOTIFICATION, payload: notif.id })
  }

  const handleDenyAccess = (notif: INotification) => {
    const { userId, chatId, type } = notif
    if (type === notifTypes.access.keyWord) {
      createNotification({
        variables: getInitVariableConfig(
          userId,
          chatId,
          notifTypes.accessDenied.keyWord
        ),
      })
    }

    deleteNotification({ variables: { notifId: notif.id } })
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
