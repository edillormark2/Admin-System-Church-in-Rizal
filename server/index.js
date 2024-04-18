import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import loginRoutes from "./routes/login.route.js";
import userRoutes from "./routes/user.route.js";
import AnnouncementRoutes from "./routes/announcement.route.js";
import RegistrationRoutes from "./routes/registration.route.js";
import RegistrantsRoutes from "./routes/registrants.route.js";
import TrainingRoutes from "./routes/training.route.js";
import EventRoutes from "./routes/event.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/server/login", loginRoutes);
app.use("/server/users", userRoutes);
app.use("/server/announcement", AnnouncementRoutes);
app.use("/server/registration", RegistrationRoutes);
app.use("/server/registrants", RegistrantsRoutes);
app.use("/server/training", TrainingRoutes);
app.use("/server/event", EventRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
