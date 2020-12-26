import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  title: { type: String, unique: true, required: true },
  channel: { type: String, unique: true, required: true },
  description: { type: String, default: "" },
  date: { type: Date, required: true },
  image: {
    type: String,
    default:
      "https://social-network--chat-user-bucket.s3-eu-west-1.amazonaws.com/social-network-chat-image.jpg",
  },
  imageKey: { type: String, default: "" },
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
