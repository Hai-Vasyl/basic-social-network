import { gql } from "@apollo/client"

export const NEW_MESSAGE = gql`
  subscription NEW_MESSAGE($channels: [String]!) {
    newMessage(channels: $channels) {
      id
      content
      date
      owner {
        id
        username
        ava
      }
      chat {
        id
        title
        type
        image
      }
    }
  }
`
