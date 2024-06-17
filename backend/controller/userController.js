import {} from "cloudinary";
import { userModel } from "../model/userModel.js";
import { hashPasswordHandler } from "../helper/hashPassword.js";
import { passwordCompareHandler } from "../helper/passwordCompare.js";
import { jwtGeneratorHandler } from "../helper/jwtGenerator.js";
import { productModel } from "../model/productModel.js";
import { cartModel } from "../model/cartModel.js";
import { adminModel } from "../model/adminModel.js";

const getCurrentUser = async (req, res) => {
  const userId = req.user.userId;
  console.log(userId);

  try {
    const user = await userModel.findOne({ _id: userId });

    return res.status(200).json({ msg: "success", user });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const requiredField = ["username", "email", "password"];

  for (const field of requiredField) {
    if (!req.body[field]) {
      return res.status(401).json({ msg: `please fill ${field} field` });
    }
  }

  try {
    const isUserExist = await userModel.findOne({ email: email });

    if (isUserExist) {
      return res.status(401).json({ msg: "email already used" });
    }

    const securePassword = await hashPasswordHandler(password);
    console.log(securePassword);

    const userBlueprint = new userModel({
      username: username,
      email: email,
      password: securePassword,
    });

    const newUser = await userModel.create(userBlueprint);

    return res.status(200).json({ msg: "success register user", newUser });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await userModel
      .findOne({ email: email })
      .select(["username", "password", "email", "isAdmin"]);

    if (!isUserExist) {
      return res.status(404).json({ msg: "email not registered yet" });
    }

    const isPassCorrect = passwordCompareHandler({
      userPass: password,
      dataPass: isUserExist.password,
    });
    console.log(isPassCorrect);

    if (!isPassCorrect) {
      return res.status(401).json({ msg: "password wrong" });
    }

    const token = jwtGeneratorHandler({
      _id: isUserExist._id.toString(),
      email: isUserExist.email,
    });

    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 900000),
      })
      .json({
        msg: "success login user",
        isUserExist,
        isAdmin: isUserExist.isAdmin,
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await productModel.find({});

    return res.status(200).json({ msg: "success", product });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const addProductToCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(401).json({ msg: "please add at least one product" });
  }

  try {
    const existingUser = await userModel.findOne({ email: req.user.email });
    const product = await productModel.findOne({ _id: id });

    const totalCart = product.price * quantity;
    console.log(totalCart);

    const cartBluerprint = new cartModel({
      product: [
        {
          productId: id,
          quantity: quantity,
        },
      ],
      createdBy: existingUser._id,
      total: totalCart,
    });

    const cart = await cartModel.create(cartBluerprint);
    existingUser.cart.push({ cartId: cart._id });

    await existingUser.save();

    return res.status(200).json({ msg: "success add item to cart", cart });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const deleteProductFromCart = async (req, res) => {
  const { id: cartId } = req.params;
  try {
    const existingUser = await userModel.findOne({ _id: req.user.userId });
    const cart = await cartModel.findOne({ _id: cartId });
  } catch (error) {
    console.log(error);
  }
};

export {
  loginUser,
  registerUser,
  getAllProduct,
  addProductToCart,
  getCurrentUser,
};
