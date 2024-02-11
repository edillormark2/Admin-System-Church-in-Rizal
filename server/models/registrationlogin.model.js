import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI + "/user-login";

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

const registrationloginSchema = new mongoose.Schema(
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

const Registration = mongoose.model("Registration", registrationloginSchema);

export default Registration;
