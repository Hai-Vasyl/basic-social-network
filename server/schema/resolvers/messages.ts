import { Message } from "../models"
import { IField, IIsAuth } from "../interfaces"

export const Query = {
  async chatMessages(
    _: any,
    { chat }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: validation for each field and check in models

      const messages = await Message.find({ chat })
      return messages
    } catch (error) {
      throw new Error(`Getting all chat messages error: ${error.message}`)
    }
  },
}

export const Mutation = {
  async createMessage(
    _: any,
    { content, chat }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: validation for each field and check in models
      const message = new Message({
        content,
        chat,
        owner: isAuth.userId,
        date: new Date(),
      })
      const newMessage = await message.save()

      return newMessage
    } catch (error) {
      throw new Error(`Create message error: ${error.message}`)
    }
  },
}
