import typeDefs from "./typeDefs"
import { Query as QUsers } from "./resolvers/users"
import { Query as QChats, Mutation as MChats } from "./resolvers/chats"
import {
  Query as QMessages,
  Mutation as MMessages,
  Subscription as SMessages,
} from "./resolvers/messages"
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
    Subscription: {
      ...SMessages,
    },
    Chat,
    Message,
    UserChat,
  },
}

export default schema
