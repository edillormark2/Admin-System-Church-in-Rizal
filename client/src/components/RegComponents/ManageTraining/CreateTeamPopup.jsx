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

const CreateTeamPopup = props => {
  const { openCreatePopup, setOpenCreatePopup } = props;
  const [formData, setFormData] = useState({
    teamName: "",
    teamMembers: [""]
  });
  const [loading, setLoading] = useState(false);
  const handleClosePopup = () => {
    setOpenCreatePopup(false);
  };

  const handleTeamNameChange = e => {
    const { value } = e.target;
    setFormData({ ...formData, teamName: value });
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const teamMembersCopy = [...formData.teamMembers];
    teamMembersCopy[index] = value;
    setFormData({ ...formData, teamMembers: teamMembersCopy });
  };

  const handleRemoveTeamMember = index => {
    const teamMembersCopy = [...formData.teamMembers];
    teamMembersCopy.splice(index, 1);
    setFormData({ ...formData, teamMembers: teamMembersCopy });
  };

  const handleAddTeamMember = () => {
    setFormData({ ...formData, teamMembers: [...formData.teamMembers, ""] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const { teamName, teamMembers } = formData;

    if (!teamName.trim()) {
      toast.error("Team name cannot be empty");
      setLoading(false);
      return;
    }

    if (teamMembers.some(member => !member.trim())) {
      toast.error("Team members cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const trainingType = localStorage.getItem("selectedTraining");
      await axios.post("http://localhost:3000/server/training/team-create", {
        teamName,
        teamMembers,
        trainingType
      });
      toast.success("Team Created");
      props.onTeamCreated();
      setFormData({ ...formData, teamMembers: [""], teamName: "" });
      setOpenCreatePopup(false);
    } catch (error) {
      toast.error("Error creating team:", error);
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
            <div className="flex  text-lg font-semibold mb-2">Create Team</div>
          </div>
          <Divider />
          <div className="mt-8">
            <div>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Team name"
                  id="teamName"
                  onChange={handleTeamNameChange}
                  autoComplete="off"
                  className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base "
                />
                {formData.teamMembers.map((member, index) =>
                  <div key={index} className="flex items-center relative">
                    <input
                      type="text"
                      placeholder="Team member name"
                      value={member}
                      onChange={e => handleChange(e, index)}
                      autoComplete="off"
                      className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base pr-8" // Add padding for the close icon
                    />
                    {index > 0 && // Render close icon only for indexes greater than 0
                      <MdClose
                        size={28}
                        onClick={() => handleRemoveTeamMember(index)}
                        className="text-gray-400 cursor-pointer absolute right-3 top-3 hover:bg-gray-200 p-1 rounded-full" // Position the close icon absolutely
                      />}
                  </div>
                )}

                <div className="mt-2">
                  <div
                    className="bg-blue-100 p-2 rounded-lg cursor-pointer border border-blue-500 hover:bg-white"
                    onClick={handleAddTeamMember}
                  >
                    <p className="font-semibold text-blue-500 flex justify-center">
                      <MdAddCircleOutline
                        className="self-center mr-4"
                        size={20}
                      />
                      Add Team Member
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-8">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-primary w-full text-white p-3 rounded-lg hover:opacity-70 disabled:opacity-80 text-sm sm:text-base"
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

export default CreateTeamPopup;
