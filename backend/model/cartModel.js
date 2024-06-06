import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
  product: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: [true, "please provide total"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

export const cartModel = mongoose.model("Cart", cartSchema);
