import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    passWord: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
      unique: true,
    },
    refesh_token: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      unique: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
