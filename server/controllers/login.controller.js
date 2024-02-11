import Admin from "../models/adminlogin.model.js";
import Inventory from "../models/inventory.model.js";
import Registration from "../models/registrationlogin.model.js";

// Controller for admin login
export const adminlogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin exists with the provided username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Admin not found" });
    }

    // Check if the password matches
    if (admin.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // If username and password match, return success
    return res
      .status(200)
      .json({ success: true, message: "Admin logged in successfully" });
  } catch (error) {
    console.error("Error during admin login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for registration login
export const registrationlogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const registration = await Registration.findOne({ username });

    if (!registration) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (registration.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // If username and password match, return success
    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    console.error("Error during user login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for inventory departmant login
export const inventorylogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const inventory = await Inventory.findOne({ username });

    if (!inventory) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (inventory.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // If username and password match, return success
    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    console.error("Error during user login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for admin signup
export const adminsignup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin already exists with the provided username
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    return res
      .status(201)
      .json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error during admin signup:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
