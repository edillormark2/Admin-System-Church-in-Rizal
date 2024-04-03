import mongoose from "mongoose";

const culminatingSchema = new mongoose.Schema({
  awardName: {
    type: String,
    required: true
  },
  awardCategory: {
    type: String,
    required: true
  },
  awardee: {
    type: [String]
  },
  trainingType: {
    type: String,
    required: true
  },
  yearCreated: {
    type: String,
    required: true,
    default: () =>
      new Date().toLocaleDateString("en-US", {
        year: "numeric"
      })
  }
});

const Culminating = mongoose.model("Culminating", culminatingSchema);

export default Culminating;
