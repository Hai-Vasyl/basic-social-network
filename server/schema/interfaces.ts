export interface IField {
  [key: string]: string
}

export interface IFieldsMod {
  [key: string]: { value: string, msg: string[] }
}

export interface IFieldSnippet { value: string, msg: string[] }

export interface ILengthSnippet { min: number, max: number, minMsg: string, maxMsg: string }

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
  username: IFieldModResult,
  email: IFieldModResult,
  password: IFieldModResult,
  firstname?: IFieldModResult,
  lastname?: IFieldModResult
  isError: boolean
}
