import React from "react"
// @ts-ignore
import styles from "../styles/button.module"

interface IButtonProps {
  click(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
  Icon: any
  title: string
  exClass?: string
}

const Button: React.FC<IButtonProps> = ({ Icon, click, title, exClass }) => {
  return (
    <button className={`${styles.btn} ${exClass}`} onClick={click}>
      <Icon className={styles.btn__icon} />
      <span className={styles.btn__title}>{title}</span>
    </button>
  )
}

export default Button
