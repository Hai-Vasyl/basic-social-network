import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  owner: { type: Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  path: { type: String, required: true },
  post: { type: Types.ObjectId, ref: "Post" },
  avatar: { type: Types.ObjectId, ref: "User" },
  chat: { type: Types.ObjectId, ref: "Chat" },
})

export default model("Uploads", schema)