import mongoose from "mongoose";

const coordinatorsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  department: {
    type: String
  },
  trainingType: {
    type: String
  },
  yearCreated: {
    type: String,
    default: () =>
      new Date().toLocaleDateString("en-US", {
        year: "numeric"
      })
  }
});

const Coordinators = mongoose.model("Coordinators", coordinatorsSchema);

export default Coordinators;
