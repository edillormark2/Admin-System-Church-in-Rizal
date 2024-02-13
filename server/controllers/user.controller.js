// Import the Admin model
import Admin from "../models/adminlogin.model.js";

// Fetching user admin data
export const getUserAdmin = async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract name and profilePicture from the user object
    const { name, profilePicture } = user;

    // Return the name and profilePicture in the response
    res.status(200).json({ name, profilePicture });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
