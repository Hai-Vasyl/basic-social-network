import Home from "../pages/Home"
import Сonversation from "../pages/Сonversation"
import Profile from "../pages/Profile"
import Bookmarks from "../pages/Bookmarks"
import { BsBookmarks, BsHouse, BsChatDots, BsPerson } from "react-icons/bs"
import { ILink } from "../interfaces"

export const getLinks = (userId: string): ILink[] => {
  return [
    {
      to: "/",
      exact: true,
      Title: BsHouse,
      className: "link",
      activeClassName: "link--active",
    },
    {
      to: "/conversation",
      Title: BsChatDots,
      className: "link",
      activeClassName: "link--active",
    },
    {
      to: "/bookmarks",
      exact: true,
      Title: BsBookmarks,
      className: "link",
      activeClassName: "link--active",
    },
    {
      to: `/profile/${userId}`,
      exact: true,
      Title: BsPerson,
      className: "link",
      activeClassName: "link--active",
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
