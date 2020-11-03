import { Schema, model } from "mongoose"

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  ava: {
    type: String,
    required: true,
    default:
      "https://dwpdobr8xeaso.cloudfront.net/wgvs-images/avatars/profile_llama@4x.png",
  },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phone: { type: String, default: "" },
  status: { type: String, default: "" },
  address: { type: String, default: "" },
  bio: { type: String, default: "" },
  birth: { type: Date, default: "" },
  typeUser: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
  date: { type: Date, required: true },
})

export default model("User", schema)
