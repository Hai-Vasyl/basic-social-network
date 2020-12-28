import React from "react"
// @ts-ignore
import styles from "../styles/chatinfo.module"
import { IChatInfoProps } from "./ChatInfo"
import {
  BsLock,
  BsPeople,
  BsBell,
  BsPlusSquare,
  BsSlashSquare,
  BsPencilSquare,
} from "react-icons/bs"
import Button from "./Button"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import { convertDate } from "../helpers/convertDate"
import ButtonTab from "./ButtonTab"

export interface IChatInfoBasicProps {
  info: IChatInfoProps
  isNotified?: boolean
  handleConnect?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
  toggleFlipSettings?(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): any
}

const ChatInfoBasic: React.FC<IChatInfoBasicProps> = ({
  info,
  isNotified,
  handleConnect,
  toggleFlipSettings,
}) => {
  return (
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
        {handleConnect && (
          <div className={styles.info__btn}>
            {isNotified && info.type === "privet" ? (
              <div className={styles.info__warning}>
                Wait until the chat owner allows you to access
              </div>
            ) : (
              <Button
                title={
                  info.isConnect
                    ? info.type === "privet"
                      ? "Notify owner"
                      : "Connect"
                    : "Disconnect"
                }
                Icon={
                  info.isConnect
                    ? info.type === "privet"
                      ? BsBell
                      : BsPlusSquare
                    : BsSlashSquare
                }
                exClass={`${stylesBtn.btn_activated}`}
                click={handleConnect}
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.info__about}>
        <div className={styles.info__main}>
          <div className={styles.info__title}>
            <span>{info.title}</span>
            {toggleFlipSettings && (
              <ButtonTab click={toggleFlipSettings} Icon={BsPencilSquare} />
            )}
          </div>
          <p className={styles.info__subtitle}>
            Access:
            <span className={styles.info__subtitle_text}>{info.type}</span>
          </p>
        </div>

        <div className={styles.info__extended}>
          <div
            className={`${styles.info__field} ${styles.info__field_section}`}
          >
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
            <span className={styles.info__text}>{convertDate(info.date)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInfoBasic
