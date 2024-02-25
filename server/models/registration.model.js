import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  title: {
    type: String
  },
  status: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  price: {
    type: String
  },
  cardImage: {
    type: String
  },
  buttonLink: {
    type: String
  }
});

const Registrationform = mongoose.model("Registrationform", registrationSchema);

export default Registrationform;
