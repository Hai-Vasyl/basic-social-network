import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  content: { type: String, required: true },
  date: { type: Date, required: true },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  chat: { type: Types.ObjectId, ref: "Chat", required: true },
})

export default model("Message", schema)
