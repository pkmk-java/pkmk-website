import { cartModel } from "../model/cartModel.js";
import { productModel } from "../model/productModel.js";

const getAllProductGuest = async (req, res) => {
  try {
    const product = await productModel.find({});

    return res.status(200).json({ msg: "success", product });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  const { id: productId } = req.params;
  const { quantity } = req.body;
  const session = req.session;
  console.log(session);

  if (!req.session.cart) {
    req.session.cart = {
      items: [],
    };
  }

  try {
    const isProductExist = await productModel.findOne({ _id: productId });

    if (!isProductExist) {
      return res
        .status(404)
        .json({ msg: "product not found, please fill valid product" });
    }

    const itemIndex = await req.session.cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex > -1) {
      req.session.cart.items[itemIndex].quantity += quantity;
    } else {
      req.session.cart.items.push({ productId, quantity });
    }

    return res
      .status(200)
      .json({ msg: "product added to cart", cart: req.session.cart });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "Internal Server Error" });
  }
};

const GuestRemoveItemFromCart = async (req, res) => {
  const { id: productId } = req.params;
  const { quantity } = req.body;

  console.log("Received productId:", productId);
  console.log("Received quantity:", quantity);

  if (quantity <= 0) {
    return res.status(400).json({ msg: "Quantity must be greater than 0" });
  }

  try {
    if (!req.session.cart) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    const itemIndex = req.session.cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      return res.status(400).json({ msg: "Product not found in cart" });
    } else {
      req.session.cart.items[itemIndex].quantity -= quantity;

      if (req.session.cart.items[itemIndex].quantity <= 0) {
        // Remove item from cart if quantity is less than or equal to 0
        req.session.cart.items.splice(itemIndex, 1);
      }

      return res
        .status(200)
        .json({ msg: "Item removed from cart", cart: req.session.cart });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getGuestCart = async (req, res) => {
  try {
    if (!req.session.cart) {
      return res.status(200).json({ msg: "cart is empty", cart: [] });
    }

    const sessionCart = req.session.cart;

    return res.status(200).json({ msg: "success get guest cart", sessionCart });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "Internal Server Error" });
  }
};

export { getAllProductGuest, addToCart, getGuestCart, GuestRemoveItemFromCart };
