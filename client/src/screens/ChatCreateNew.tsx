import React, { useState } from "react"
import Field from "../components/Field"
import FieldFile from "../components/FieldFile"
import Button from "../components/Button"
import { CREATE_CHAT } from "../fetching/mutations"
// @ts-ignore
import styles from "../styles/chat.module"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import { RiChatNewLine } from "react-icons/ri"
import { useMutation } from "@apollo/client"

const ChatCreateNew: React.FC = () => {
  const [form, setForm] = useState([
    { param: "title", type: "text", value: "", title: "Title", msg: "" },
    {
      param: "description",
      type: "text",
      value: "",
      title: "Description",
      msg: "",
    },
    { param: "image", type: "file", title: "Image", msg: "" },
    { param: "type", type: "text", value: "", title: "Type", msg: "" },
  ])
  const [chatImage, setChatImage] = useState<any>(null)
  const [createChat, createChatData] = useMutation(CREATE_CHAT)

  const handleChageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (event.target.name === field.param) {
          return { ...field, msg: "", value: event.target.value }
        }
        return field
      })
    )
  }

  const handleChangeFieldFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setChatImage(event.target.files[0])
    }
  }
  console.log("Chat Image: ", chatImage)

  const handleSubmitForm = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      event.preventDefault()

      const [title, description, _, type] = form

      createChat({
        variables: {
          title: title.value,
          description: description.value,
          image: chatImage,
          type: type.value,
        },
      })
      console.log("Created chat")
    } catch (error) {}
  }

  return (
    <div className={styles.chatWrapper}>
      <form onSubmit={handleSubmitForm}>
        {form.map((field) => {
          if (field.type === "file") {
            return (
              <FieldFile
                key={field.param}
                field={field}
                change={handleChangeFieldFile}
                file={chatImage}
              />
            )
          }
          return (
            <Field
              key={field.param}
              field={{ ...field }}
              change={handleChageFile}
              transparent
            />
          )
        })}
        <Button
          exClass={stylesBtn.btn_primary}
          click={handleSubmitForm}
          title='Create chat'
          Icon={RiChatNewLine}
        />
      </form>
    </div>
  )
}

export default ChatCreateNew
