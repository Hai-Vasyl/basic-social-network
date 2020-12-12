import { User } from "../models"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { config } from "dotenv"
import { AuthenticationError } from "apollo-server"
import { registerValid, loginValid } from "../validation/auth"
import { IField, IIsAuth } from "../interfaces"
config()
const { JWT_SECRET }: any = process.env

export const Query = {
  async register(_: any, args: IField) {
    try {
      const validatedFields = await registerValid(args)
      if (validatedFields.isError) {
        throw new Error(JSON.stringify(validatedFields))
      }

      const { username, email, password, firstname, lastname } = validatedFields

      const hashedPassword = await bcrypt.hash(password.value, 12)

      const user = new User({
        username: username.value,
        email: email.value,
        firstname: firstname?.value,
        lastname: lastname?.value,
        password: hashedPassword,
        typeUser: args.typeUser,
        date: new Date(),
      })
      const newUser = await user.save()

      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET)

      return { user: newUser, token }
    } catch (error) {
      throw new AuthenticationError(error.message)
    }
  },
  async login(_: any, args: IField) {
    try {
      const validatedFields = await loginValid(args)
      if (validatedFields.isError) {
        throw new Error(JSON.stringify(validatedFields))
      }

      const { instance: user } = validatedFields
      const token = jwt.sign({ userId: user?._id }, JWT_SECRET)

      return { user, token }
    } catch (error) {
      throw new AuthenticationError(error.message)
    }
  },
}
