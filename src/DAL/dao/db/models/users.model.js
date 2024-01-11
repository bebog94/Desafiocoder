import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isGithub: {
    type: Boolean,
    default: false,
  },
  cart:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Carts",
  },
  role:{
    type: String,
    default: "USER"
  }
});
export const usersModel = mongoose.model("Users", usersSchema);