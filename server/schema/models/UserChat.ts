import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  chatId: { type: Types.ObjectId, ref: "Chat", required: true },
})

export default model("UserChat", schema)
