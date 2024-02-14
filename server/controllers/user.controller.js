// Import the Admin model
import Admin from "../models/adminlogin.model.js";

// Fetching user admin data
export const getUserAdmin = async (req, res) => {
  try {
    // Fetch all admin users from the database
    const admins = await Admin.find();

    // If no admin users are found, send a 404 response
    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "No admin users found" });
    }

    // If admin users are found, send the data in the response
    res.status(200).json(admins);
  } catch (error) {
    // If an error occurs, send a 500 response with the error message
    console.error("Error fetching admin users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
