import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema({
  username: {
    type: String,
    required: [true, "please provide username"],
  },
  email: {
    type: String,
    required: [true, "please provide email"],
  },
});
