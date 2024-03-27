import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/material/Divider";
import { IoMdArrowDropdown } from "react-icons/io";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCoorPopup = props => {
  const { openAddPopup, setOpenAddPopup } = props;
  const [formData, setFormData] = useState({
    name: "",
    department: ""
  });
  const [loading, setLoading] = useState(false);
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(""); // Track selected department
  const regDropdownRef = useRef(null);

  const handleClosePopup = () => {
    setOpenAddPopup(false);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(
    () => {
      // Update formData when selectedDept changes
      setFormData({ ...formData, department: selectedDept });
    },
    [selectedDept]
  );

  const toggleDropdown = () => {
    setDeptDropdownOpen(!deptDropdownOpen);
  };

  const handleDeptItemClick = item => {
    setSelectedDept(item); // Update selected department
    setDeptDropdownOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const { name, department } = formData;
    if (!name.trim() || !department) {
      // Check if department is selected
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }
    try {
      const trainingType = localStorage.getItem("selectedTraining");
      await axios.post(
        "http://localhost:3000/server/training/coordinators-add",
        {
          name,
          department,
          trainingType
        }
      );
      toast.success("Coordinator Added");
      props.onCoorAdded();
      setOpenAddPopup(false);
    } catch (error) {
      console.error("Error adding coordinator:", error);
      toast.error("Error adding coordinator");
    }
    setLoading(false);
  };

 

  const isMobile = useMediaQuery("(max-width:600px)");

  const dynamicPopupStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
    width: "auto",
    width: "min(90%, 600px)",
    maxHeight: isMobile ? "95vh" : "calc(100vh - 100px)"
  };

  return (
    <div>
      <Modal open={openAddPopup} onClose={handleClosePopup}>
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
              onClick={() => setOpenAddPopup(false)}
            />
            <div className="flex  text-lg font-semibold mb-2">
              Add Coordinators
            </div>
          </div>
          <Divider />
          <div className="mt-8">
            <div>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <p className="text-sm font-semibold">Name</p>
                <input
                  type="text"
                  placeholder=""
                  id="name"
                  onChange={handleChange}
                  autoComplete="off"
                  className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base "
                />
                <p className="text-sm font-semibold">Department</p>

                <div
                  className={`reg-dropdown-button flex relative p-2 min-h-10 w-auto min-w-64 text-sm border-1 border-gray-300 bg-white rounded-md cursor-pointer ${deptDropdownOpen
                    ? "border-primary"
                    : "border-gray-300"}`}
                  onClick={toggleDropdown}
                >
                  <p>
                    {selectedDept || "Select Department"}
                  </p>
                  <IoMdArrowDropdown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  {deptDropdownOpen &&
                    <div
                      ref={regDropdownRef}
                      className="absolute top-full left-0 mt-2 min-w-64 w-full bg-white rounded-md shadow-xl z-10"
                    >
                      <button
                        onClick={() => handleDeptItemClick("Registration")}
                        className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedDept ===
                          "Registration" && "bg-blue-50 text-gray-700"}`}
                      >
                        Registration
                      </button>

                      <button
                        onClick={() => handleDeptItemClick("Environment")}
                        className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedDept ===
                          "Environment" && "bg-blue-50 text-gray-700"}`}
                      >
                        Environment
                      </button>
                      <button
                        onClick={() => handleDeptItemClick("Kitchen")}
                        className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedDept ===
                          "Kitchen" && "bg-blue-50 text-gray-700"}`}
                      >
                        Kitchen
                      </button>
                      <button
                        onClick={() =>
                          handleDeptItemClick("Living / Accommodation")}
                        className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedDept ===
                          "Living / Accommodation" &&
                          "bg-blue-50 text-gray-700"}`}
                      >
                        Living / Accommodation
                      </button>
                      <button
                        onClick={() => handleDeptItemClick("Medical")}
                        className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedDept ===
                          "Medical" && "bg-blue-50 text-gray-700"}`}
                      >
                        Medical
                      </button>
                      <button
                        onClick={() => handleDeptItemClick("Overall")}
                        className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedDept ===
                          "Overall" && "bg-blue-50 text-gray-700"}`}
                      >
                        Overall
                      </button>
                      <button
                        onClick={() =>
                          handleDeptItemClick("Audio video / Multimedia")}
                        className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedDept ===
                          "Audio video / Multimedia" &&
                          "bg-blue-50 text-gray-700"}`}
                      >
                        Audio video / Multimedia
                      </button>
                    </div>}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    disabled={loading}
                    className="bg-primary w-full text-white p-3 rounded-lg hover:opacity-85 disabled:opacity-80 text-sm sm:text-base"
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Add"}
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

export default AddCoorPopup;
