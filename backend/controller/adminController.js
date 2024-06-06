import { hashPasswordHandler } from "../helper/hashPassword.js";
import { jwtGeneratorHandler } from "../helper/jwtGenerator.js";
import { passwordCompareHandler } from "../helper/passwordCompare.js";
import { adminModel } from "../model/adminModel.js";
import { productModel } from "../model/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  const requiredField = ["username", "email", "password"];

  for (const field of requiredField) {
    if (!req.body[field]) {
      return res.status(401).json({ msg: `please fill ${field} field` });
    }
  }

  try {
    const isAdminExist = await adminModel.findOne({ email: email });

    if (isAdminExist) {
      return res.status(401).json({ msg: "admin already registered" });
    }

    const safePassword = await hashPasswordHandler(password);
    console.log(safePassword);

    const adminBlueprint = new adminModel({
      username: username,
      email: email,
      password: safePassword,
    });

    const newAdmin = await adminModel.create(adminBlueprint);

    return res.status(200).json({ msg: "success register admin", newAdmin });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(401);
  }
  try {
    const isAdminExist = await adminModel.findOne({ email: email });

    if (!isAdminExist) {
      return res.status(404).json({ msg: "admin not found" });
    }

    const isPassCorrect = passwordCompareHandler(
      password,
      isAdminExist.password
    );
    console.log(isPassCorrect);

    if (!isPassCorrect) {
      return res.status(401).json({ msg: "password wrong" });
    }

    const token = jwtGeneratorHandler({
      _id: isAdminExist._id.toString(),
      email: isAdminExist.email,
    });

    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      })
      .json({ msg: "success login admin", isAdminExist });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const createProduct = async (req, res) => {
  const { productName, description, price, stock } = req.body;

  const requiredField = ["productName", "description", "price", "stock"];

  for (const field of requiredField) {
    if (!req.body[field]) {
      return res.status(401).json({ msg: `please fill ${field} field` });
    }
  }

  let file = req.file;

  if (!file) {
    return res.status(401).json({ msg: "please attach file" });
  }

  try {
    const productImages = await cloudinary.uploader.upload(file.path, {
      folder: "Testing",
      resource_type: "auto",
    });

    const productBlueprint = new productModel({
      productName: productName,
      description: description,
      price: price,
      stock: stock,
      productImage: productImages.secure_url,
    });

    const product = await productModel.create(productBlueprint);

    return res.status(200).json({ msg: "success create product", product });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }

    const deletedProduct = await productModel.findOneAndDelete({ _id: id });

    return res.status(200).json({ msg: "product deleted", deletedProduct });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, description, price, stock } = req.body;

  const requiredField = ["productName", "description", "price", "stock"];

  for (const field of requiredField) {
    if (!req.body[field]) {
      return res.status(401).json({ msg: `please fill ${field} field` });
    }
  }

  let file = req.file;

  if (!file) {
    return res.status(401).json({ msg: "please attach file" });
  }

  try {
    const product = await productModel.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }

    const productImages = await cloudinary.uploader.upload(file.path, {
      folder: "Testing",
      resource_type: "auto",
    });

    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id },
      {
        productName: productName,
        description: description,
        price: price,
        stock: stock,
        productImage: productImages.secure_url,
      }
    );

    return res.status(200).json({ msg: "product updated", updatedProduct });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

export {
  registerAdmin,
  loginAdmin,
  createProduct,
  deleteProduct,
  updateProduct,
};
