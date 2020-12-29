export interface IAuthErrors {
  [key: string]: { value: string; msg: string[] }
}

export interface IRoute {
  path: string
  exact?: boolean
  Component: any
}

export interface ILink {
  to: string
  exact?: boolean
  Title: any
  className: string
  activeClassName: string
}

export interface IChatOwner {
  id: string
  ava: string
  username: string
}

// export interface IChatLink {
//   id: string
//   image: string
//   owner: {
//     id: string
//   }
//   title: string
//   type: string
// }

export interface IUserLink {
  id: string
  username: string
  email: string
  ava: string
}

export interface IUserSearch {
  id: string
  username: string
  email: string
  ava: string
}

export interface IChatSearch {
  id: string
  title: string
  image: string
  type: string
  owner: {
    id: string
  }
}

export interface ISearch {
  users: IUserSearch[]
  chats: IChatSearch[]
}

export interface IOwner {
  ava: string
  email: string
  id: string
  typeUser: string
  username: string
}

export interface IChatCard {
  id: string
  title: string
  type: string
  image: string
}

export interface IField {
  param: string
  type: string
  value?: string
  title: string
  msg: string
}

export interface IMessage {
  id: string
  content: string
  date: string
  owner: {
    id: string
    username: string
    ava: string
  }
  chat: {
    id: string
  }
}

export interface IMessageToast {
  id: string
  content: string
  date: string
  owner: {
    id: string
    username: string
    ava: string
    typeUser: string
  }
  chat: {
    id: string
    title: string
    type: string
    image: string
  }
}
