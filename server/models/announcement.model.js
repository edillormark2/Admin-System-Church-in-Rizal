import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI + "/announcement";

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

const announcementSchema = new mongoose.Schema({
  userID: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  profilePicture: {
    type: String
  },
  dateCreated: {
    type: String,
    default: () =>
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      })
  }
});

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
