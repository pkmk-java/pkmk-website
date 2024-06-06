const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
  } catch (error) {
    return res.status(501).json({ msg: "internal server error" });
  }
};
