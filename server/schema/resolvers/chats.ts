import { Chat, UserChat, Message } from "../models"
import { IIsAuth, IField } from "../interfaces"
import { v4 as uuidv4 } from "uuid"

async function createChat(
  { title, description, image, type }: IField,
  isAuth: IIsAuth,
  secondOwner: string | null
) {
  try {
    const chat = new Chat({
      title: type === "individual" ? "individual" : title,
      channel: uuidv4(),
      description,
      date: new Date(),
      image,
      owner: (type === "public" || type === "privet") && isAuth.userId,
      owners: type === "individual" && [isAuth.userId, secondOwner],
      type,
    })

    const newChat = await chat.save()
    return newChat
  } catch (error) {
    throw new Error(error.message)
  }
}

async function createUserChat(userId: string | undefined, chatId: string) {
  try {
    const userchat = new UserChat({
      userId: userId,
      chatId: chatId,
    })
    await userchat.save()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const Query = {}

export const Mutation = {
  async createChat(
    _: any,
    { title, description, image, secondOwner, type }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: validation for each field and check in models

      const newChat = await createChat(
        { title, description, image, type },
        isAuth,
        null
      )
      await createUserChat(isAuth.userId, newChat.id)

      const chats = await UserChat.find({ userId: isAuth.userId }).populate(
        "chatId"
      )
      return chats
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async addUserAccess(
    _: any,
    { chatId, userId }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }

      //TODO: add validation and check in models
      // check wether key - value pair already exists in collection
      if (chatId) {
        const chat: any = await Chat.findById(chatId)
        if (chat.type === "privet" || chat.type === "public") {
          if (isAuth.userId === userId) {
            if (chat.type === "privet") {
              throw new Error("You don't have access to this privet chat!")
            } else {
              await createUserChat(isAuth.userId, chatId)
              const chats = await UserChat.find({
                userId: isAuth.userId,
              }).populate("chatId")
              return chats.chatId
            }
          } else {
            if (isAuth.userId === chat.owner) {
              await createUserChat(userId, chatId)
              return null
            }
            throw new Error("You are not owner of this chat!")
          }
        } else {
          throw new Error("This chat doesn't exists!")
        }
      } else {
        if (userId !== isAuth.userId) {
          const newChat = await createChat(
            { type: "individual" },
            isAuth,
            userId
          )
          await createUserChat(isAuth.userId, newChat.id)
          await createUserChat(userId, newChat.id)
          const chats = await UserChat.find({ userId: isAuth.userId }).populate(
            "chatId"
          )
          return chats.chatId
        }
        throw new Error("Individual chat must have unique users!")
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async removeUserAccess(
    _: any,
    { chatId, userId }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    if (!isAuth.auth) {
      throw new Error("Access denied!")
    }
    //TODO: add validation and check in models

    const chat: any = await Chat.findById(chatId)
    if (chat.type === "privet" || chat.type === "public") {
      if (isAuth.userId === userId) {
        if (chat.owner === isAuth.userId) {
          //delete all related Data
          await Message.deleteMany({ chat: chatId })
          await UserChat.deleteMany({ chatId })
          await Chat.findByIdAndDelete(chatId)
        } else {
          // Delete yourself from chat (UserChat model)
          await UserChat.deleteOne({ chatId, userId: isAuth.userId })
        }
        const chats = await UserChat.find({ userId: isAuth.userId }).populate(
          "chatId"
        )
        return chats.chatId
      } else {
        // Delete user from chat (UserChat model)
        await UserChat.deleteOne({ chatId, userId })
        return null
      }
    } else if (chat.type === "individual") {
      await Message.deleteMany({ chat: chatId })
      await UserChat.deleteMany({ chatId })
      await Chat.findByIdAndDelete(chatId)

      const chats = await UserChat.find({ userId: isAuth.userId }).populate(
        "chatId"
      )
      return chats.chatId
    } else {
      throw new Error("This type is not exists!")
    }
  },
  deleteChat(_: any) {},
}

// createMessage(content: String!, chat: ID!): Message!
// deleteChat(chatId: ID!): String!
// removeUserAccess(chatId: ID!, userId: ID): [Chat]!
