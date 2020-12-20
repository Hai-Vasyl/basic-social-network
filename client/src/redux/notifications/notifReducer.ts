import {
  NotificationsReducerTypes,
  SET_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_NOTIFICATION,
  INotification,
} from "./notifTypes"

interface IInitState {
  notifications: INotification[]
}

const initState: IInitState = {
  notifications: [],
}

const notificationsReducer = (
  state = initState,
  action: NotificationsReducerTypes
) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        notifications: action.payload,
      }
    case UPDATE_NOTIFICATION:
      return {
        notifications: [...state.notifications].map((notif) => {
          if (notif.id === action.payload.id) {
            return action.payload
          }
          return notif
        }),
      }
    case DELETE_NOTIFICATION:
      return {
        notifications: [...state.notifications].filter(
          (notif) => notif.id !== action.payload
        ),
      }
    case SET_NOTIFICATION:
      return {
        notifications: [action.payload, ...state.notifications],
      }
    default:
      return state
  }
}

export default notificationsReducer
