import typeDefs from "./typeDefs"
import { Query as QUsers } from "./resolvers/users"

const schema = {
  typeDefs,
  resolvers: {
    Query: {
      ...QUsers
    }
  }
}

export default schema