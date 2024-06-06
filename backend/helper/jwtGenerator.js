import jwt from "jsonwebtoken";

export const jwtGeneratorHandler = ({ _id, email }) => {
  return jwt.sign({ adminId: _id, email: email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMES,
  });
};
