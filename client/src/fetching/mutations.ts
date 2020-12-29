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

export const CREATE_CHAT = gql`
  mutation CREATE_CHAT(
    $title: String!
    $description: String
    $image: Upload
    $type: String!
  ) {
    createChat(
      title: $title
      description: $description
      image: $image
      type: $type
    ) {
      id
      title
      channel
      description
      date
      image
      owner {
        id
        username
        ava
        email
        typeUser
      }
      type
    }
  }
`

export const EDIT_CHAT = gql`
  mutation EDIT_CHAT(
    $title: String!
    $description: String
    $image: Upload
    $type: String!
    $id: ID!
  ) {
    editChat(
      title: $title
      description: $description
      image: $image
      type: $type
      id: $id
    ) {
      id
      title
      channel
      description
      date
      image
      owner {
        id
        username
        ava
        email
        typeUser
      }
      type
    }
  }
`

export const CREATE_NOTIFICATION = gql`
  mutation CREATE_NOTIFICATION(
    $title: String!
    $description: String
    $type: String
    $chatId: ID
    $userId: ID
    $channel: String!
  ) {
    createNotification(
      title: $title
      description: $description
      type: $type
      chatId: $chatId
      userId: $userId
      channel: $channel
    ) {
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

export const DELETE_NOTIFICATION = gql`
  mutation DELETE_NOTIFICATION($notifId: ID!) {
    deleteNotification(notifId: $notifId)
  }
`

export const CHECK_NOTIFICATION = gql`
  mutation CHECK_NOTIFICATION($notifId: ID!) {
    checkNotification(notifId: $notifId) {
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

export const SET_MESSAGE_TO_UNREAD = gql`
  mutation SET_MESSAGE_TO_UNREAD($messageId: ID!) {
    setUnreadMessage(messageId: $messageId)
  }
`
