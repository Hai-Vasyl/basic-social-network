import { Schema, model } from "mongoose"

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  ava: {
    type: String,
    required: true,
    default: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
  },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phone: { type: String, default: "" },
  status: { type: String, default: "" },
  address: { type: String, default: "" },
  bio: { type: String, default: "" },
  birth: { type: Date, default: "" },
  typeUser: { type: String, required: true, default: "user" },
  date: { type: Date, required: true },
})

export default model("User", schema)