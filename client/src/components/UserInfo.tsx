import React from "react"
import { Link, useHistory } from "react-router-dom"
// @ts-ignore
import styles from "../styles/chatinfo.module"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import { RiUserSettingsLine } from "react-icons/ri"
import { BsPersonPlus, BsPerson, BsDashCircle } from "react-icons/bs"
import Button from "./Button"
import { convertDate } from "../helpers/convertDate"

interface IUserInfoProps {
  ava: string
  date: string
  email: string
  firstname: string
  lastname: string
  id: string
  username: string
  typeUser: string
}

const UserInfo: React.FC<IUserInfoProps> = (info) => {
  const history = useHistory()

  return (
    <>
      <div className={styles.info}>
        <div className={styles.info__preview}>
          <Link className={styles.info__link} to={`/profile/${info.id}`}>
            <img
              className={styles.info__image}
              src={info.ava}
              alt='userImage'
            />
            {info.typeUser == "admin" && (
              <div className={styles.info__icon}>
                <RiUserSettingsLine />
              </div>
            )}
          </Link>
        </div>
        <div className={styles.info__about}>
          <div className={styles.info__main}>
            <Link className={styles.info__title} to={`/profile/${info.id}`}>
              {info.username}
            </Link>
            <p className={styles.info__subtitle}>{info.email}</p>
          </div>

          <div className={styles.info__extended}>
            <div className={styles.info__field}>
              Firstname:
              <span className={styles.info__text}>
                {info.firstname ? (
                  info.firstname
                ) : (
                  <span className={styles.info__plug}>empty</span>
                )}
              </span>
            </div>
            <div className={styles.info__field}>
              Lastname:
              <span className={styles.info__text}>
                {info.lastname ? (
                  info.lastname
                ) : (
                  <span className={styles.info__plug}>empty</span>
                )}
              </span>
            </div>
            <div className={`${styles.info__field} ${styles.info__field_date}`}>
              Last updated:
              <span className={styles.info__text}>
                {convertDate(info.date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.info__btns}>
        <Button
          Icon={BsPersonPlus}
          title='Follow'
          exClass={stylesBtn.btn_primary}
          click={() => {}}
        />
        <Button
          Icon={BsPerson}
          title='Profile'
          exClass={stylesBtn.btn_simple}
          click={() => history.push(`/profile/${info.id}`)}
        />
        <Button
          Icon={BsDashCircle}
          title='Unsubscribe'
          exClass={`${stylesBtn.btn_activated} ${styles.info__btn_unsubscribe}`}
          click={() => {}}
        />
      </div>
    </>
  )
}

export default UserInfo
