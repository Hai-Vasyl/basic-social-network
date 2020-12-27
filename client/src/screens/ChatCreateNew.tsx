import React, { useState, useEffect } from "react"
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
import { SET_CHATS, IChat } from "../redux/chats/chatsTypes"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import keyWords from "../modules/keyWords"
import { IAuthErrors } from "../interfaces"
import FieldPicker from "../components/FieldPicker"
import { BsLock, BsPeople, BsUpload, BsCheck } from "react-icons/bs"

const ChatCreateNew: React.FC = () => {
  const { chats } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const [form, setForm] = useState([
    { param: "title", type: "text", value: "", title: "Name", msg: "" },
    {
      param: "description",
      type: "text",
      value: "",
      title: "Description",
      msg: "",
    },
    { param: "image", type: "file", title: "Image", msg: "" },
    { param: "type", type: "text", value: "public", title: "Type", msg: "" },
  ])
  const options = [
    { value: "public", label: "Public" },
    { value: "privet", label: "Private" },
  ]
  const [chatImage, setChatImage] = useState<any>(null)
  const [createChat, createChatData] = useMutation(CREATE_CHAT)

  useEffect(() => {
    if (createChatData.error) {
      console.log("Error: ", createChatData.error)
      const errors: IAuthErrors = JSON.parse(
        (createChatData.error && createChatData.error.message) || "{}"
      )
      setForm((prevForm) =>
        prevForm.map((field) => {
          let newField = { ...field, msg: "" }
          Object.keys(errors).forEach((key: string) => {
            if (key === field.param) {
              errors[key].msg &&
                errors[key].msg.forEach((msg) => {
                  newField.msg += ` ${msg}`
                })
              newField.msg = newField.msg.trim()
            }
          })
          return newField
        })
      )
    } else if (createChatData.data) {
      const data = createChatData.data && createChatData.data.createChat
      let newChat: IChat = {
        id: "",
        title: "",
        description: "",
        date: "",
        channel: "",
        image: "",
        type: "",
      }
      data.forEach((resChat: IChat) => {
        let isInclude = false
        chats.forEach((chat) => {
          if (chat.id === resChat.id) {
            isInclude = true
          }
        })
        if (!isInclude) {
          newChat = resChat
        }
      })
      dispatch({ type: SET_CHATS, payload: data })
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: { keyWord: keyWords.chatMessages, chatId: newChat.id },
      })
    }
  }, [dispatch, createChatData.data, createChatData.error])

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

  const handleSubmitForm = async () => {
    try {
      const [title, description, _, type] = form

      createChat({
        variables: {
          title: title.value,
          description: description.value,
          image: chatImage,
          type: type.value,
        },
      })
    } catch (error) {}
  }

  const handlePickOption = (value: string) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (field.param === "type") {
          return { ...field, value, msg: "" }
        }
        return field
      })
    )
  }

  return (
    <div className={styles.chatWrapper}>
      <div>
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
              change={handleChageFile}
              transparent
            />
          )
        })}
        <div className={stylesBtn.btns}>
          <Button
            exClass={stylesBtn.btn_primary}
            click={handleSubmitForm}
            title='Create chat'
            Icon={RiChatNewLine}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatCreateNew
