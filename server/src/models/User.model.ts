import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: mongoose.Types.ObjectId,
    ref: "note",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
