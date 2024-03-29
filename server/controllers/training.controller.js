import Coordinators from "../models/TrainingModel/coordinators.model.js";
import Teams from "../models/TrainingModel/teams.model.js";

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
    const query = {
      trainingType: selectedTraining,
      yearCreated: selectedYear
    };
    const coordinators = await Coordinators.find(query);

    res.status(200).json(coordinators);
  } catch (error) {
    console.error("Error fetching coordinators:", error);
    res.status(500).json({ message: "Error fetching coordinators" });
  }
};

// Controller for deleting coordinators based on id
export const coordinatorsDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Coordinator ID is required" });
    }

    await Coordinators.findByIdAndDelete(id);
    res.status(200).json({ message: "Coordinator deleted successfully" });
  } catch (error) {
    console.error("Error deleting coordinator:", error);
    res.status(500).json({ message: "Error deleting coordinator" });
  }
};

// Controller for creating team
export const teamCreate = async (req, res) => {
  try {
    const { teamName, teamMembers, trainingType } = req.body; // Retrieve trainingType from req.body

    // Check if required fields are provided
    if (
      !teamName ||
      !teamMembers ||
      teamMembers.length === 0 ||
      !trainingType
    ) {
      return res.status(400).json({
        message:
          "Team name, at least one team member, and training type are required"
      });
    }

    // Create a new team instance
    const newTeam = new Teams({
      teamName,
      teamMembers,
      trainingType
    });

    // Save the team to the database
    await newTeam.save();

    // Send success response
    res.status(201).json({
      message: "Team created successfully",
      teams: newTeam
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating team", error);
    res.status(500).json({ message: "Error creating team" });
  }
};

// Controller for displaying team
export const teamDisplay = async (req, res) => {
  try {
    const { selectedTraining, selectedYear } = req.query;

    // Construct the filter object
    const filter = {};
    if (selectedTraining) filter.trainingType = selectedTraining;
    if (selectedYear) filter.yearCreated = selectedYear;

    // Fetch teams from the database based on the filter
    const teams = await Teams.find(filter);

    // Send the teams data as a response
    res.status(200).json({ teams });
  } catch (error) {
    // Handle errors
    console.error("Error fetching teams", error);
    res.status(500).json({ message: "Error fetching teams" });
  }
};

// Controller for displaying team based on id
export const teamDisplayByID = async (req, res) => {
  try {
    const team = await Teams.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ team });
  } catch (error) {
    console.error("Error fetching team by ID", error);
    res.status(500).json({ message: "Error fetching team by ID" });
  }
};

// Controller for updating team based on id
export const teamEditByID = async (req, res) => {
  try {
    const { teamName, teamMembers } = req.body;
    if (!teamName || !teamMembers || teamMembers.length === 0) {
      return res
        .status(400)
        .json({ message: "Team name and members are required" });
    }

    const team = await Teams.findByIdAndUpdate(
      req.params.id,
      {
        teamName,
        teamMembers
      },
      { new: true }
    );

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team updated successfully", team });
  } catch (error) {
    console.error("Error updating team by ID", error);
    res.status(500).json({ message: "Error updating team by ID" });
  }
};

// Controller for deleting team based on id
export const teamDeleteByID = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Teams.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
