import { Chat, User } from "../models"

export const Message = {
  async owner({ owner }: { owner: string }) {
    try {
      const user = await User.findById(owner)
      return user
    } catch (error) {
      throw new Error(`Getting message owner error: ${error.message}`)
    }
  },
  async chat({ chat }: { chat: string }) {
    try {
      const chatDoc = await Chat.findById(chat)
      return chatDoc
    } catch (error) {
      throw new Error(`Getting chat message error: ${error.message}`)
    }
  },
}
