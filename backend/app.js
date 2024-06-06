import "dotenv/config";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
import { adminRouter } from "./routes/adminRoutes.js";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

//admin route
app.use("/api/pkmk-javac/admin", adminRouter);

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(3000, () => console.log("Server running ..."));
  } catch (error) {
    console.log(error);
  }
}

startServer();
