import { User, Chat } from "../models"

export const UserChat = {
  async userId({ userId }: { userId: string }) {
    try {
      const user = await User.findById(userId)
      return user
    } catch (error) {
      throw new Error(`Getting user subscribed to chat error: ${error.message}`)
    }
  },
  async chatId({ chatId }: { chatId: string }) {
    try {
      const chat = await Chat.findById(chatId)
      return chat
    } catch (error) {
      throw new Error(`Getting chat related to user error: ${error.message}`)
    }
  },
}
