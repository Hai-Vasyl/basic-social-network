import React, { useState, useEffect } from "react"
import Field from "../components/Field"
import FieldFile from "../components/FieldFile"
import Button from "../components/Button"
import { CREATE_CHAT } from "../fetching/mutations"
// @ts-ignore
import styles from "../styles/chat.module"
// @ts-ignore
import stylesBtn from "../styles/button.module"
// @ts-ignore
import stylesInfo from "../styles/chatinfo.module"
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
import ChatModForm from "../components/ChatModForm"
import LoaderData from "../components/LoaderData"

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
      const newChat = createChatData.data && createChatData.data.createChat
      dispatch({ type: SET_CHATS, payload: [...chats, newChat] })
      dispatch({
        type: SET_ACTIVE_CHAT,
        payload: { keyWord: keyWords.chatMessages, chatId: newChat.id },
      })
    }
  }, [dispatch, createChatData.data, createChatData.error])

  const handleChageField = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className='form-wrapper'>
        <LoaderData load={createChatData.loading} />
        <ChatModForm
          handleChangeFieldFile={handleChangeFieldFile}
          handlePickOption={handlePickOption}
          form={form}
          chatImage={chatImage}
          options={options}
          handleChageField={handleChageField}
        />
        <div className={stylesInfo.info__btns}>
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
