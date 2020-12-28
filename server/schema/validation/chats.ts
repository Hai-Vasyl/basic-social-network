import { IField } from "../interfaces"
import { isEmpty, isLength, isUnique } from "./snippets"
import { Chat } from "../models"

export const createEditValid = async (fields: IField, id?: string) => {
  try {
    let { title, type } = fields

    title = { value: title, msg: [] }
    type = { value: type, msg: [] }
    title = isEmpty(title, "This field cannot be empty!")
    type = isEmpty(type, "This field cannot be empty!")
    if (title.msg.length || type.msg.length) {
      return { title, type, isError: true }
    }

    title = isLength(title, {
      min: 3,
      max: 15,
      minMsg: "Chat name must contain at least 3 characters!",
      maxMsg: "Chat name must be no more than 15 characters!",
    })
    if (title.msg.length) {
      return { title, type, isError: true }
    }

    title = await isUnique(
      title,
      "This chat name already exists, choose another one!",
      Chat,
      "title",
      id
    )
    if (title.msg.length) {
      return { title, type, isError: true }
    }
    return { title, type, isError: false }
  } catch (error) {
    const errorMsg = `Create or edit chat validation error: ${error.message}`

    const setError = (value: string) => {
      return { value, msg: [errorMsg] }
    }
    return {
      title: setError(fields.title),
      type: setError(fields.type),
      isError: true,
    }
  }
}
