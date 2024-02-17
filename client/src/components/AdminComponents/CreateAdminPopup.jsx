import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/material/Divider";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "@mui/material";

const CreateAdminPopup = props => {
  const { openCreatePopup, setOpenCreatePopup, onUserCreated } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [signupError, setSignupError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    role: "Admin", // Setting default value to "Admin"
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setSignupError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.role ||
      !formData.username ||
      !formData.password
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/server/login/adminsignup",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setLoading(false);
      toast.success("Account created successfully");
      props.onUserCreated();
      setOpenCreatePopup(false);
      // Reset form data to empty values
      setFormData({
        name: "",
        role: "Admin",
        username: "",
        password: ""
      });
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        toast.error("Username already exists");
      } else {
        toast.error("Error submitting data");
      }
    }
  };

  const handleClosePopup = () => {
    setOpenCreatePopup(false);
  };

  // Check if screen size is mobile
  const isMobile = useMediaQuery("(max-width:600px)");

  // Dynamic styles for modal
  const dynamicPopupStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    p: 4,
    width: "auto",
    width: "min(90%, 600px)"
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
            <div className="text-lg font-semibold mb-2">Create New User</div>
          </div>
          <Divider />
          <div className="mt-8">
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-sm font-semibold">Name</p>
                <input
                  type="text"
                  placeholder=""
                  id="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base "
                />
                <p className="text-sm font-semibold">Role</p>
                <input
                  type="text"
                  placeholder=""
                  id="role"
                  value={formData.role} // Making it view-only
                  readOnly // Making it view-only
                  className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base "
                />
                <p className="text-sm font-semibold">Username</p>
                <input
                  type="text"
                  placeholder=""
                  id="username"
                  onChange={handleChange}
                  value={formData.username}
                  className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base "
                />
                <p className="text-sm font-semibold">Password</p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder=""
                    id="password"
                    onChange={handleChange}
                    value={formData.password}
                    className="form-control bg-white p-3  rounded-lg border border-gray-300 pr-10 text-sm sm:text-base "
                  />
                  <div
                    className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-gray-500 "
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={handleClosePopup}
                    className="p-3 rounded-lg text-sm sm:text-base bg-white w-24 text-black border border-gray-300 hover:bg-gray-200"
                  >
                    Close
                  </button>
                  <button
                    disabled={loading}
                    className="bg-primary text-white p-3 rounded-lg w-24 hover:opacity-85 disabled:opacity-80 text-sm sm:text-base "
                  >
                    {loading ? "Loading..." : "Create"}
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

export default CreateAdminPopup;
