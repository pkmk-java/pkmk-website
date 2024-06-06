import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "please provie product name"],
  },
  description: {
    type: String,
    required: [true, "please provide description"],
  },
  price: {
    type: Number,
    required: [true, "please provide price"],
  },
  productImage: {
    type: String,
    required: [true, "please provide image"],
  },
  stock: {
    type: Number,
    default: 1,
  },
});

export const productModel = mongoose.model("Product", productSchema);
