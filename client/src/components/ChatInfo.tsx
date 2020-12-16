import React from "react"
import { Link, useHistory } from "react-router-dom"
// @ts-ignore
import styles from "../styles/chatinfo.module"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import { RiUserSettingsLine } from "react-icons/ri"
import {
  BsPersonPlus,
  BsPerson,
  BsDashCircle,
  BsLock,
  BsPeople,
} from "react-icons/bs"
import Button from "./Button"
import { convertDate } from "../helpers/convertDate"

interface IChatInfoProps {
  date: string
  description: string
  id: string
  image: string
  title: string
  type: string
  owner: {
    ava: string
    email: string
    id: string
    typeUser: string
    username: string
  }
}

const ChatInfo: React.FC<IChatInfoProps> = (info) => {
  const history = useHistory()

  return (
    <>
      <div className={styles.info}>
        <div className={styles.info__preview}>
          <div className={styles.info__link}>
            <img
              className={styles.info__image}
              src={info.image}
              alt='chatImage'
            />
            {info.type == "privet" ? (
              <div className={styles.info__icon}>
                <BsLock />
              </div>
            ) : (
              <div className={styles.info__icon}>
                <BsPeople />
              </div>
            )}
          </div>
        </div>
        <div className={styles.info__about}>
          <div className={styles.info__main}>
            <div className={styles.info__title}>{info.title}</div>
            <p className={styles.info__subtitle}>Access: {info.type}</p>
          </div>

          <div className={styles.info__extended}>
            <div className={styles.info__field}>
              Description:
              <span className={styles.info__text}>
                {info.description ? (
                  info.description
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

      {/* <div className={styles.info__btns}>
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
      </div> */}
    </>
  )
}

export default ChatInfo
