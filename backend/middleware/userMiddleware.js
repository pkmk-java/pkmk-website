import jwt from "jsonwebtoken";
import { userModel } from "../model/userModel";

export const userMiddleware = async (req, res, next) => {
  const headers = req.headers.authorization;

  if (!headers || !headers.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "please login first" });
  }

  const token = headers.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: data._id });

    if (!user) {
      return res
        .status(401)
        .json({ msg: "token not valid please login again" });
    }

    req.user = {
      userId: data._id,
      email: data.email,
    };
    next();
  } catch (error) {
    console.log(error);
  }
};
``;
