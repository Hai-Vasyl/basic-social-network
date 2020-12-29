import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  messageId: { type: Types.ObjectId, ref: "Message", required: true },
})

export default model("UnreadMessage", schema)
