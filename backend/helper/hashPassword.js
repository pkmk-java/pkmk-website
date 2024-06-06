import bcrypt from "bcrypt";

export const hashPasswordHandler = async (userPassword) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};
