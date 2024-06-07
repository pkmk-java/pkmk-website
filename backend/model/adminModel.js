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
    unique: true,
  },
  password: {
    type: String,
    min: 6,
    required: [true, "please provide password"],
  },
  avatar: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
  createdProdcut: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
});

export const adminModel = mongoose.model("Admin", adminSchema);
