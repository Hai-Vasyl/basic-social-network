export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS"

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

export type NotificationsReducerTypes = setNotifications
