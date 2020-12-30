import React from "react"
import { BsX } from "react-icons/bs"
import { convertDate } from "../helpers/convertDate"
// @ts-ignore
import styles from "../styles/toast.module"

interface IToastProps {
  click(event: React.MouseEvent<HTMLDivElement, MouseEvent>): any
  Icon?: any
  image: string
  title: string
  member?: string
  content: string
  date: string
}

const Toast: React.FC<IToastProps> = ({
  click,
  Icon,
  image,
  title,
  member,
  content,
  date,
}) => {
  return (
    <div onClick={click} className={styles.toast}>
      <div className={styles.toast__preview_image}>
        <img src={image} alt='img' className={styles.toast__image} />
        {Icon && (
          <div className={styles.toast__icon}>
            <Icon />
          </div>
        )}
      </div>
      <div className={styles.toast__info}>
        <div className={styles.toast__header}>
          <span className={styles.toast__title}>{title}</span>
          <button className={styles.toast__btn_close}>
            <BsX />
          </button>
        </div>
        <div className={styles.toast__body}>
          {member && <span className={styles.toast__member}>{member}:</span>}
          <span className={styles.toast__content}>{content}</span>
        </div>
        <div className={styles.toast__footer}>
          <span className={styles.toast__date}>{convertDate(date)}</span>
        </div>
      </div>
    </div>
  )
}

export default Toast
