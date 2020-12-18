import {
  NotificationsReducerTypes,
  SET_NOTIFICATIONS,
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
    default:
      return state
  }
}

export default notificationsReducer
