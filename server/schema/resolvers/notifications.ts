import { Notification } from "../models"
import { IField, IIsAuth } from "../interfaces"

export const Query = {
  async getNotifications(_: any, __: any, { isAuth }: { isAuth: IIsAuth }) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      const notifications = await Notification.find({ channel: isAuth.userId })
      return notifications
    } catch (error) {
      throw new Error(`Getting all notifications error: ${error.message}`)
    }
  },
}

export const Subscription = {
  newNotification: {
    subscribe(_: any, { channels }: { channels: string[] }, { pubsub }: any) {
      return pubsub.asyncIterator(channels)
    },
  },
}

export const Mutation = {
  async createNotification(
    _: any,
    { title, description, type, chatId, userId, channel }: IField,
    { isAuth, pubsub }: { isAuth: IIsAuth; pubsub: any }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      const notification = new Notification({
        title,
        description,
        type,
        chatId,
        userId,
        channel,
        date: new Date(),
      })
      const newNotification = await notification.save()
      pubsub.publish(channel, { newNotification })
      return newNotification
    } catch (error) {
      throw new Error(`Creating notification error: ${error.message}`)
    }
  },
}
