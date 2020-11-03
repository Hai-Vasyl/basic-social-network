import React from "react"
import { getLinks } from "../modules/routes"
import { useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import { NavLink } from "react-router-dom"
import { BsSearch } from "react-icons/bs"
import { AiOutlineLogout } from "react-icons/ai"
import "../styles/navbar.scss"

const Navbar: React.FC = () => {
  const {
    auth: { user, token },
  } = useSelector((state: RootStore) => state)
  console.log({ user })
  const links = getLinks(user.id)
  return (
    <div className='nav'>
      <div className='nav__menu'>
        <NavLink exact to='/' className='logoLink'>
          <span className='logoLink__logotype'>InWired</span>
        </NavLink>
        <form className='search'>
          <input type='text' className='search__input' placeholder='Search' />
          <button className='search__btn'>
            <BsSearch className='search__icon' />
          </button>
        </form>
        {links.map(({ Title, ...link }) => {
          if (
            (link.to === "/conversation" ||
              link.to === "/bookmarks" ||
              link.to === "/bookmarks" ||
              link.to === `/profile/${user.id}`) &&
            !token
          ) {
            return
          } else {
            if (link.to === `/profile/${user.id}`) {
              return (
                <div key={link.to} className='dropdown'>
                  <button className='dropdown__btn'>
                    <img
                      className='dropdown__ava'
                      src={user.ava}
                      alt='userAva'
                    />
                  </button>
                  <div className='dropdown__menu'>
                    <NavLink {...link} className='link-extend'>
                      <Title className='link-extend__icon' />
                      <span className='link-extend__title'>Profile</span>
                    </NavLink>
                    <button className='link-extend'>
                      <AiOutlineLogout className='link-extend__icon' />
                      <span className='link-extend__title'>Log Out</span>
                    </button>
                  </div>
                </div>
              )
            }
            return (
              <NavLink key={link.to} {...link}>
                <Title />
              </NavLink>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Navbar
