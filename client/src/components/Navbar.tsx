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
// @ts-ignore
import styles from "../styles/navbar.module"

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
    <div className={styles.nav}>
      <div className={styles.nav__menu}>
        <NavLink
          exact
          to='/'
          className={styles.logoLink}
          onClick={() => dispatch({ type: RESET_TOGGLE })}
        >
          <span className={styles.logoLink__logotype}>InWired</span>
        </NavLink>
        <form className={styles.search}>
          <input
            type='text'
            className={styles.search__input}
            placeholder='Search'
          />
          <button className={styles.search__btn}>
            <BsSearch className={styles.search__icon} />
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
                <div key={link.to} className={styles.dropdown}>
                  <button
                    className={`${styles.dropdown__btn} ${
                      dropDown && styles.dropdown__btn__active
                    }`}
                    onClick={handleDropDown}
                  >
                    <img
                      className={styles.dropdown__ava}
                      src={user.ava}
                      alt='userAva'
                    />
                  </button>
                  <div
                    onClick={() => dispatch({ type: RESET_TOGGLE })}
                    className={`${styles.dropdown__menu} ${
                      dropDown && styles.dropdown__menu__active
                    }`}
                  >
                    <span className={styles.dropdown__triangle}></span>
                    <NavLink {...link}>
                      <Title className={styles.link_extend__icon} />
                      <span className={styles.link_extend__title}>Profile</span>
                    </NavLink>
                    <button className={styles.link_extend}>
                      <AiOutlineLogout className={styles.link_extend__icon} />
                      <span className={styles.link_extend__title}>Log Out</span>
                    </button>
                  </div>
                </div>
              )
            }
            return (
              <NavLink
                key={link.to}
                {...link}
                onClick={() => dispatch({ type: RESET_TOGGLE })}
              >
                <Title />
              </NavLink>
            )
          }
        })}
        {!token.length && (
          <button
            className={`${styles.link_signup} ${
              authForm && styles.link_signup__active
            }`}
            onClick={() => dispatch({ type: AUTHFORM_TOGGLE })}
          >
            <AiOutlineCheckCircle className={styles.link_signup__icon} />
            <span className={styles.link_signup__title}>Sign Up</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
