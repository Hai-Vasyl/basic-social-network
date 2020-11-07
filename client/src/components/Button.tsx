import React from "react"
import "../styles/button.scss"

interface IButtonProps {
  click(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void | undefined
  Icon: any
  title: string
  exClass: string
}

const Button: React.FC<IButtonProps> = ({ Icon, click, title, exClass }) => {
  return (
    <button className={`btn ${exClass}`} onClick={click}>
      <Icon className='btn__icon' />
      <span className='btn__title'>{title}</span>
    </button>
  )
}

export default Button
