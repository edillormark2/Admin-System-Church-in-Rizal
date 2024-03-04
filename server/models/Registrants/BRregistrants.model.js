import mongoose from "mongoose";

const BRregistrantsSchema = new mongoose.Schema({
  email: { type: String },
  qualification: { type: String },
  surname: { type: String },
  firstname: { type: String },
  locality: { type: String },
  status: { type: String },
  grade: { type: String },
  attended: { type: String },
  school: { type: String },
  contact: { type: Number },
  amen: { type: String },
  dateRegistered: {
    type: String,
    default: () =>
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      })
  },
  year: {
    type: String,
    default: () =>
      new Date().toLocaleDateString("en-US", {
        year: "numeric"
      })
  }
});

const BRregistrants = mongoose.model("BRregistrants", BRregistrantsSchema);
export default BRregistrants;
