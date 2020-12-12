import bcrypt from "bcrypt"
import { IFieldSnippet, ILengthSnippet } from "../interfaces"

function isEmpty(field: IFieldSnippet, msg: string) {
  if (!field.value.trim()) {
    field.msg.push(msg)
  }
  return field
}

function isEmail(field: IFieldSnippet, msg: string) {
  let patern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  if (!field.value.match(patern)) {
    field.msg.push(msg)
  }
  return field
}

async function isUnique(
  field: IFieldSnippet,
  msg: string,
  Model: any,
  prop: string
) {
  try {
    const collection = await Model.find({ [prop]: field.value })

    if (collection.length) {
      field.msg.push(msg)
    }

    return field
  } catch (error) {
    const errorMsg = `Error isUnique: ${error.message}`
    return { ...field, msg: [errorMsg] }
  }
}

function isLength(
  field: IFieldSnippet,
  { min, max, minMsg, maxMsg }: ILengthSnippet
) {
  if (field.value.length < min) {
    field.msg.push(minMsg)
  } else if (field.value.length > max) {
    field.msg.push(maxMsg)
  }
  return field
}

async function isContains(
  field: IFieldSnippet,
  msg: string,
  Model: any,
  prop: string
) {
  try {
    const instance = await Model.findOne({ [prop]: field.value })
    if (!instance) {
      field.msg.push(msg)
    }
    return { instance, field }
  } catch (error) {
    const errorMsg = `Error isContains: ${error.message}`
    return { field: { ...field, msg: [errorMsg] } }
  }
}

async function comparePassword(
  password: IFieldSnippet,
  hashedPassword: string,
  msg: string
) {
  try {
    const isValid = await bcrypt.compare(password.value, hashedPassword)
    if (!isValid) {
      password.msg.push(msg)
      return { passwordVerified: password, isSimilar: false }
    }
    return { passwordVerified: password, isSimilar: true }
  } catch (error) {
    const errorMsg = `Compare password error: ${error.message}`
    return {
      passwordVerified: { value: password.value, msg: [errorMsg] },
      isSimilar: false,
    }
  }
}

export { isEmpty, isEmail, isUnique, isContains, isLength, comparePassword }
