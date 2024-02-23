import Announcement from "../models/announcement.model.js";

// Controller for announcement post
export const announcementPost = async (req, res) => {
  try {
    const {
      userID,
      name,
      role,
      title,
      description,
      profilePicture,
      dateCreated
    } = req.body;

    const announcement = new Announcement({
      userID,
      name,
      role,
      title,
      description,
      profilePicture,
      dateCreated
    });

    await announcement.save();

    res.status(201).json({ success: true, message: "Announcement posted" });
  } catch (error) {
    console.error("Error posting announcement:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to post announcement" });
  }
};

// Controller for announcement display
export const announcementDisplay = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json({ success: true, announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch announcements" });
  }
};
