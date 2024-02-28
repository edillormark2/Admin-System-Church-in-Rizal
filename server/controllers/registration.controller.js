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

// Controller for registration to update the status to open and closed
export const updateStatusByID = async (req, res) => {
  try {
    const registration = await Registrationform.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Toggle registration status between "Open" and "Closed"
    registration.status = registration.status === "Open" ? "Closed" : "Open";
    await registration.save();

    res.status(200).json({
      message: "Registration status updated successfully",
      registration
    });
  } catch (error) {
    console.error("Error updating registration status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for registration get display by ID
export const registrationGetbyID = async (req, res) => {
  try {
    const registration = await Registrationform.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.status(200).json(registration);
  } catch (error) {
    console.error("Error fetching registration status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for registration update data by ID
export const registrationUpdateByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, price, cardImage, description } = req.body;

    // Check if registration exists
    const existingRegistration = await Registrationform.findById(id);
    if (!existingRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Update registration data
    existingRegistration.title = title;
    existingRegistration.location = location;
    existingRegistration.price = price;
    existingRegistration.cardImage = cardImage;
    existingRegistration.description = description;

    // Save updated registration
    const updatedRegistration = await existingRegistration.save();

    res.status(200).json(updatedRegistration);
  } catch (error) {
    console.error("Error updating registration data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
