import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

const EditPopup = props => {
  const { openEditPopup, setOpenEditPopup, _id } = props;
  const { currentUser } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const fetchAnnouncementData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/server/announcement/announcement-display/${_id}`
          );
          const { title, description } = response.data;
          setFormData({ title, description });
        } catch (error) {
          console.error("Error fetching announcement data:", error);
          toast.error("Failed to fetch announcement data");
        }
      };

      if (openEditPopup && _id) {
        fetchAnnouncementData();
      }
    },
    [openEditPopup, _id]
  );

  const handleClosePopup = () => {
    setOpenEditPopup(false);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const { title, description } = formData;
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }
    if (title.trim() === "" || description.trim() === "") {
      toast.error("Title and Description cannot be whitespace only");
      setLoading(false);
      return;
    }
    try {
      await axios.put(
        `http://localhost:3000/server/announcement/announcement-update/${_id}`,
        {
          title,
          description
        }
      );
      toast.success("Announcement updated successfully");
      props.onAnnouncementUpdated();
      setLoading(false);
      setOpenEditPopup(false);
    } catch (error) {
      console.error("Error updating announcement:", error);
      toast.error("Failed to update announcement");
      setLoading(false);
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
    maxHeight: isMobile ? "95vh" : "calc(100vh - 100px)"
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
            <ModalClose
              variant="outlined"
              onClick={() => setOpenEditPopup(false)}
            />
            <div className="flex justify-center mx-auto text-lg font-semibold mb-2">
              Edit Announcement
            </div>
          </div>
          <Divider />
          <div className="mt-8">
            <div>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <p className="text-sm font-semibold">Title</p>
                <input
                  type="text"
                  placeholder=""
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  autoComplete="off"
                  className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base "
                />
                <p className="text-sm font-semibold">Description</p>
                <textarea
                  placeholder=""
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  autoComplete="off"
                  className="form-control bg-white p-3 rounded-lg border border-gray-300 text-sm sm:text-base overflow-scroll"
                  rows="4"
                  style={{
                    minHeight: "4rem",
                    maxHeight: isMobile ? "18rem" : "26rem"
                  }}
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    disabled={loading}
                    className="bg-primary w-full text-white p-3 rounded-lg hover:opacity-85 disabled:opacity-80 text-sm sm:text-base"
                  >
                    {loading ? "Loading..." : "Update"}
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

export default EditPopup;
