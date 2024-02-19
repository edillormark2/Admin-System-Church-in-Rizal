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
import { useNavigate } from "react-router-dom";

const DeleteAdminUserPopup = props => {
  const {
    openDeleteUserPopup,
    setOpenDeleteUserPopup,
    userID,
    onUserDeleted
  } = props;

  const handleClosePopup = () => {
    setOpenDeleteUserPopup(false);
  };

  const handleDeleteUser = async () => {
    try {
      // Make DELETE request to delete user based on userID
      await axios.delete(
        `http://localhost:3000/server/users/useradmin/delete/${userID}`
      );
      toast.success("User deleted successfully");
      setOpenDeleteUserPopup(false);
      onUserDeleted();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="bg-white">
      <Modal open={openDeleteUserPopup} onClose={handleClosePopup}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle style={{ justifyContent: "center" }}>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent className="md-max-sm-flex text-center">
            Are you sure you want to delete this user?
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="solid"
              style={{
                backgroundColor: "#DE3163",
                color: "white"
              }}
              onClick={handleDeleteUser}
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

export default DeleteAdminUserPopup;
