import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  title: { type: String, unique: true, required: true },
  channel: { type: String, unique: true, required: true },
  description: { type: String, default: "" },
  date: { type: Date, required: true },
  image: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/000/437/500/non_2x/vector-chat-icon.jpg",
  },
  owner: { type: Types.ObjectId, ref: "User" },
  owners: [{ type: Types.ObjectId, ref: "User", required: false }],
  type: {
    type: String,
    required: true,
    default: "public",
    enum: ["public", "privet", "individual"],
  },
})

export default model("Chat", schema)
