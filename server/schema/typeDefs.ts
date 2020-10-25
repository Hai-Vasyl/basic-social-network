import { gql } from "apollo-server"

export default gql`
  type User {
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
  type Auth {
    user: User
    token: String
  }
  type Query {
    login( email: String!, password: String!): Auth
    register(
      username: String!, 
      email: String!, 
      password: String!, 
      firstname: String, 
      lastname: String 
    ): Auth
  }
`