import Coordinators from "../models/TrainingModel/coordinators.model.js";

// Controller for adding coordinator
export const coordinatorsAdd = async (req, res) => {
  try {
    const { name, department, trainingType } = req.body;

    // Check if required fields are provided
    if (!name || !department || !trainingType) {
      return res.status(400).json({
        message: "Name, Department, and Training Type are required fields"
      });
    }

    // Create a new coordinator instance
    const newCoordinator = new Coordinators({
      name,
      department,
      trainingType
    });

    // Save the coordinator to the database
    await newCoordinator.save();

    // Send success response
    res.status(201).json({
      message: "Coordinator added successfully",
      coordinator: newCoordinator
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding coordinator:", error);
    res.status(500).json({ message: "Error adding coordinator" });
  }
};

// Controller for displaying coordinators
export const coordinatorsDisplay = async (req, res) => {
  try {
    const { selectedTraining, selectedYear } = req.query;

    // Construct query object based on selected training type and year
    const query = {
      trainingType: selectedTraining,
      yearCreated: selectedYear
    };

    // Fetch coordinators from the database based on the query
    const coordinators = await Coordinators.find(query);

    // Send the coordinators as a response
    res.status(200).json(coordinators);
  } catch (error) {
    // Handle errors
    console.error("Error fetching coordinators:", error);
    res.status(500).json({ message: "Error fetching coordinators" });
  }
};
