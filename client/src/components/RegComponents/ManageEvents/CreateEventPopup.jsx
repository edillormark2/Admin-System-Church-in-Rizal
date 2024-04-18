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
import { MdAddCircleOutline } from "react-icons/md";
import { MdClose } from "react-icons/md"; // Import MdClose icon
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FaCheck } from "react-icons/fa"; // Import FaCheck icon

const CreateEventPopup = props => {
  const { openCreatePopup, setOpenCreatePopup } = props;
  const currentDate = dayjs();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    color: "bg-blue-500"
  });
  const [loading, setLoading] = useState(false);
  const handleClosePopup = () => {
    setOpenCreatePopup(false);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleColorChange = color => {
    setFormData({ ...formData, color });
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
    maxHeight: isMobile ? "95vh" : "calc(100vh - 100px)",
    overflowY: "auto"
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
            <div className="flex  text-lg font-semibold mb-2">New Event</div>
          </div>
          <Divider />
          <div className="mt-4">
            <div>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <p className="text-sm font-semibold">Title</p>
                    <input
                      type="text"
                      placeholder=""
                      id="Title"
                      maxLength={30}
                      autoComplete="off"
                      onChange={handleChange}
                      value={formData.location}
                      className="form-control bg-white p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm font-semibold">Location</p>
                    <input
                      type="text"
                      placeholder=""
                      id="location"
                      autoComplete="off"
                      maxLength={20}
                      onChange={handleChange}
                      value={formData.price}
                      className="form-control bg-white p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="flex w-full flex-col md:flex-row gap-4 mb-4">
                      <div className="w-full">
                        <p className="text-sm font-semibold mb-2">Start Date</p>
                        <DatePicker
                          defaultValue={currentDate}
                          className="w-full"
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-sm font-semibold mb-2">End Date</p>
                        <DatePicker
                          defaultValue={currentDate}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </LocalizationProvider>
                </div>

                <div className="flex flex-col">
                  <p className="text-sm font-semibold mb-2">Color Label</p>
                  <div className="w-full flex gap-2">
                    {[
                      "bg-blue-500",
                      "bg-green-500",
                      "bg-yellow-500",
                      "bg-orange-500",
                      "bg-red-500",
                      "bg-violet-500"
                    ].map((color, index) =>
                      <div
                        key={index}
                        className={`relative p-4 rounded-full ${color} w-10 h-10 cursor-pointer hover:opacity-80 ${formData.color ===
                        color
                          ? "ring-offset-2 ring"
                          : ""}`}
                        onClick={() => handleColorChange(color)}
                      >
                        {formData.color === color &&
                          <FaCheck className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-8">
                  <button
                    disabled={loading}
                    className="bg-primary w-24 text-white p-3 rounded-lg hover:opacity-70 disabled:opacity-80 text-sm sm:text-base"
                  >
                    {loading ? "Loading..." : "Save"}
                  </button>
                  <button
                    onClick={handleClosePopup}
                    className="bg-gray-200 w-24 hover:bg-gray-300 p-3 rounded-lg text-sm sm:text-base"
                  >
                    Cancel
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

export default CreateEventPopup;
