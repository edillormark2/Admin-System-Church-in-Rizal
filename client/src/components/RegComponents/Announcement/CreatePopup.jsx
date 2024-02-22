import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "@mui/material";

const CreatePopup = props => {
  const { openCreatePopup, setOpenCreatePopup, onUserCreated } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    tile: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClosePopup = () => {
    setOpenCreatePopup(false);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Check if screen size is mobile
  const isMobile = useMediaQuery("(max-width:600px)");

  // Dynamic styles for modal
  const dynamicPopupStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
    width: "auto",
    width: "min(90%, 600px)",
    maxHeight: isMobile ? "95vh" : "calc(100vh - 100px)" // Adjusted maximum height based on screen size
  };

  return (
    <div>
      <Modal open={openCreatePopup} onClose={handleClosePopup}>
        <Box
          className=" bg-white rounded-xl "
          sx={dynamicPopupStyle}
          style={
            isMobile || window.innerWidth <= window.innerHeight * 2
              ? dynamicPopupStyle
              : null
          }
        >
          <div className="flex justify-between">
            <ModalClose
              variant="outlined"
              onClick={() => setOpenCreatePopup(false)}
            />
            <div className="flex justify-center mx-auto text-lg font-semibold mb-2">
              Create Announcement
            </div>
          </div>
          <Divider />
          <div className="mt-8">
            <div>
              <form className="flex flex-col gap-4">
                <p className="text-sm font-semibold">Title</p>
                <input
                  type="text"
                  placeholder=""
                  id="title"
                  onChange={handleChange}
                  autoComplete="off"
                  className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base "
                />
                <p className="text-sm font-semibold">Description</p>
                <textarea
                  placeholder=""
                  id="description"
                  onChange={handleChange}
                  autoComplete="off"
                  className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base overflow-scroll"
                  rows="4" // Set the initial rows to 4
                  style={{
                    minHeight: "4rem",
                    maxHeight: isMobile ? "18rem" : "26rem" // Adjusted maxHeight based on screen size
                  }} // Set dynamic styles
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    disabled={loading}
                    className="bg-primary w-full text-white p-3 rounded-lg w-24 hover:opacity-85 disabled:opacity-80 text-sm sm:text-base"
                  >
                    {loading ? "Loading..." : "Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePopup;
