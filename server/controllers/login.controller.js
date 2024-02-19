import Admin from "../models/adminlogin.model.js";
import Inventory from "../models/inventory.model.js";
import Registration from "../models/registrationlogin.model.js";
import Reports from "../models/reportslogin.model.js";
import jwt from "jsonwebtoken";

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

    // Generate JWT token without expiry
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...rest } = admin._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "production"
      })
      .status(200)
      .json({
        ...rest,
        access_token: token // Include access_token in the response
      });
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

// Controller for inventory departmant login
export const reportslogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const reports = await Reports.findOne({ username });

    if (!reports) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (reports.password !== password) {
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
  const { name, locality, role, username, password } = req.body;

  try {
    // Check if admin already exists with the provided username
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({ name, locality, role, username, password });
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

// Controller for registration signup
export const regsignup = async (req, res) => {
  const { name, locality, role, username, password } = req.body;

  try {
    // Check if admin already exists with the provided username
    const existingReg = await Registration.findOne({ username });

    if (existingReg) {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    }

    // Create a new user
    const newReg = new Registration({
      name,
      locality,
      role,
      username,
      password
    });
    await newReg.save();

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during reg signup:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for inventory signup
export const invsignup = async (req, res) => {
  const { name, locality, role, username, password } = req.body;

  try {
    const existingInv = await Inventory.findOne({ username });

    if (existingInv) {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    }

    // Create a new user
    const newInv = new Inventory({
      name,
      locality,
      role,
      username,
      password
    });
    await newInv.save();

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during inv signup:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for report signup
export const reportsignup = async (req, res) => {
  const { name, locality, role, username, password } = req.body;

  try {
    const existingRep = await Reports.findOne({ username });

    if (existingRep) {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    }

    // Create a new user
    const newRep = new Reports({
      name,
      locality,
      role,
      username,
      password
    });
    await newRep.save();

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during inv signup:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
