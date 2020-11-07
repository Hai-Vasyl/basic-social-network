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
  query {
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
