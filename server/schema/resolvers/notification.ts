import { Chat, User } from "../models"

export const Notification = {
  async chatId({ chatId }: { chatId: string }) {
    try {
      const chat = await Chat.findById(chatId)

      return chat
    } catch (error) {
      throw new Error(`Getting chat for notification error: ${error.message}`)
    }
  },
  async userId({ userId }: { userId: string }) {
    try {
      const user = await User.findById(userId)

      return user
    } catch (error) {
      throw new Error(`Getting user for notification error: ${error.message}`)
    }
  },
}
