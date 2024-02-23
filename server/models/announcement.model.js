import mongoose from "mongoose";

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
  },
  pinned: {
    type: Boolean,
    default: false // Set default value to false
  }
});

// Specify the collection name as 'Announcement' and export the model
const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
