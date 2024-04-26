import React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteEventPopup = ({
  openDeletePopup,
  setOpenDeletePopup,
  selectedEvent,
  onDeleteEvent
}) => {
  const handleClosePopup = () => {
    setOpenDeletePopup(false);
  };

  const handleDeleteEvent = async () => {
    try {
      // Extract the _id field from the selected event
      const eventId = selectedEvent._id;

      // Make a DELETE request to delete the event using its ID
      await axios.delete(
        `http://localhost:3000/server/event/event-delete/${eventId}`
      );

      // Call the onDeleteEvent function passed from the parent component
      onDeleteEvent();

      // Close the delete popup
      setOpenDeletePopup(false);

      // Show success message
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event");
    }
  };

  return (
    <div className="bg-white">
      <Modal open={openDeletePopup} onClose={handleClosePopup}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle style={{ justifyContent: "center" }}>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent className="md-max-sm-flex text-center">
            Are you sure you want to delete this event?
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="solid"
              style={{
                backgroundColor: "#DE3163",
                color: "white"
              }}
              onClick={handleDeleteEvent}
            >
              Delete
            </Button>
            <Button onClick={handleClosePopup} variant="plain" color="neutral">
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default DeleteEventPopup;
