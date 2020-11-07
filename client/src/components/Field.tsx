import React from "react"
import { BiError } from "react-icons/bi"
import "../styles/field.scss"

interface IFieldProps {
  field: {
    param: string
    type?: string
    value: string
    title: string
    msg?: string
  }
  change: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined
  exClass: string
}

const Field: React.FC<IFieldProps> = ({ field, change, exClass }) => {
  return (
    <label className={`field ${exClass}`}>
      <span className='field__title'>{field.title}</span>
      <input
        className='field__input'
        name={field.param}
        type={field.type ? field.type : "text"}
        value={field.value}
        onChange={change}
        autoComplete='off'
      />
      <span
        className={`field__msg ${field.msg?.length && "field__msg--error"}`}>
        <BiError className='field__error' /> <span>{field.msg}</span>
      </span>
    </label>
  )
}

export default Field
