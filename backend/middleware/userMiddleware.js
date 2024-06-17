import jwt from "jsonwebtoken";
import { userModel } from "../model/userModel.js";

export const userMiddleware = async (req, res, next) => {
  const headers = req.headers.authorization;

  if (!headers || !headers.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "please login first" });
  }

  const token = headers.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: data.email });
    console.log(user);

    if (!user) {
      return res
        .status(401)
        .json({ msg: "token not valid please login again" });
    }

    req.user = {
      userId: user._id.toString(),
      email: user.email,
    };
    next();
  } catch (error) {
    console.log(error);
  }
};
``;
