import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  channel: { type: String, required: true },
  active: { type: Boolean, required: true, default: false },
  date: { type: Date, required: true },
  type: { type: String, required: true, enum: ["access"], default: "access" },
  chatId: { type: Types.ObjectId, ref: "Chat" },
  userId: { type: Types.ObjectId, ref: "User" },
})

export default model("Notification", schema)
