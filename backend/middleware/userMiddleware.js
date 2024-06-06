import jwt from "jsonwebtoken";

export const userMiddleware = async (req, res, next) => {
  const headers = req.headers.authorization;

  if (!headers || !headers.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "please login first" });
  }

  const token = headers.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

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
