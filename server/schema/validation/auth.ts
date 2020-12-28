import { User } from "../models"
import {
  IFieldsMod,
  IField,
  IValidRegisterResult,
  IValidLoginResult,
} from "../interfaces"
import {
  isEmpty,
  isEmail,
  isUnique,
  isContains,
  isLength,
  comparePassword,
} from "./snippets"

async function register(fields: IField): Promise<IValidRegisterResult> {
  try {
    let fieldsMod: IFieldsMod = {}
    let isError: boolean = false
    Object.keys(fields).forEach((key: string) => {
      let field = { value: fields[key], msg: [] }
      if (key === "firstname" || key === "lastname") {
        fieldsMod[key] = field
      } else {
        fieldsMod[key] = isEmpty(field, "This field cannot be empty!")
        if (fieldsMod[key].msg.length) {
          isError = true
        }
      }
    })

    let { username, email, password } = fieldsMod
    if (isError) {
      return { username, email, password, isError }
    }

    email = isEmail(email, "Email is not correct!")
    username = isLength(username, {
      min: 4,
      max: 15,
      minMsg: "Username must contain at least 4 characters!",
      maxMsg: "Username must be no more than 15 characters!",
    })
    password = isLength(password, {
      min: 4,
      max: 25,
      minMsg: "Password must contain at least 4 characters!",
      maxMsg: "Password must be no more than 25 characters!",
    })
    if (email.msg.length || username.msg.length || password.msg.length) {
      return { username, email, password, isError: true }
    }

    email = await isUnique(
      fieldsMod.email,
      "This email already exists, choose another one!",
      User,
      "email"
    )
    username = await isUnique(
      fieldsMod.username,
      "This username already exists, choose another one!",
      User,
      "username"
    )
    if (email.msg.length || username.msg.length) {
      return { username, email, password, isError: true }
    }

    return { username, email, password, isError: false }
  } catch (error) {
    const errorMsg = `Register validation error: ${error.message}`

    const setError = (value: string) => {
      return { value, msg: [errorMsg] }
    }
    return {
      username: setError(fields.username),
      email: setError(fields.email),
      password: setError(fields.password),
      isError: true,
    }
  }
}

async function login(fields: IField): Promise<IValidLoginResult> {
  try {
    let fieldsMod: IFieldsMod = {}
    let isError = false
    Object.keys(fields).forEach((key) => {
      fieldsMod[key] = isEmpty(
        { value: fields[key], msg: [] },
        "This field cannot be empty!"
      )
      if (fieldsMod[key].msg.length) {
        isError = true
      }
    })
    let { email, password } = fieldsMod
    if (isError) {
      return { email, password, isError }
    }

    email = isEmail(email, "Email is not correct!")
    password = isLength(password, {
      min: 4,
      max: 25,
      minMsg: "Password must contain at least 4 characters!",
      maxMsg: "Password must be no more than 25 characters!",
    })
    if (email.msg.length || password.msg.length) {
      return { email, password, isError: true }
    }

    const { instance, field: emailVerified } = await isContains(
      email,
      "This email is not exists, choose another one!",
      User,
      "email"
    )
    if (instance) {
      let { passwordVerified, isSimilar } = await comparePassword(
        password,
        instance.password,
        "Password is wrong, please try again!"
      )
      const resultVerification = {
        email: emailVerified,
        password: passwordVerified,
      }
      if (!isSimilar) {
        return { isError: true, ...resultVerification }
      }
      return { isError: false, ...resultVerification, instance }
    } else {
      return { email: emailVerified, password, isError: true }
    }
  } catch (error) {
    const errorMsg = `Login validation error: ${error.message}`

    const setError = (value: string) => {
      return { value, msg: [errorMsg] }
    }
    return {
      email: setError(fields.email),
      password: setError(fields.password),
      isError: true,
    }
  }
}

export const loginValid = login
export const registerValid = register
