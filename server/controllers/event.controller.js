import Event from "../models/event.model.js";

//Controller for creating events
export const eventCreate = async (req, res) => {
  try {
    const { title, location, startDate, endDate, color } = req.body;

    // Parse dates to the desired format
    const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    const formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    const newEvent = new Event({
      title,
      location,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      color
    });

    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for displaying events
export const eventDisplay = async (req, res) => {
  try {
    // Extract the year from the query parameters
    const { yearCreated } = req.query;

    // Fetch events from the database based on the selected year
    const events = await Event.find({ yearCreated });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
