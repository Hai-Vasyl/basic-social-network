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

export const ADD_USER_ACCESS = gql`
  mutation ADD_USER_ACCESS($chatId: ID, $userId: ID!) {
    addUserAccess(chatId: $chatId, userId: $userId) {
      id
      title
      channel
      description
      date
      image
      owner {
        id
      }
      owners {
        id
        username
        ava
        email
      }
      type
    }
  }
`

export const REMOVE_USER_ACCESS = gql`
  mutation REMOVE_USER_ACCESS($chatId: ID!, $userId: ID) {
    removeUserAccess(chatId: $chatId, userId: $userId) {
      id
      title
      channel
      description
      date
      image
      owner {
        id
      }
      owners {
        id
        username
        ava
        email
      }
      type
    }
  }
`
