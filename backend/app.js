import "dotenv/config";
import express from "express";
import { connectDB } from "./db/connectDB.js";
const app = express();

app.get("/", function (req, res) {
  return res.status(200).json({ msg: "Hello world" });
});

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(3000, () => console.log("Server running ..."));
  } catch (error) {
    console.log(error);
  }
}

startServer();
