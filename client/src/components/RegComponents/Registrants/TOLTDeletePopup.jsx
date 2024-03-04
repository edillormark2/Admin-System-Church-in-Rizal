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

const TOLTDeletePopup = ({
  openDeleteRegistrantsPopup,
  setOpenDeleteRegistrantsPopup,
  selectedRegistrant,
  onRegistrantsDeleted
}) => {
  const handleClosePopup = () => {
    setOpenDeleteRegistrantsPopup(false);
  };

  const handleDeleteRegistrant = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/server/registrants/tolt-registrants-delete/${selectedRegistrant}`
      );
      toast.success("Registrant deleted");
      setOpenDeleteRegistrantsPopup(false);
      onRegistrantsDeleted();
    } catch (error) {
      console.error("Error deleting registrant:", error);
      toast.error("Failed to delete registrant");
    }
  };

  return (
    <div className="bg-white">
      <Modal open={openDeleteRegistrantsPopup} onClose={handleClosePopup}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle style={{ justifyContent: "center" }}>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent className="md-max-sm-flex text-center">
            Are you sure you want to delete this registrant?
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="solid"
              style={{
                backgroundColor: "#DE3163",
                color: "white"
              }}
              onClick={handleDeleteRegistrant}
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

export default TOLTDeletePopup;
