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

// Controller for displaying events based on selected year

export const eventDisplayByYear = async (req, res) => {
  try {
    const selectedYear = req.query.selectedYear || new Date().getFullYear();
    const events = await Event.find({
      startDate: { $regex: new RegExp(selectedYear), $options: "i" } // Using regex to filter by year
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for displaying events
export const eventDisplay = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events without filtering by year

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for deleting events based on id
export const eventDeleteByID = async (req, res) => {
  const eventId = req.params.id; // Get the event ID from request parameters

  try {
    // Find the event by ID and delete it
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
