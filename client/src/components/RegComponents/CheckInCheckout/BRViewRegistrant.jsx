import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "@mui/material";
import { FaUser } from "react-icons/fa6";

const BRViewRegistrant = props => {
  const {
    openViewRegistrant,
    setOpenViewRegistrant,
    selectedRegistrant
  } = props;

  const [registrantData, setRegistrantData] = useState({
    surname: "",
    firstname: "",
    dateRegistered: "",
    locality: "",
    checkin: "",
    checkout: "",
    checkStatus: ""
  });

  const fetchRegistrantData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/server/registrants/br-registrant-display/${selectedRegistrant}`
      );
      const registrantData = response.data.registrant;
      setRegistrantData(registrantData);
    } catch (error) {
      console.error("Error fetching registration data:", error);
      toast.error("Error fetching registration data");
    }
  };

  useEffect(
    () => {
      if (openViewRegistrant) {
        fetchRegistrantData();
      }
    },
    [openViewRegistrant, selectedRegistrant]
  );

  const handleClosePopup = () => {
    setOpenViewRegistrant(false);
  };

  const handleCheckIn = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleString("default", {
        month: "short"
      })} ${currentDate.getDate()}, ${currentDate.getFullYear()} | ${currentDate.toLocaleTimeString(
        [],
        {
          hour: "numeric",
          minute: "2-digit"
        }
      )}`;
      await axios.put(
        `http://localhost:3000/server/registrants/br-registrant-update-checkin/${selectedRegistrant}`,
        {
          checkin: formattedDate,
          checkStatus: "Checked In" // Update checkStatus field
        }
      );
      toast.success("Check-in successful");
      fetchRegistrantData(); // Fetch updated data after successful check-in
      props.onCheckCreated();
    } catch (error) {
      console.error("Error checking in:", error);
      toast.error("Error checking in");
    }
  };

  const handleCheckOut = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleString("default", {
        month: "short"
      })} ${currentDate.getDate()}, ${currentDate.getFullYear()} | ${currentDate.toLocaleTimeString(
        [],
        {
          hour: "numeric",
          minute: "2-digit"
        }
      )}`;
      await axios.put(
        `http://localhost:3000/server/registrants/br-registrant-update-checkout/${selectedRegistrant}`,
        {
          checkout: formattedDate,
          checkStatus: "Checked Out" // Update checkStatus field
        }
      );
      toast.success("Check-out successful");
      fetchRegistrantData(); // Fetch updated data after successful check-out
      props.onCheckCreated();
    } catch (error) {
      console.error("Error checking out:", error);
      toast.error("Error checking out");
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
    width: "min(90%, 550px)",
    maxHeight: isMobile ? "95vh" : "calc(100vh - 100px)"
  };

  let buttonsToShow = [];
  if (registrantData.checkStatus === "Registered") {
    buttonsToShow = [
      <div
        key="close-button"
        onClick={handleClosePopup}
        className="bg-gray-300 rounded-md text-black shadow-lg p-3 hover:opacity-70 cursor-pointer w-24 text-center"
      >
        Close
      </div>,
      <div
        key="check-in-button"
        onClick={handleCheckIn}
        className="bg-green-500 rounded-md text-white shadow-lg p-3 hover:opacity-70 cursor-pointer w-24 text-center"
      >
        Check In
      </div>
    ];
  } else if (registrantData.checkStatus === "Checked In") {
    buttonsToShow = [
      <div
        key="close-button"
        onClick={handleClosePopup}
        className="bg-gray-300 rounded-md text-black shadow-lg p-3 hover:opacity-70 cursor-pointer w-24 text-center"
      >
        Close
      </div>,
      <div
        key="check-out-button"
        onClick={handleCheckOut}
        className="bg-red-500 rounded-md text-white shadow-lg p-3 hover:opacity-70 cursor-pointer w-28 text-center"
      >
        Check Out
      </div>
    ];
  } else if (registrantData.checkStatus === "Checked Out") {
    buttonsToShow = [
      <div
        key="close-button"
        onClick={handleClosePopup}
        className="bg-gray-300 rounded-md text-black shadow-lg p-3 hover:opacity-70 cursor-pointer w-24 text-center"
      >
        Close
      </div>
    ];
  }

  return (
    <div>
      <Modal open={openViewRegistrant} onClose={handleClosePopup}>
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
              onClick={() => setOpenViewRegistrant(false)}
            />
            <div className="flex justify-start  mb-8">
              <FaUser size={20} className="my-auto mr-4 text-gray-500" />
              <p className="text-base font-semibold">
                Bible Reading Registrant
              </p>
            </div>
          </div>
          <Divider />
          <div>
            <div className="flex justify-between my-4">
              <p className="font-semibold text-md">Name</p>
              <p>
                {registrantData.firstname} {registrantData.surname}
              </p>
            </div>
            <Divider />
            <div className="flex justify-between my-4">
              <p className="font-semibold">Locality</p>
              <p>
                {registrantData.locality}
              </p>
            </div>
            <Divider />
            <div className="flex justify-between my-4">
              <p className="font-semibold">Date Registered</p>
              <p>
                {registrantData.dateRegistered}
              </p>
            </div>
            <Divider />
            <div className="flex justify-between my-4">
              <p className="font-semibold">Check In</p>
              <p>
                {registrantData.checkin}
              </p>
            </div>
            <Divider />
            <div className="flex justify-between my-4">
              <p className="font-semibold">Check Out</p>
              <p>
                {registrantData.checkout}
              </p>
            </div>
            <Divider />
            <div className="flex justify-between my-4">
              <p className="font-semibold">Status</p>
              <p>
                {registrantData.checkStatus}
              </p>
            </div>
            <Divider />
            <div className="flex justify-end mt-8 gap-2">
              {buttonsToShow}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BRViewRegistrant;
