import { gql } from "apollo-server"

export default gql`
  type User {
    id: ID!
    username: String!
    email: String!
    ava: String!
    firstname: String!
    lastname: String!
    phone: String
    status: String
    address: String
    bio: String
    birth: String
    typeUser: String!
    date: String!
  }
  type Message {
    id: ID!
    content: String!
    date: String!
    owner: User!
    chat: Chat!
  }
  type Chat {
    id: ID!
    title: String!
    channel: String!
    description: String!
    date: String!
    image: String!
    imageKey: String!
    owner: User
    owners: [User]!
    type: String!
    lastMessage: Message
  }
  # type UnreadMessage {
  #   id: ID!
  #   userId: User!
  #   messageId: Message!
  # }
  type UserChat {
    id: ID!
    userId: User!
    chatId: Chat!
  }
  type Auth {
    user: User
    token: String
  }
  type Searched {
    users: [User]!
    chats: [Chat]!
  }
  type ChatUserInfo {
    user: User
    chat: Chat
  }
  type Notification {
    id: ID!
    title: String!
    description: String
    date: String!
    type: String!
    chatId: Chat
    userId: User
    channel: String!
    active: Boolean!
  }
  type Query {
    login(email: String!, password: String!): Auth
    register(
      username: String!
      email: String!
      password: String!
      firstname: String
      lastname: String
      typeUser: String
    ): Auth
    userChats(userId: ID): [Chat]!
    chatMessages(chat: ID!): [Message]!
    searchChats(searchStr: String!): Searched
    searchMessages(searchStr: String!, chatId: String!): [Message]!
    getChatUserInfo(isChat: Boolean!, id: ID!): ChatUserInfo
    getNotifications: [Notification]!
    getChatUsers(chatId: ID!): [User]!
    getUnreadMessages: [Message]!
  }
  type Mutation {
    createChat(
      title: String!
      description: String
      image: Upload
      type: String!
    ): Chat!
    createMessage(content: String!, chat: ID!): Message!
    editChat(
      title: String!
      description: String
      image: Upload
      type: String!
      id: ID!
    ): Chat!
    createNotification(
      title: String!
      description: String
      type: String
      chatId: ID
      userId: ID
      channel: String!
    ): Notification!
    deleteUnreadMessages(messages: [ID!]!): String!
    deleteNotification(notifId: ID!): String!
    checkNotification(notifId: ID!): Notification!
    addUserAccess(chatId: ID, userId: ID!): [Chat]!
    removeUserAccess(chatId: ID!, userId: ID): [Chat]!
    setMessageRead(messageId: ID!): String!
  }
  type Subscription {
    newMessage(channels: [String]!): Message!
    newNotification(channels: [String]!): Notification!
  }
`
