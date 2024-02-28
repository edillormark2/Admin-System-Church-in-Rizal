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
    type: String,
    default:
      "https://qph.cf2.quoracdn.net/main-qimg-6d72b77c81c9841bd98fc806d702e859-lq"
  },
  buttonLink: {
    type: String
  }
});

const Registrationform = mongoose.model("Registrationform", registrationSchema);

export default Registrationform;
