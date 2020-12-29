import { Chat, User, UserChat, Message } from "../models"
import { IUser, IIsAuth, IField, IChat } from "../interfaces"
import {
  uploadUserChatBucket,
  updateUserChatBucket,
  deleteUserChatBucket,
} from "../helpers/crudUserChatBucket"
import { v4 as uuidv4 } from "uuid"
import { createEditValid } from "../validation/chats"

interface IAllAnyFields {
  [key: string]: any
}

async function createChat(
  { title, description, image, imageKey, type }: IField,
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
        imageKey,
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
        imageKey,
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
  async userChats(
    _: any,
    { userId }: { userId?: string },
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      const allChats = await getAllUserChats(userId || isAuth.userId)
      return allChats
    } catch (error) {
      throw new Error(`Getting all user chats error: ${error.message}`)
    }
  },
  async getChatUserInfo(
    _: any,
    { isChat, id }: { isChat: boolean; id: string },
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models
      let data
      if (isChat) {
        data = await Chat.findById(id)
      } else {
        data = await User.findById(id)
      }

      if (!data?.id) {
        throw new Error("This chat or user is not exists anymore!")
      }
      return isChat ? { user: null, chat: data } : { user: data, chat: null }
    } catch (error) {
      throw new Error(`Getting User or Chat info error: ${error.message}`)
    }
  },
  async getChatUsers(
    _: any,
    { chatId }: { chatId: string },
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      const userchats: any = await UserChat.find({ chatId })
        .populate({ path: "userId" })
        .select("-password")

      let users: IUser[] = []
      userchats.forEach((userchat: { chatId: string; userId: IUser }) => {
        users.push(userchat.userId)
      })

      return users
    } catch (error) {
      throw new Error(`Getting all users of chat error: ${error.message}`)
    }
  },
  async searchChats(
    _: any,
    { searchStr }: { searchStr: string },
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }
      //TODO: add validation and check in models

      const chats = await getAllUserChats(isAuth.userId)
      const searchedChats = await Chat.find({
        $text: { $search: searchStr },
        type: { $in: ["public", "privet"] },
      })
      const searchedUsers = await User.find({ $text: { $search: searchStr } })

      let allSearched: IAllAnyFields = {
        chats: [],
        users: [],
      }

      searchedChats.forEach((chat) => {
        let isConsists = false
        chats.forEach((userChat) => {
          if (userChat.id === chat.id) {
            isConsists = true
          }
        })
        if (!isConsists) {
          allSearched.chats.push(chat)
        }
      })

      searchedUsers.forEach((user) => {
        let isConsists = false
        chats.forEach((userChat) => {
          if (userChat && userChat.owners && userChat.owners.length) {
            if (
              String(userChat.owners[0]) === String(user.id) ||
              String(userChat.owners[1]) === String(user.id)
            ) {
              isConsists = true
            }
          }
        })
        if (!isConsists) {
          allSearched.users.push(user)
        }
      })

      return allSearched
    } catch (error) {
      throw new Error(`Search chats and users error: ${error.message}`)
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

      const {
        type: vType,
        title: vTitle,
        isError,
      }: any = await createEditValid({ type, title })
      if (isError) {
        throw new Error(JSON.stringify({ title: vTitle, type: vType }))
      }

      if (vType.value === "public" || vType.value === "privet") {
        let uploaded
        if (image) {
          uploaded = await uploadUserChatBucket(image)
        }

        const newChat = await createChat(
          {
            title: vTitle.value,
            description,
            image: uploaded && uploaded.Location,
            imageKey: uploaded && uploaded.Key,
            type: vType.value,
          },
          isAuth,
          null
        )

        await createUserChat(isAuth.userId, newChat.id)

        return newChat
      } else {
        throw new Error(
          JSON.stringify({
            type: {
              value: vType.value,
              msg: ["You can't create chat with this type!"],
            },
          })
        )
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async editChat(
    _: any,
    { title, description, image, type, id }: IField,
    { isAuth }: { isAuth: IIsAuth }
  ) {
    try {
      if (!isAuth.auth) {
        throw new Error("Access denied!")
      }

      const {
        type: vType,
        title: vTitle,
        isError,
      }: any = await createEditValid({ type, title }, id)
      if (isError) {
        throw new Error(JSON.stringify({ title: vTitle, type: vType }))
      }

      const chat: any = await Chat.findById(id)
      if (!chat) {
        throw new Error(
          JSON.stringify({
            title: {
              value: vTitle.value,
              msg: ["This chat doesn't exists!"],
            },
            type: {
              value: vType.value,
              msg: ["This chat doesn't exists!"],
            },
          })
        )
      }

      let uploaded
      if (image) {
        uploaded = await updateUserChatBucket(image, chat.imageKey)
      }

      await Chat.findByIdAndUpdate(chat.id, {
        title: vTitle.value,
        description,
        image: uploaded ? uploaded.Location : chat.image,
        imageKey: uploaded ? uploaded.Key : chat.imageKey,
        type: vType.value,
      })

      const chatUpdated = await Chat.findById(chat.id)
      return chatUpdated
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

              const allChats = await getAllUserChats(isAuth.userId)
              return allChats
            }
          } else {
            if (isAuth.userId === String(chat.owner)) {
              await createUserChat(userId, chatId)
              const allChats = await getAllUserChats(userId)
              return allChats
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
            await Message.deleteMany({ chat: chatId })
            await UserChat.deleteMany({ chatId })
            await deleteUserChatBucket(chat.imageKey)
            await Chat.findByIdAndDelete(chatId)
          } else {
            // Delete yourself from chat (UserChat model)
            await UserChat.deleteMany({ chatId, userId: isAuth.userId })
          }

          const allChats = await getAllUserChats(isAuth.userId)
          return allChats
        } else {
          // Delete user from chat (UserChat model)
          await UserChat.deleteMany({ chatId, userId })
          const allChats = await getAllUserChats(userId)
          return allChats
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
