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

export const NEW_NOTIFICATION = gql`
  subscription NEW_NOTIFICATION($channels: [String]!) {
    newNotification(channels: $channels) {
      id
      title
      description
      channel
      active
      date
      type
      userId {
        id
        username
        email
        typeUser
        ava
      }
      chatId {
        id
        title
        type
        image
      }
    }
  }
`
