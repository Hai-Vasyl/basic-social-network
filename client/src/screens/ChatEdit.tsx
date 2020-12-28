import React, { useState, useEffect } from "react"
import Field from "../components/Field"
import FieldFile from "../components/FieldFile"
import Button from "../components/Button"
// @ts-ignore
import stylesInfo from "../styles/chatinfo.module"
// @ts-ignore
import styles from "../styles/chat.module"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import { RiChatNewLine } from "react-icons/ri"
import { useMutation, useQuery } from "@apollo/client"
import { SET_CHATS, IChat } from "../redux/chats/chatsTypes"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import keyWords from "../modules/keyWords"
import { IOwner } from "../interfaces"
import FieldPicker from "../components/FieldPicker"
import {
  BsLock,
  BsPeople,
  BsUpload,
  BsCheck,
  BsPencilSquare,
  BsArrowLeft,
} from "react-icons/bs"
import { GET_CHAT_INFO, GET_CHAT_USERS } from "../fetching/queries"
import { EDIT_CHAT } from "../fetching/mutations"
import { convertDate } from "../helpers/convertDate"
import UserCard from "../components/UserCard"
import Loader from "../components/Loader"
import UserLinks from "../components/UserLinks"
import ButtonTab from "../components/ButtonTab"
import ChatInfoBasic from "../components/ChatInfoBasic"
import ChatModForm from "../components/ChatModForm"

const ChatEdit: React.FC = () => {
  const {
    chats,
    currentChat: { route },
  } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const { data: chatUsers, loading: loadChatUsers } = useQuery(GET_CHAT_USERS, {
    variables: { chatId: route.chatId },
  })
  const { data: chatInfo, loading } = useQuery(GET_CHAT_INFO, {
    variables: {
      id: route.chatId,
      isChat: true,
    },
  })
  const [form, setForm] = useState([
    {
      param: "title",
      type: "text",
      value: "",
      title: "Name",
      msg: "",
    },
    {
      param: "description",
      type: "text",
      value: "",
      title: "Description",
      msg: "",
    },
    { param: "image", type: "file", title: "Image", msg: "" },
    {
      param: "type",
      type: "text",
      value: "public",
      title: "Type",
      msg: "",
    },
  ])
  const options = [
    { value: "public", label: "Public" },
    { value: "privet", label: "Private" },
  ]
  const [chatImage, setChatImage] = useState<any>(null)
  const [editChat, editChatData] = useMutation(EDIT_CHAT)
  const [flipSettings, setFlipSettings] = useState(true)

  useEffect(() => {
    const chatDataFromInfo = chatInfo && chatInfo.getChatUserInfo.chat
    const chatDataFromUpdate = editChatData.data && editChatData.data.editChat
    if (chatDataFromUpdate || chatDataFromInfo) {
      setForm((prevForm) =>
        prevForm.map((field) => {
          let fieldInfo = field
          Object.keys(chatDataFromUpdate || chatDataFromInfo).forEach(
            (info) => {
              if (info === field.param && info !== "image") {
                if (chatDataFromUpdate) {
                  fieldInfo = { ...fieldInfo, value: chatDataFromUpdate[info] }
                } else {
                  fieldInfo = { ...fieldInfo, value: chatDataFromInfo[info] }
                }
              }
            }
          )
          return fieldInfo
        })
      )
    }
  }, [chatInfo])

  // useEffect(() => {
  //   if (createChatData.error) {
  //     console.log("Error: ", createChatData.error)
  //     const errors: IAuthErrors = JSON.parse(
  //       (createChatData.error && createChatData.error.message) || "{}"
  //     )
  //     setForm((prevForm) =>
  //       prevForm.map((field) => {
  //         let newField = { ...field, msg: "" }
  //         Object.keys(errors).forEach((key: string) => {
  //           if (key === field.param) {
  //             errors[key].msg &&
  //               errors[key].msg.forEach((msg) => {
  //                 newField.msg += ` ${msg}`
  //               })
  //             newField.msg = newField.msg.trim()
  //           }
  //         })
  //         return newField
  //       })
  //     )
  //   } else if (createChatData.data) {
  //     const data = createChatData.data && createChatData.data.createChat
  //     let newChat: IChat = {
  //       id: "",
  //       title: "",
  //       description: "",
  //       date: "",
  //       channel: "",
  //       image: "",
  //       type: "",
  //     }
  //     data.forEach((resChat: IChat) => {
  //       let isInclude = false
  //       chats.forEach((chat) => {
  //         if (chat.id === resChat.id) {
  //           isInclude = true
  //         }
  //       })
  //       if (!isInclude) {
  //         newChat = resChat
  //       }
  //     })
  //     dispatch({ type: SET_CHATS, payload: data })
  //     dispatch({
  //       type: SET_ACTIVE_CHAT,
  //       payload: { keyWord: keyWords.chatMessages, chatId: newChat.id },
  //     })
  //   }
  // }, [dispatch, createChatData.data, createChatData.error])

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

  // const handleSubmitForm = async () => {
  //   try {
  //     const [title, description, _, type] = form

  //     createChat({
  //       variables: {
  //         title: title.value,
  //         description: description.value,
  //         image: chatImage,
  //         type: type.value,
  //       },
  //     })
  //   } catch (error) {}
  // }

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

  const toggleFlipSettings = () => {
    setFlipSettings((prevFlip) => !prevFlip)
  }

  const info =
    (editChatData.data && editChatData.data.editChat) ||
    (chatInfo && chatInfo.getChatUserInfo.chat)

  const members =
    chatUsers &&
    info &&
    chatUsers.getChatUsers.filter((user: IOwner) => user.id !== info.owner.id)

  return (
    <div className={styles.chatWrapper}>
      {loading ? (
        <Loader />
      ) : flipSettings ? (
        <>
          <ChatInfoBasic info={info} toggleFlipSettings={toggleFlipSettings} />

          {loadChatUsers ? (
            <Loader />
          ) : (
            <UserLinks members={members} owner={info.owner} isLink />
          )}
        </>
      ) : (
        <>
          {/* <div>
            <div className={stylesInfo.btn_setting_close}>
              <ButtonTab click={toggleFlipSettings} Icon={BsArrowLeft} />
            </div>
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
            <div className={stylesBtn.btns}>
              <Button
                exClass={stylesBtn.btn_primary}
                // click={handleSubmitForm}
                click={() => {}}
                title='Create chat'
                Icon={RiChatNewLine}
              />
            </div>
          </div> */}
          <div>
            <ChatModForm
              toggleFlipSettings={toggleFlipSettings}
              handleChangeFieldFile={handleChangeFieldFile}
              handlePickOption={handlePickOption}
              form={form}
              chatImage={chatImage}
              options={options}
              handleChageField={handleChageField}
            />
            <div className={stylesBtn.btns}>
              <Button
                exClass={stylesBtn.btn_primary}
                // click={handleSubmitForm}
                click={() => {}}
                title='Create chat'
                Icon={RiChatNewLine}
              />
            </div>
          </div>
          {loadChatUsers ? (
            <Loader />
          ) : (
            <UserLinks members={members} owner={info.owner} isLink />
          )}
        </>
      )}
    </div>
  )
}

export default ChatEdit
