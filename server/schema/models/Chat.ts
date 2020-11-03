import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  title: { type: String, unique: true, required: true },
  channel: { type: String, unique: true, required: true },
  description: { type: String, default: "" },
  date: { type: Date, required: true },
  image: { type: String, default: "" },
  owner: { type: Types.ObjectId, ref: "User" },
  owners: [{ type: Types.ObjectId, ref: "User" }],
  type: {
    type: String,
    required: true,
    default: "public",
    enum: ["public", "privet", "individual"],
  },
})

export default model("Chat", schema)
