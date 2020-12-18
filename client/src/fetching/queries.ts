import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
  query LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        username
        email
        ava
        firstname
        lastname
        phone
        status
        address
        bio
        birth
        typeUser
        date
      }
      token
    }
  }
`

export const REGISTER_USER = gql`
  query REGISTER_USER($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
        ava
        firstname
        lastname
        phone
        status
        address
        bio
        birth
        typeUser
        date
      }
      token
    }
  }
`

export const GET_USER_CHATS = gql`
  query GET_USER_CHATS {
    userChats {
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

export const GET_USER_NOTIFICATIONS = gql`
  query GET_USER_NOTIFICATIONS {
    getNotifications {
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

export const GET_CHAT_MESSAGES = gql`
  query GET_CHAT_MESSAGES($chat: ID!) {
    chatMessages(chat: $chat) {
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
      }
    }
  }
`
export const SEARCH_CHATS = gql`
  query SEARCH_CHATS($searchStr: String!) {
    searchChats(searchStr: $searchStr) {
      users {
        id
        username
        email
        ava
      }
      chats {
        id
        title
        image
        type
        owner {
          id
        }
      }
    }
  }
`
export const SEARCH_MESSAGES = gql`
  query SEARCH_MESSAGES($searchStr: String!, $chatId: String!) {
    searchMessages(searchStr: $searchStr, chatId: $chatId) {
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
      }
    }
  }
`
export const GET_CHAT_INFO = gql`
  query GET_CHAT_INFO($isChat: Boolean!, $id: ID!) {
    getChatUserInfo(isChat: $isChat, id: $id) {
      user {
        id
        username
        email
        ava
        firstname
        lastname
        date
        typeUser
      }
      chat {
        id
        title
        description
        date
        image
        owner {
          id
          username
          email
          ava
          typeUser
        }
        type
      }
    }
  }
`
