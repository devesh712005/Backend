const mongoose = require("mongoose");
const { type } = require("node:os");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true, //any data came or not
      minlength: [3, "username must be at least 3 characters"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be 6 character"],
    },
    age: {
      type: Number,
      default: 18,
      min: [1, "age cannot be negative"],
    },
  },
  { timestamps: true }
);
const model = mongoose.model("User", userSchema); //table refer as User
module.exports = model;
