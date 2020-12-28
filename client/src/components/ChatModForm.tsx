import React from "react"
import ButtonTab from "./ButtonTab"
// @ts-ignore
import styles from "../styles/chatinfo.module"
import {
  BsArrowLeft,
  BsPeople,
  BsLock,
  BsCheck,
  BsUpload,
} from "react-icons/bs"
import FieldFile from "./FieldFile"
import FieldPicker from "./FieldPicker"
import Field from "./Field"
import { IField } from "../interfaces"

interface IChatModFormProps {
  toggleFlipSettings?(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): any
  handleChangeFieldFile(event: React.ChangeEvent<HTMLInputElement>): any
  handlePickOption(value: string): any
  form: IField[]
  chatImage: any
  options: { value: string; label: string }[]
  handleChageField(event: React.ChangeEvent<HTMLInputElement>): any
}

const ChatModForm: React.FC<IChatModFormProps> = ({
  toggleFlipSettings,
  form,
  handleChangeFieldFile,
  chatImage,
  handlePickOption,
  options,
  handleChageField,
}) => {
  return (
    <>
      {toggleFlipSettings && (
        <div className={styles.btn_setting_close}>
          <ButtonTab click={toggleFlipSettings} Icon={BsArrowLeft} />
        </div>
      )}
      {form.map((field) => {
        if (field.type === "file") {
          return (
            <FieldFile
              key={field.param}
              field={field}
              change={handleChangeFieldFile}
              file={chatImage}
              Icon={chatImage ? BsCheck : BsUpload}
            />
          )
        } else if (field.param === "type") {
          return (
            <FieldPicker
              key={field.param}
              Icon={field.value === "public" ? BsPeople : BsLock}
              change={handlePickOption}
              field={field}
              options={options}
            />
          )
        }
        return (
          <Field
            key={field.param}
            isImportant={field.param === "title"}
            field={{ ...field }}
            change={handleChageField}
            transparent
          />
        )
      })}
    </>
  )
}

export default ChatModForm
