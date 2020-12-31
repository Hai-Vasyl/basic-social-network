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
  async setMessageRead(
    _: any,
    { messageId }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: validation for each field and check in models

      await UnreadMessage.deleteMany({ messageId, userId: isAuth.userId })

      return "Message read successfully!"
    } catch (error) {
      throw new Error(`Chat message read error: ${error.message}`)
    }
  },
  async deleteUnreadMessages(
    _: any,
    { messages }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: validation for each field and check in models

      await UnreadMessage.deleteMany({
        messageId: { $in: messages },
        userId: isAuth.userId,
      })

      return "Unread messages deleted successfully!"
    } catch (error) {
      throw new Error(`Deleting unread chat messages error: ${error.message}`)
    }
  },
}
