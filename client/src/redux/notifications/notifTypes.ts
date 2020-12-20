export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS"
export const UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION"
export const SET_NOTIFICATION = "SET_NOTIFICATION"
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION"

export interface INotification {
  id: string
  title: string
  description: string
  channel: string
  active: boolean
  date: string
  type: string
  userId: {
    id: string
    username: string
    email: string
    typeUser: string
    ava: string
  }
  chatId: {
    id: string
    title: string
    type: string
    image: string
  }
}

export interface setNotifications {
  type: typeof SET_NOTIFICATIONS
  payload: INotification[]
}
export interface updateNotification {
  type: typeof UPDATE_NOTIFICATION
  payload: INotification
}
export interface deleteNotification {
  type: typeof DELETE_NOTIFICATION
  payload: string
}
export interface setNotification {
  type: typeof SET_NOTIFICATION
  payload: INotification
}

export type NotificationsReducerTypes =
  | setNotifications
  | updateNotification
  | deleteNotification
  | setNotification
