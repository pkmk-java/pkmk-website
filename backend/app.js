import "dotenv/config";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
import { adminRouter } from "./routes/adminRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import { userRouter } from "./routes/userRoutes.js";
import { guestRouter } from "./routes/guestRoutes.js";
import session from "express-session";
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//admin route
app.use("/api/pkmk-javac/admin", adminRouter);
app.use("/api/pkmk-javac/user", userRouter);
app.use("/api/pkmk-javac/guest", guestRouter);

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(3000, () => console.log("Server running ..."));
  } catch (error) {
    console.log(error);
  }
}

startServer();
