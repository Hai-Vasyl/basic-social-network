import typeDefs from "./typeDefs"
import { Query as QUsers } from "./resolvers/users"
import { Query as QChats, Mutation as MChats } from "./resolvers/chats"
import { Query as QMessages, Mutation as MMessages } from "./resolvers/messages"
import { Chat } from "./resolvers/chat"
import { Message } from "./resolvers/message"
import { UserChat } from "./resolvers/userchat"

const schema = {
  typeDefs,
  resolvers: {
    Query: {
      ...QUsers,
      ...QChats,
      ...QMessages,
    },
    Mutation: {
      ...MChats,
      ...MMessages,
    },
    Chat,
    Message,
    UserChat,
  },
}

export default schema
