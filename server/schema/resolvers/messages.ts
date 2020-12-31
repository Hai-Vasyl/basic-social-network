import { Message, Chat, UserChat, UnreadMessage } from "../models"
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
  async searchMessages(
    _: any,
    { searchStr, chatId }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: validation for each field and check in models

      const messages = await Message.find({
        chat: chatId,
        $text: { $search: searchStr },
      })
      return messages
    } catch (error) {
      throw new Error(`Getting searched chat messages error: ${error.message}`)
    }
  },
}

export const Subscription = {
  newMessage: {
    subscribe(_: any, { channels }: { channels: string[] }, { pubsub }: any) {
      return pubsub.asyncIterator(channels)
    },
  },
}

export const Mutation = {
  async createMessage(
    _: any,
    { content, chat: chatId }: IField,
    { isAuth, pubsub }: { isAuth: IIsAuth; pubsub: any }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: validation for each field and check in models
      const chat: any = await Chat.findById(chatId)
      if (!chat?.id) {
        throw new Error("Chat is not exists!")
      }

      const message = new Message({
        content,
        chat: chatId,
        owner: isAuth.userId,
        date: new Date(),
      })
      const newMessage = await message.save()
      await Chat.updateOne({ _id: chatId }, { lastMessage: newMessage.id })

      const chatUsers: any = await UserChat.find({ chatId })

      for (let i = 0; i < chatUsers.length; i++) {
        const unreadMsg = new UnreadMessage({
          userId: chatUsers[i].userId,
          messageId: newMessage.id,
        })
        await unreadMsg.save()
      }

      pubsub.publish(chat.channel, { newMessage })
      return newMessage
    } catch (error) {
      throw new Error(`Create message error: ${error.message}`)
    }
  },
}
