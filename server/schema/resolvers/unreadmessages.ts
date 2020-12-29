import { UnreadMessage } from "../models"
import { IField, IIsAuth, IMessage } from "../interfaces"

export const Query = {
  async getUnreadMessages(_: any, __: any, { isAuth }: { isAuth: IIsAuth }) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: validation for each field and check in models

      const unreadMessages: any = await UnreadMessage.find({
        userId: isAuth.userId,
      }).populate({ path: "messageId" })

      let messages: IMessage[] = []
      unreadMessages.forEach((msg: any) => {
        messages.push(msg.messageId)
      })
      return messages
    } catch (error) {
      throw new Error(`Getting unread chat messages error: ${error.message}`)
    }
  },
}

export const Mutation = {
  async setUnreadMessage(
    _: any,
    { messageId }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: validation for each field and check in models

      const message = new UnreadMessage({
        userId: isAuth.userId,
        messageId,
      })
      await message.save()

      return "Message set to unread successfully!"
    } catch (error) {
      throw new Error(`Setting chat message to unread error: ${error.message}`)
    }
  },
}
