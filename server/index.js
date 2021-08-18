import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
// import { bucket } from './firebase.js'

dotenv.config();

// ! Connects DataBase
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth/", authRoutes);
app.use("/project/", projectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`SERVER IS RUNNING ON PORT https://localhost:${PORT}`);
  }
});
