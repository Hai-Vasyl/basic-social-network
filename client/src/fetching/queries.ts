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
      }
      type
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
export const GET_CHAT_INFO = gql`
  query GET_CHAT_INFO($isChat: Boolean!, $id: String!) {
    getChatUserInfo(isChat: $isChat, id: $id) {
      user {
        id
        username
        email
        ava
        firstname
        lastname
        date
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
        }
        owners {
          id
          username
          email
          ava
        }
        type
      }
    }
  }
`
