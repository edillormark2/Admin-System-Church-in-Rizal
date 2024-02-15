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

// Fetching user admin count
export const getAdminCount = async (req, res) => {
  try {
    // Get the count of admin users from the database
    const count = await Admin.countDocuments();

    // Send the count in the response
    res.status(200).json({ count });
  } catch (error) {
    // If an error occurs, send a 500 response with the error message
    console.error("Error fetching admin count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update admin user by userID
export const updateUserAdmin = async (req, res) => {
  try {
    const { userID } = req.params; // Get userID from request parameters
    const { name, username, password, profilePicture } = req.body; // Get updated data from request body

    // Check if userID is provided
    if (!userID) {
      return res.status(400).json({ message: "userID is required" });
    }

    // Check if any of the required fields are missing
    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Name, username, and password are required" });
    }

    // Find the admin user by userID
    const admin = await Admin.findOneAndUpdate(
      { userID: userID },
      {
        name: name,
        username: username,
        password: password,
        profilePicture: profilePicture
      },
      { new: true } // Return the updated document
    );

    // If admin user with given userID is not found, send 404 response
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // If admin user is found and updated successfully, send the updated admin user in the response
    res.status(200).json(admin);
  } catch (error) {
    // If an error occurs, send a 500 response with the error message
    console.error("Error updating admin user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch user admin data by userID
export const getUserAdminByID = async (req, res) => {
  try {
    const { userID } = req.params; // Get userID from request parameters

    // Find the admin user by userID
    const admin = await Admin.findOne({ userID: userID });

    // If admin user with given userID is not found, send 404 response
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // If admin user is found, send the data in the response
    res.status(200).json(admin);
  } catch (error) {
    // If an error occurs, send a 500 response with the error message
    console.error("Error fetching admin user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
