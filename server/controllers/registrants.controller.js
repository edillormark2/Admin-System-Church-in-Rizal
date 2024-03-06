import BRregistrants from "../models/Registrants/BRregistrants.model.js";
import TOLTregistrants from "../models/Registrants/TOLTregistrants.model.js";

// Controller for registrants display
export const BRregistrantsDisplay = async (req, res) => {
  try {
    const { year } = req.query;
    // Constructing a regular expression to match the beginning of the date string with the selected year
    const regex = new RegExp(`^${year}`);
    // Assuming TOLTregistrants is your MongoDB model
    const registrants = await BRregistrants.find({ year: regex });
    res.status(200).json({ success: true, registrants });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch registrations" });
  }
};

// Controller for adding registrants
export const BRregistrantsAdd = async (req, res) => {
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
export const BRregistrantsDeleted = async (req, res) => {
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
export const BRregistrantsDisplayByID = async (req, res) => {
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

// Controller for updating check in registrant data by ID
export const BRregistrantsUpdateInByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkin, checkStatus } = req.body; // Get checkin and checkStatus from request body

    const registrant = await BRregistrants.findById(id);
    if (!registrant) {
      return res
        .status(404)
        .json({ success: false, message: "Registrant not found" });
    }

    // Update the checkin and checkStatus fields with the provided values
    registrant.checkin = checkin;
    registrant.checkStatus = checkStatus;

    await registrant.save();

    res
      .status(200)
      .json({ success: true, message: "Registrant updated successfully" });
  } catch (error) {
    console.error("Error updating registrant:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update registrant" });
  }
};

// Controller for updating check out registrant data by ID
export const BRregistrantsUpdateOutByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkout, checkStatus } = req.body;

    const registrant = await BRregistrants.findById(id);
    if (!registrant) {
      return res
        .status(404)
        .json({ success: false, message: "Registrant not found" });
    }

    registrant.checkout = checkout;
    registrant.checkStatus = checkStatus;

    await registrant.save();

    res
      .status(200)
      .json({ success: true, message: "Registrant updated successfully" });
  } catch (error) {
    console.error("Error updating registrant:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update registrant" });
  }
};
//--------------------------TOLT-Backend-Controller-logic------------------------------------------------------------------------------

// Controller for registrants display
export const TOLTregistrantsDisplay = async (req, res) => {
  try {
    const { year } = req.query;
    // Constructing a regular expression to match the beginning of the date string with the selected year
    const regex = new RegExp(`^${year}`);
    // Assuming TOLTregistrants is your MongoDB model
    const registrants = await TOLTregistrants.find({ year: regex });
    res.status(200).json({ success: true, registrants });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch registrations" });
  }
};

// Controller for adding registrants
export const TOLTregistrantsAdd = async (req, res) => {
  try {
    const {
      email,
      qualification,
      surname,
      firstname,
      locality,
      grade,
      attended,
      school,
      contact,
      amen
    } = req.body;

    const newRegistrant = new TOLTregistrants({
      email,
      qualification,
      surname,
      firstname,
      locality,
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
export const TOLTregistrantsDeleted = async (req, res) => {
  try {
    // Find the registrant by ID and delete it
    const deletedRegistrant = await TOLTregistrants.findByIdAndDelete(
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
export const TOLTregistrantsDisplayByID = async (req, res) => {
  try {
    const registrant = await TOLTregistrants.findById(req.params.id);
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
