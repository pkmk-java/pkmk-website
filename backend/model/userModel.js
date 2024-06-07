import mongoose from "mongoose";
const { Schema } = mongoose;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "please provide username"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [emailRegex, "Please enter a valid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
  },
  avatar: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      cartId: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
      },
    },
  ],
  notification: [
    {
      notifId: {
        type: Schema.Types.ObjectId,
        ref: "Notif",
      },
    },
  ],
  order: [
    {
      orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    },
  ],
});

export const userModel = mongoose.model("User", userSchema);
