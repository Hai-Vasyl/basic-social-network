import { Chat, UserChat, Message } from "../models"
import { IIsAuth, IField, IChat } from "../interfaces"
import { v4 as uuidv4 } from "uuid"

async function createChat(
  { title, description, image, type }: IField,
  isAuth: IIsAuth,
  secondOwner: string | null
) {
  try {
    let chat
    if (type === "individual") {
      chat = new Chat({
        title: `individual_${uuidv4()}`,
        channel: uuidv4(),
        description,
        date: new Date(),
        image,
        owners: [isAuth.userId, secondOwner],
        type,
      })
    } else {
      chat = new Chat({
        title,
        channel: uuidv4(),
        description,
        date: new Date(),
        image,
        owner: isAuth.userId,
        type,
      })
    }

    const newChat = await chat.save()
    return newChat
  } catch (error) {
    throw new Error(`CreateChat function error: ${error.message}`)
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
    throw new Error(`CreateUserChat function error: ${error.message}`)
  }
}

async function getAllUserChats(userId: string | undefined) {
  try {
    const chats = await UserChat.find({ userId })
      .populate({
        path: "chatId",
      })
      .select("chatId")

    let allChats: IChat[] = []
    chats.forEach((chat: any) => {
      allChats.push(chat.chatId)
    })
    return allChats
  } catch (error) {
    throw new Error(`GetAllUserChats function error${error.message}`)
  }
}

export const Query = {
  async userChats(_: any, __: any, { isAuth }: { isAuth: IIsAuth }) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      const allChats = await getAllUserChats(isAuth.userId)
      return allChats
    } catch (error) {
      throw new Error(`Getting all user chats error: ${error.message}`)
    }
  },
}

export const Mutation = {
  async createChat(
    _: any,
    { title, description, image, type }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: validation for each field and check in models

      if (type === "public" || type === "privet") {
        const newChat = await createChat(
          { title, description, image, type },
          isAuth,
          null
        )

        await createUserChat(isAuth.userId, newChat.id)

        const allChats = await getAllUserChats(isAuth.userId)
        return allChats
      } else {
        throw new Error("You can't create chat with this type!")
      }
    } catch (error) {
      throw new Error(`Create new chat error: ${error.message}`)
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

              const allChats = await getAllUserChats(isAuth.userId)
              return allChats
            }
          } else {
            if (isAuth.userId === String(chat.owner)) {
              await createUserChat(userId, chatId)
              return []
            }
            throw new Error("You are not owner of this chat!")
          }
        } else {
          throw new Error("This chat doesn't exists!")
        }
      } else {
        if (userId !== isAuth.userId) {
          const isChatAlreadyExists = await Chat.findOne({
            type: "individual",
            owners: {
              $in: [
                [userId, isAuth.userId],
                [isAuth.userId, userId],
              ],
            },
          })
          if (isChatAlreadyExists?.id) {
            throw new Error(
              "Individual chat is already exists with this users!"
            )
          }
          const newChat = await createChat(
            { type: "individual" },
            isAuth,
            userId
          )
          await createUserChat(isAuth.userId, newChat.id)
          await createUserChat(userId, newChat.id)

          const allChats = await getAllUserChats(isAuth.userId)
          return allChats
        }
        throw new Error("Individual chat must have unique users!")
      }
    } catch (error) {
      throw new Error(`Add user access error: ${error.message}`)
    }
  },
  async removeUserAccess(
    _: any,
    { chatId, userId }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      const chat: any = await Chat.findById(chatId)
      if (chat.type === "privet" || chat.type === "public") {
        if (isAuth.userId === userId) {
          if (String(chat.owner) === isAuth.userId) {
            //delete all related Data
            await Message.deleteMany({ chat: chatId })
            await UserChat.deleteMany({ chatId })
            await Chat.findByIdAndDelete(chatId)
          } else {
            // Delete yourself from chat (UserChat model)
            await UserChat.deleteOne({ chatId, userId: isAuth.userId })
          }

          const allChats = await getAllUserChats(isAuth.userId)
          return allChats
        } else {
          // Delete user from chat (UserChat model)
          await UserChat.deleteOne({ chatId, userId })
          return []
        }
      } else if (chat.type === "individual") {
        await Message.deleteMany({ chat: chatId })
        await UserChat.deleteMany({ chatId })
        await Chat.findByIdAndDelete(chatId)

        const allChats = await getAllUserChats(isAuth.userId)
        return allChats
      } else {
        throw new Error("This type is not exists!")
      }
    } catch (error) {
      throw new Error(`Remove user access ${error.message}`)
    }
  },
}
