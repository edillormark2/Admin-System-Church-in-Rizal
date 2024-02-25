import Registrationform from "../models/registration.model.js";

// Controller for registration display
export const registrationDisplay = async (req, res) => {
  try {
    const registrations = await Registrationform.find();
    res.status(200).json({ success: true, registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch registrations" });
  }
};
