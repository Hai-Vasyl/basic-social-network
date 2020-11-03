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
