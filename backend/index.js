import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import taskrouter from "./Routes/taskRouter.js";
import authrouter from "./Routes/authRouter.js";
const app = express();
dotenv.config();

app.use(
  cors({
    origin: "https://gravity-to-do-app.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", taskrouter);
app.use("/api/auth", authrouter);
const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");
  } catch (e) {
    console.log(e.message);
  }
};
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("the backend is running on port 5000");
  ConnectDB();
});
