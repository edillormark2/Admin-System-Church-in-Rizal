import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdAddCircleOutline, MdClose } from "react-icons/md"; // Import MdClose icon
import { useMediaQuery } from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";

const EditTeamPopup = props => {
  const { openEditPopup, setOpenEditPopup, selectedTeamId } = props;
  const [formData, setFormData] = useState({
    teamName: "",
    teamMembers: [""]
  });
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const fetchTeamById = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/server/training/team-display/${selectedTeamId}`
          );
          const teamData = response.data.team;
          setFormData({
            teamName: teamData.teamName,
            teamMembers: teamData.teamMembers
          });
        } catch (error) {
          console.error("Error fetching team by ID", error);
        }
      };

      if (openEditPopup && selectedTeamId) {
        fetchTeamById();
      }
    },
    [openEditPopup, selectedTeamId]
  );

  const handleClosePopup = () => {
    setOpenEditPopup(false);
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
      await axios.put(
        `http://localhost:3000/server/training/team-edit/${selectedTeamId}`,
        {
          teamName,
          teamMembers
        }
      );
      toast.success("Team Updated");
      props.onTeamUpdated();
      setFormData({ ...formData, teamMembers: [""], teamName: "" });
      setOpenEditPopup(false);
    } catch (error) {
      toast.error("Error updating team:", error);
    }
    setLoading(false);
  };

  const handleDeleteTeam = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/server/training/team-delete/${selectedTeamId}`
      );
      toast.success("Team Deleted");
      props.onTeamDeleted();
      setOpenEditPopup(false);
    } catch (error) {
      toast.error("Error deleting team:", error);
    }
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
      <Modal open={openEditPopup} onClose={handleClosePopup}>
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
            <ModalClose variant="outlined" onClick={handleClosePopup} />
            <div className="flex text-lg font-semibold mb-2">Edit Team</div>
          </div>
          <Divider />
          <div className="mt-4">
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Team name"
                value={formData.teamName}
                onChange={handleTeamNameChange}
                autoComplete="off"
                className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base"
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
                  type="submit"
                  disabled={loading}
                  className="bg-primary w-full text-white p-3 rounded-lg hover:opacity-70 disabled:opacity-80 text-sm sm:text-base"
                >
                  {loading ? "Loading..." : "Update"}
                </button>
              </div>
            </form>
            <div className="mt-4">
              <div
                className="bg-red-100 p-2 rounded-lg cursor-pointer border border-red-500 hover:bg-white"
                onClick={handleDeleteTeam}
              >
                <p className="font-semibold text-red-500 flex justify-center">
                  <MdDeleteOutline className="self-center mr-4" size={20} />
                  Delete Team
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditTeamPopup;
