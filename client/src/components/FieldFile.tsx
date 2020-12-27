import React from "react"
// @ts-ignore
import styles from "../styles/field.module"
import { BiError } from "react-icons/bi"

interface IFieldFileProps {
  field: {
    title: string
    param: string
    msg: string
  }
  change(event: React.ChangeEvent<HTMLInputElement>): any
  file: any
  isImportant?: boolean
  Icon: any
}

const FieldFile: React.FC<IFieldFileProps> = ({
  field,
  change,
  file,
  isImportant,
  Icon
}) => {
  return (
    <div className={styles.field_file}>
      <div className={styles.field_file__fileWrapper}>
        <div className={styles.field_file__title}>
          <span
            className={`${styles.field__title} ${
              isImportant && styles.field__title__important
            }`}
          >
            {field.title}
          </span>
        </div>
        <label className={styles.field_file__label}>
          <Icon className={styles.field_file__upload_icon}/>
          <span>{file ? "File chosen" : "Choose file"}</span>
          <input
            className='btn-handler'
            name={field.param}
            type='file'
            onChange={change}
            autoComplete='off'
          />
        </label>
      </div>
      <span
        className={`${styles.field__msg} ${
          field.msg?.length && styles.field__msg__error
        }`}
      >
        <BiError className={styles.field__error} /> <span>{field.msg}</span>
      </span>
    </div>
  )
}

export default FieldFile
