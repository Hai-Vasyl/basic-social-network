import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  author: { type: Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  sticky: { type: Boolean, default: false },
  category: { type: Boolean, required: true, },
  tags: { type: Array, default: [] }
})

export default model("Post", schema)