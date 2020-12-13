import Home from "../pages/Home"
import Сonversation from "../pages/Сonversation"
import Profile from "../pages/Profile"
import Bookmarks from "../pages/Bookmarks"
import { BsBookmarks, BsHouse, BsChatDots, BsPerson } from "react-icons/bs"
import { ILink } from "../interfaces"
// @ts-ignore
import stylesNavbar from "../styles/navbar.module"

export const getLinks = (userId: string): ILink[] => {
  return [
    {
      to: "/",
      exact: true,
      Title: BsHouse,
      className: stylesNavbar.link,
      activeClassName: stylesNavbar.link__active,
    },
    {
      to: "/conversation",
      Title: BsChatDots,
      className: stylesNavbar.link,
      activeClassName: stylesNavbar.link__active,
    },
    {
      to: "/bookmarks",
      Title: BsBookmarks,
      className: stylesNavbar.link,
      activeClassName: stylesNavbar.link__active,
    },
    {
      to: `/profile/${userId}`,
      exact: true,
      Title: BsPerson,
      className: stylesNavbar.link_extend,
      activeClassName: stylesNavbar.link__active,
    },
  ]
}

export const routes = {
  admin: [
    { path: "/", exact: true, Component: Home },
    { path: "/conversation", Component: Сonversation },
    { path: "/bookmarks", Component: Bookmarks },
    { path: "/profile/:userId", exact: true, Component: Profile },
  ],
  user: [
    { path: "/", exact: true, Component: Home },
    { path: "/conversation", Component: Сonversation },
    { path: "/bookmarks", Component: Bookmarks },
    { path: "/profile/:userId", exact: true, Component: Profile },
  ],
  unregistered: [
    { path: "/", exact: true, Component: Home },
    { path: "/profile/:userId", exact: true, Component: Profile },
  ],
}
