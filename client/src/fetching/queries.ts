import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
  query LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
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
  query REGISTER_USER(
    $username: String!
    $email: String!
    $password: String!
    $firstname: String
    $lastname: String
  ) {
    register(
      username: $username
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
    ) {
      user {
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
