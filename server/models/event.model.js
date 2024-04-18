import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String
  },
  location: {
    type: String
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  color: {
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

const Event = mongoose.model("Event", eventSchema);

export default Event;
