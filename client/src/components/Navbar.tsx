import React from "react"
import { getLinks } from "../modules/routes"
import { RootStore } from "../redux/store"
import { NavLink } from "react-router-dom"
import { BsSearch } from "react-icons/bs"
import { AiOutlineLogout, AiOutlineCheckCircle } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import {
  DROPDOWN_TOGGLE,
  AUTHFORM_TOGGLE,
  RESET_TOGGLE,
} from "../redux/toggle/toggleTypes"
import "../styles/navbar.scss"

const Navbar: React.FC = () => {
  const {
    auth: { user, token },
    toggle: { dropDown, authForm },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const handleDropDown = () => {
    dispatch({ type: DROPDOWN_TOGGLE })
  }

  const links = getLinks(user.id)
  return (
    <div className='nav'>
      <div className='nav__menu'>
        <NavLink
          exact
          to='/'
          className='logoLink'
          onClick={() => dispatch({ type: RESET_TOGGLE })}>
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
              link.to === `/profile/${user.id}`) &&
            !token
          ) {
            return
          } else {
            if (link.to === `/profile/${user.id}`) {
              return (
                <div key={link.to} className='dropdown'>
                  <button
                    className={`dropdown__btn ${
                      dropDown && "dropdown__btn--active"
                    }`}
                    onClick={handleDropDown}>
                    <img
                      className='dropdown__ava'
                      src={user.ava}
                      alt='userAva'
                    />
                  </button>
                  <div
                    onClick={() => dispatch({ type: RESET_TOGGLE })}
                    className={`dropdown__menu ${
                      dropDown && "dropdown__menu--active"
                    }`}>
                    <span className='dropdown__triangle'></span>
                    <NavLink {...link}>
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
              <NavLink
                key={link.to}
                {...link}
                onClick={() => dispatch({ type: RESET_TOGGLE })}>
                <Title />
              </NavLink>
            )
          }
        })}
        {!token.length && (
          <button
            className={`link-signup ${authForm && "link-signup--active"}`}
            onClick={() => dispatch({ type: AUTHFORM_TOGGLE })}>
            <AiOutlineCheckCircle className='link-signup__icon' />
            <span className='link-signup__title'>Sign Up</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
