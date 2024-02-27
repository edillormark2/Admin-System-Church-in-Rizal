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

    res.status(200).json({ status: registration.status });
  } catch (error) {
    console.error("Error fetching registration status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
