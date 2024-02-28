import mongoose from "mongoose";
import dotenv from "dotenv";

const adminloginSchema = new mongoose.Schema({
  userID: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default:
      "https://qph.cf2.quoracdn.net/main-qimg-6d72b77c81c9841bd98fc806d702e859-lq"
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

// Middleware to generate userID before saving
adminloginSchema.pre("save", async function(next) {
  if (!this.isNew) {
    // If the document is not new (i.e., an update), skip generating the userID
    return next();
  }

  // Find the maximum userID in the collection
  const maxUserIDDoc = await Admin.findOne({}, {}, { sort: { userID: -1 } });

  let maxUserID = 10000; // Default starting userID
  if (maxUserIDDoc) {
    // If there are existing documents, set the maximum userID
    maxUserID = maxUserIDDoc.userID;
  }

  // Generate the new userID
  this.userID = maxUserID + 1;

  next();
});

const Admin = mongoose.model("Admin", adminloginSchema);

export default Admin;
