import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()
const { JWT_SECRET }: any = process.env

const isAuth = (req: { headers: { authorization: any } }) => {
  const auth = req && req.headers && req.headers.authorization
  const authDenied = { auth: false }
  if (!auth) {
    return authDenied
  }

  const token = auth.split(" ")[1]
  if (!token) {
    return authDenied
  }

  let decodedToken: string
  try {
    const { userId }: any = jwt.verify(token, JWT_SECRET)
    decodedToken = userId
  } catch (error) {
    return authDenied
  }
  if (!decodedToken) {
    return authDenied
  }

  return { auth: true, userId: decodedToken }
}

export default isAuth
