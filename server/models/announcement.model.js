import mongoose from "mongoose";
import dotenv from "dotenv";

const announcementSchema = new mongoose.Schema({
  userID: {
    type: Number
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

// Specify the collection name as 'Announcement' and export the model
const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
