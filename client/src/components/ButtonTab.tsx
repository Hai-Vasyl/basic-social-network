import React from "react"
// @ts-ignore
import styles from "../styles/buttontab.module"

interface ButtonTabProps {
  Icon: any
  click(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any
}

const ButtonTab: React.FC<ButtonTabProps> = ({ Icon, click }) => {
  return (
    <button className={styles.wrapper} onClick={click}>
      <Icon />
    </button>
  )
}

export default ButtonTab
