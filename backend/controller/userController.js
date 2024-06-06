import {} from "cloudinary";
import { userModel } from "../model/userModel";
import { hashPasswordHandler } from "../helper/hashPassword";
import { passwordCompareHandler } from "../helper/passwordCompare";
import { jwtGeneratorHandler } from "../helper/jwtGenerator";

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

    const securePassword = hashPasswordHandler(password);
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
    const isUserExist = await userModel.findOne({ email: email });

    if (!isUserExist) {
      return res.status(404).json({ msg: "email not registered yet" });
    }

    const isPassCorrect = passwordCompareHandler(
      password,
      isUserExist.password
    );
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
        expires: new Date.now() + 86400000,
        httpOnly: true,
      })
      .json({ msg: "success login user", isUserExist });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "internal server error" });
  }
};
