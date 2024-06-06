import { hashPasswordHandler } from "../helper/hashPassword.js";
import { jwtGeneratorHandler } from "../helper/jwtGenerator.js";
import { adminModel } from "../model/adminModel.js";
import { productModel } from "../model/productModel.js";

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

  try {
    const productBlueprint = new productModel({
      productName: productName,
      description: description,
      price: price,
      stock: stock,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};

export { registerAdmin, loginAdmin };
