import BRregistrants from "../models/Registrants/BRregistrants.model.js";

// Controller for registrants display
export const registrantsDisplay = async (req, res) => {
  try {
    const registrants = await BRregistrants.find();
    res.status(200).json({ success: true, registrants });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch registrations" });
  }
};

// Controller for adding registrants
export const registrantsAdd = async (req, res) => {
  try {
    const {
      email,
      qualification,
      surname,
      firstname,
      locality,
      status,
      grade,
      attended,
      school,
      contact,
      amen
    } = req.body;

    const newRegistrant = new BRregistrants({
      email,
      qualification,
      surname,
      firstname,
      locality,
      status,
      grade,
      attended,
      school,
      contact,
      amen
    });

    await newRegistrant.save();

    res
      .status(201)
      .json({ success: true, message: "Registrant added successfully" });
  } catch (error) {
    console.error("Error adding registrant:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add registrant" });
  }
};

// Controller for deleting a registrant
export const registrantsDeleted = async (req, res) => {
  try {
    // Find the registrant by ID and delete it
    const deletedRegistrant = await BRregistrants.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRegistrant) {
      // If the registrant with the provided ID does not exist
      return res
        .status(404)
        .json({ success: false, message: "Registrant not found" });
    }

    // If deletion is successful
    res
      .status(200)
      .json({ success: true, message: "Registrant deleted successfully" });
  } catch (error) {
    console.error("Error deleting registrant:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete registrant" });
  }
};

// Controller for fetching registrant data by ID
export const registrantsDisplayByID = async (req, res) => {
  try {
    const registrant = await BRregistrants.findById(req.params.id);
    if (!registrant) {
      return res
        .status(404)
        .json({ success: false, message: "Registrant not found" });
    }
    res.status(200).json({ success: true, registrant });
  } catch (error) {
    console.error("Error fetching registrant:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch registrant" });
  }
};