import React from "react"
import { BiError } from "react-icons/bi"
// @ts-ignore
import styles from "../styles/field.module"

interface IFieldProps {
  field: {
    param: string
    type?: string
    value?: string
    title: string
    msg?: string
  }
  change: (event: React.ChangeEvent<HTMLInputElement>) => any
  exClass?: string
  transparent?: boolean
}

const Field: React.FC<IFieldProps> = ({
  field,
  change,
  exClass,
  transparent,
}) => {
  return (
    <label
      className={`${styles.field} ${
        transparent && styles.field_transparent
      } ${exClass}`}
    >
      <span className={styles.field__title}>{field.title}</span>
      <input
        className={styles.field__input}
        name={field.param}
        type={field.type ? field.type : "text"}
        value={field.value}
        onChange={change}
        autoComplete='off'
      />
      <span
        className={`${styles.field__msg} ${
          field.msg?.length && styles.field__msg__error
        }`}
      >
        <BiError className={styles.field__error} /> <span>{field.msg}</span>
      </span>
    </label>
  )
}

export default Field
