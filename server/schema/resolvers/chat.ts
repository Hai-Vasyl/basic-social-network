import { User, Message } from "../models"

export const Chat = {
  async owner({ owner }: { owner: string }) {
    try {
      const user = await User.findById(owner)
      return user
    } catch (error) {
      throw new Error(`Getting chat owner error: ${error.message}`)
    }
  },
  async owners({ owners }: { owners: string[] }) {
    try {
      if (owners.length === 2) {
        const userFirst = await User.findById(owners[0])
        const userSecond = await User.findById(owners[1])

        return [userFirst, userSecond]
      } else {
        if (owners.length === 1 || owners.length > 2) {
          throw new Error(`Individual chat must have 2 users!`)
        } else {
          return []
        }
      }
    } catch (error) {
      throw new Error(`Getting chat owners error: ${error.message}`)
    }
  },
  async lastMessage({ lastMessage }: { lastMessage: string }) {
    try {
      const message = await Message.findById(lastMessage)
      return message
    } catch (error) {
      throw new Error(`Getting last message of chat error: ${error.message}`)
    }
  },
}
