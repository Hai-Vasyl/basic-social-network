import React, { useState } from "react"
// @ts-ignore
import styles from "../styles/field.module"
import { BiError } from "react-icons/bi"
import { BsCaretDownFill } from "react-icons/bs"

interface IFieldPickerProps {
  field: {
    title: string
    param: string
    msg: string
    value?: string
  }
  options: {
    value: string
    label: string
  }[]
  change(value: string): any
  Icon: any
  isImportant?: boolean
}

const FieldPicker: React.FC<IFieldPickerProps> = ({
  change,
  field,
  options,
  Icon,
  isImportant,
}) => {
  const [toggleDrop, setToggleDrop] = useState(false)

  const getLabelOption = (value: string) => {
    let label = ""
    options.forEach((option) => {
      if (option.value === value) {
        label = option.label
      }
    })
    return label
  }

  const handlePickOption = (value: string) => {
    change(value)
    setToggleDrop(false)
  }

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
        <div className={styles.field_picker}>
          <button
            className={styles.field_picker__button}
            onClick={() => setToggleDrop((prevDrop) => !prevDrop)}
          >
            <Icon className={styles.field_file__upload_icon} />
            <span>{getLabelOption(field.value || "")}</span>
            <BsCaretDownFill
              className={`${styles.field_picker__triangle} ${
                !toggleDrop && styles.field_picker__triangle__rotate
              }`}
            />
          </button>
          <div
            className={`${styles.field_picker__select} ${
              toggleDrop && styles.field_picker__select__open
            }`}
          >
            {options.map((option) => {
              return (
                <button
                  key={option.value}
                  className={`${styles.field_picker__option} ${
                    option.value === field.value &&
                    styles.field_picker__option__active
                  }`}
                  onClick={() => handlePickOption(option.value)}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
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

export default FieldPicker
