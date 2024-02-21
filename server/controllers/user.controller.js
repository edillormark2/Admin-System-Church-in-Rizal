import Admin from "../models/adminlogin.model.js";
import Registration from "../models/registrationlogin.model.js";
import Inventory from "../models/inventory.model.js";
import Reports from "../models/reportslogin.model.js";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken";

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

// Update admin user by userID
export const updateUserAdmin = async (req, res) => {
  try {
    const { userID } = req.params; // Get userID from request parameters
    const { name, locality, username, password, profilePicture } = req.body; // Get updated data from request body

    // Check if userID is provided
    if (!userID) {
      return res.status(400).json({ message: "userID is required" });
    }

    // Check if any of the required fields are missing
    if (!name || !username) {
      return res
        .status(400)
        .json({ message: "Name and username are required" });
    }

    // Find the admin user by userID
    let admin = await Admin.findOne({ userID });

    // If admin user with given userID is not found, send 404 response
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Update password field if provided
    if (password) {
      admin.password = password;
    }

    // Update other fields if provided
    admin.name = name;
    admin.locality = locality;
    admin.username = username;
    admin.profilePicture = profilePicture;

    // Save the updated admin user
    await admin.save();

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

// Delete admin user by userID
export const deleteUserAdmin = async (req, res) => {
  try {
    const { userID } = req.params; // Get userID from request parameters

    // Find the admin user by userID and delete it
    const deletedAdmin = await Admin.findOneAndDelete({ userID: userID });

    // If admin user with given userID is not found, send 404 response
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // If admin user is found and deleted successfully, send success message in the response
    res.status(200).json({ message: "Admin user deleted successfully" });
  } catch (error) {
    // If an error occurs, send a 500 response with the error message
    console.error("Error deleting admin user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//-------------Registration-Controller-Logic-------------------------------------//

// Fetching user reg data
export const getUserReg = async (req, res) => {
  try {
    const regs = await Registration.find();

    if (!regs || regs.length === 0) {
      return res.status(404).json({ message: "No admin users found" });
    }

    res.status(200).json(regs);
  } catch (error) {
    console.error("Error fetching admin users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch user reg data by userID
export const getUserRegByID = async (req, res) => {
  try {
    const { userID } = req.params;

    const reg = await Registration.findOne({ userID: userID });

    if (!reg) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(reg);
  } catch (error) {
    console.error("Error fetching admin user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update reg user by userID
export const updateUserReg = async (req, res) => {
  try {
    const { userID } = req.params; // Get userID from request parameters
    const { name, locality, username, password, profilePicture } = req.body; // Get updated data from request body

    if (!userID) {
      return res.status(400).json({ message: "userID is required" });
    }

    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Name, username, and password are required" });
    }

    const reg = await Registration.findOneAndUpdate(
      { userID: userID },
      {
        name: name,
        locality: locality,
        username: username,
        password: password,
        profilePicture: profilePicture
      },
      { new: true }
    );

    if (!reg) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(reg);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete reg user by userID
export const deleteUserReg = async (req, res) => {
  try {
    const { userID } = req.params;

    const deletedReg = await Registration.findOneAndDelete({ userID: userID });

    if (!deletedReg) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//-------------Inventory-Controller-Logic-------------------------------------//

// Fetching user inventory data
export const getUserInv = async (req, res) => {
  try {
    const regs = await Inventory.find();

    if (!regs || regs.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(regs);
  } catch (error) {
    console.error("Error fetching admin users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch user inventory data by userID
export const getUserInvByID = async (req, res) => {
  try {
    const { userID } = req.params;

    const reg = await Inventory.findOne({ userID: userID });

    if (!reg) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(reg);
  } catch (error) {
    console.error("Error fetching admin user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update inventory user by userID
export const updateUserInv = async (req, res) => {
  try {
    const { userID } = req.params; // Get userID from request parameters
    const { name, locality, username, password, profilePicture } = req.body; // Get updated data from request body

    if (!userID) {
      return res.status(400).json({ message: "userID is required" });
    }

    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Name, username, and password are required" });
    }

    const reg = await Inventory.findOneAndUpdate(
      { userID: userID },
      {
        name: name,
        locality: locality,
        username: username,
        password: password,
        profilePicture: profilePicture
      },
      { new: true }
    );

    if (!reg) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(reg);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete inventory user by userID
export const deleteUserInv = async (req, res) => {
  try {
    const { userID } = req.params;

    const deletedReg = await Inventory.findOneAndDelete({ userID: userID });

    if (!deletedReg) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//-------------Reports-Controller-Logic-------------------------------------//

// Fetching user report data
export const getUserReport = async (req, res) => {
  try {
    const reps = await Reports.find();

    if (!reps || reps.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(reps);
  } catch (error) {
    console.error("Error fetching  users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch user report data by userID
export const getUserReportByID = async (req, res) => {
  try {
    const { userID } = req.params;

    const rep = await Reports.findOne({ userID: userID });

    if (!rep) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rep);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update report user by userID
export const updateUserReport = async (req, res) => {
  try {
    const { userID } = req.params; // Get userID from request parameters
    const { name, locality, username, password, profilePicture } = req.body; // Get updated data from request body

    if (!userID) {
      return res.status(400).json({ message: "userID is required" });
    }

    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Name, username, and password are required" });
    }

    const rep = await Reports.findOneAndUpdate(
      { userID: userID },
      {
        name: name,
        locality: locality,
        username: username,
        password: password,
        profilePicture: profilePicture
      },
      { new: true }
    );

    if (!rep) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rep);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete report user by userID
export const deleteUserReport = async (req, res) => {
  try {
    const { userID } = req.params;

    const deletedRep = await Reports.findOneAndDelete({ userID: userID });

    if (!deletedRep) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//-------------Overall-Controller-Logic-------------------------------------//

// Fetch counts of users in each collection
export const getUserCounts = async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    const regCount = await Registration.countDocuments();
    const inventoryCount = await Inventory.countDocuments();
    const reportsCount = await Reports.countDocuments();

    res.status(200).json({
      Admin: adminCount,
      Registration: regCount,
      Inventory: inventoryCount,
      Reports: reportsCount
    });
  } catch (error) {
    console.error("Error fetching user counts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Fetching current user data
export const getCurrentUserData = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};
