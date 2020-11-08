import { gql } from "@apollo/client"

export const CREATE_MESSAGE = gql`
  mutation CREATE_MESSAGE($content: String!, $chat: ID!) {
    createMessage(content: $content, chat: $chat) {
      id
      content
      date
      owner {
        id
        username
        email
      }
      chat {
        id
      }
    }
  }
`
