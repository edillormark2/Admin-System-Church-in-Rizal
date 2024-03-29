import mongoose from "mongoose";

const teamsSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true
  },
  teamMembers: {
    type: [String],
    required: true
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

const Teams = mongoose.model("Teams", teamsSchema);

export default Teams;
