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

const adminloginSchema = new mongoose.Schema({
  userID: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
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
    type: Date,
    default: Date.now
  }
});

// Middleware to generate userID before saving
adminloginSchema.pre("save", async function(next) {
  // Generate userID based on existing count + 1000
  const count = await Admin.countDocuments();
  this.userID = (count + 1000).toString();
  next();
});

// Virtual property to format dateCreated
adminloginSchema.virtual("formattedDateCreated").get(function() {
  return this.dateCreated.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
});

const Admin = mongoose.model("Admin", adminloginSchema);

export default Admin;
