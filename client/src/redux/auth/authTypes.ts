export const SET_AUTH = "SET_AUTH"

export type User = {
  id: string
  username: string
  email: string
  ava: string
  firstname: string
  lastname: string
  phone: string
  status: string
  address: string
  bio: string
  birth: string
  typeUser: string
  date: string
}

export type Auth = {
  user: User
  token: string
}

export interface SetAuth {
  type: typeof SET_AUTH
  payload: { auth: Auth; init: boolean }
}

export type AuthReducerTypes = SetAuth
