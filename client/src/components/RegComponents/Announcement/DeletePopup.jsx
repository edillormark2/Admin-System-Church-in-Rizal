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

const DeletePopup = props => {
  const { openDeletePopup, setOpenDeletePopup, _id } = props;

  const handleClosePopup = () => {
    setOpenDeletePopup(false);
  };

  const handleDeleteAnnouncement = async () => {
    try {
      // Send a request to your server to delete the announcement
      await axios.delete(
        `http://localhost:3000/server/announcement/announcement-delete/${_id}`
      );
      toast.success("Announcement deleted successfully");
      setOpenDeletePopup(false);
      props.onAnnouncementDeleted();
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Error deleting announcement");
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
            Are you sure you want to delete this announcement?
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              onClick={handleDeleteAnnouncement}
              variant="solid"
              style={{
                backgroundColor: "#DE3163",
                color: "white"
              }}
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

export default DeletePopup;
