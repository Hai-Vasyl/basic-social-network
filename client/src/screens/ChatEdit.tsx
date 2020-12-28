import React, { useState, useEffect, useCallback } from "react"
import Button from "../components/Button"
// @ts-ignore
import stylesInfo from "../styles/chatinfo.module"
// @ts-ignore
import styles from "../styles/chat.module"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import { RiChatDeleteLine } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"
import { useMutation, useQuery } from "@apollo/client"
import { SET_CHATS, IChat } from "../redux/chats/chatsTypes"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "../redux/store"
import { SET_ACTIVE_CHAT } from "../redux/chatActive/chatActiveTypes"
import { IOwner, IAuthErrors } from "../interfaces"
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
import LoaderData from "../components/LoaderData"
import keyWords from "../modules/keyWords"

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
  const [flipSettings, setFlipSettings] = useState(false)

  const resetForm = useCallback(() => {
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
  }, [chatInfo, editChatData.data])

  useEffect(() => {
    // const chatDataFromInfo = chatInfo && chatInfo.getChatUserInfo.chat
    // const chatDataFromUpdate = editChatData.data && editChatData.data.editChat
    // if (chatDataFromUpdate || chatDataFromInfo) {
    //   setForm((prevForm) =>
    //     prevForm.map((field) => {
    //       let fieldInfo = field
    //       Object.keys(chatDataFromUpdate || chatDataFromInfo).forEach(
    //         (info) => {
    //           if (info === field.param && info !== "image") {
    //             if (chatDataFromUpdate) {
    //               fieldInfo = { ...fieldInfo, value: chatDataFromUpdate[info] }
    //             } else {
    //               fieldInfo = { ...fieldInfo, value: chatDataFromInfo[info] }
    //             }
    //           }
    //         }
    //       )
    //       return fieldInfo
    //     })
    //   )
    // }
    resetForm()
  }, [resetForm])

  useEffect(() => {
    if (editChatData.error) {
      console.log("Error: ", editChatData.error)
      const errors: IAuthErrors = JSON.parse(
        (editChatData.error && editChatData.error.message) || "{}"
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
    } else if (editChatData.data) {
      const newChat = editChatData.data && editChatData.data.editChat
      console.log("New modified Chat: ", newChat)
      dispatch({
        type: SET_CHATS,
        payload: [...chats].map((chat) => {
          if (chat.id === newChat.id) {
            return newChat
          }
          return chat
        }),
      })
      setFlipSettings(false)
    }
  }, [dispatch, editChatData.data, editChatData.error])

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

      editChat({
        variables: {
          title: title.value,
          description: description.value,
          image: chatImage,
          type: type.value,
          id: route.chatId,
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

  const toggleFlipSettings = () => {
    setFlipSettings((prevFlip) => !prevFlip)
    resetForm()
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
      ) : !flipSettings ? (
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
          <div className='form-wrapper'>
            <LoaderData load={editChatData.loading} />
            <ChatModForm
              toggleFlipSettings={toggleFlipSettings}
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
                // click={() => {}}
                title='Apply editing'
                Icon={AiOutlineEdit}
              />
              <Button
                exClass={stylesBtn.btn_simple}
                // click={handleSubmitForm}
                click={() => {}}
                title='Delete chat'
                Icon={RiChatDeleteLine}
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
