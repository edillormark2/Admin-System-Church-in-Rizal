// Import required modules
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Define MongoDB Atlas connection URI with the desired database name
const MONGO_URI = process.env.MONGO_URI + "/user-login";

// Connect Mongoose to MongoDB Atlas
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Define Mongoose schema and model
const adminloginSchema = new mongoose.Schema(
  {
    username: {
      type: String
    },
    password: {
      type: String
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminloginSchema);

export default Admin;
