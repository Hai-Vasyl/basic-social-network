export interface IField {
  [key: string]: string
}

export interface IFieldsMod {
  [key: string]: { value: string; msg: string[] }
}

export interface IFieldSnippet {
  value: string
  msg: string[]
}

export interface ILengthSnippet {
  min: number
  max: number
  minMsg: string
  maxMsg: string
}

export interface IFieldModResult {
  msg: string[]
  value: string
}

export interface IValidLoginResult {
  email: IFieldModResult
  password: IFieldModResult
  instance?: {
    _id: string
  }
  isError: boolean
}

export interface IValidRegisterResult {
  username: IFieldModResult
  email: IFieldModResult
  password: IFieldModResult
  firstname?: IFieldModResult
  lastname?: IFieldModResult
  isError: boolean
}

export interface IIsAuth {
  auth: boolean
  userId?: string
}

export interface IUser {
  id: string
  username: string
  email: string
  ava: string
  firstname: string
  lastname: string
  phone?: string
  status?: string
  address?: string
  bio?: string
  birth?: string
  typeUser: string
  date: string
}

export interface IChat {
  id: string
  title: string
  channel: string
  description: string
  date: string
  image: string
  owner?: IUser
  owners?: IUser[]
  type: string
}
