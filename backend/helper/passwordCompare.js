import bcrypt from "bcrypt";

export const passwordCompareHandler = ({ userPass, dataPass }) => {
  return bcrypt.compare(userPass, dataPass);
};
