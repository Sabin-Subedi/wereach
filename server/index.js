import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import { sendEmail } from "./utils/email.js";


dotenv.config();

// ! Connects DataBase
connectDB();

const app = express();

app.use(cors());

app.use(express.json());


app.use("/auth/", authRoutes);
app.use("/project/", projectRoutes);
app.use('/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Server is running.......')
  })
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`SERVER IS RUNNING ON PORT https://localhost:${PORT}`);
  }
});
