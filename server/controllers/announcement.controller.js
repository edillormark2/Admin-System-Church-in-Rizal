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
// Controller for updating announcement by ID
export const updateAnnouncementByID = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(announcement);
  } catch (error) {
    next(error);
  }
};

// Controller for getting announcement by ID
export const getAnnouncementByID = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(announcement);
  } catch (error) {
    next(error);
  }
};

// Controller for deleting announcement by ID
export const deleteAnnouncementByID = async (req, res, next) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Controller for pinning announcement by ID
export const pinAnnouncementByID = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    announcement.pinned = true; // Set pinned to true
    await announcement.save();

    res.status(200).json({ message: "Announcement pinned successfully" });
  } catch (error) {
    next(error);
  }
};

// Controller for unpinning announcement by ID
export const unpinAnnouncementByID = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    announcement.pinned = false;
    await announcement.save();

    res.status(200).json({ message: "Announcement pinned successfully" });
  } catch (error) {
    next(error);
  }
};
