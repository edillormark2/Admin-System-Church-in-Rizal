import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaUnlock, FaLock } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ActionPopup = ({
  closePopup,
  selectedRegistrationformId,
  handleUpdateStatus
}) => {
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [registrantsLink, setRegistrantsLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrationData(); // Fetch both registration status and registrantsLink
  }, []);

  const fetchRegistrationData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/server/registration/registration-get/${selectedRegistrationformId}`
      );
      setRegistrationStatus(response.data.status);
      setRegistrantsLink(response.data.registrantsLink); // Store registrantsLink
    } catch (error) {
      toast.error("Error fetching registration data");
      console.error("Error fetching registration data:", error);
    } finally {
      setTimeout(() => setLoading(false), 0);
    }
  };

  const handleOpenRegistration = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/server/registration/registration-open-close/${selectedRegistrationformId}`
      );

      const updatedRegistration = response.data.registration;
      const message =
        updatedRegistration.status === "Open"
          ? "Registration has been opened"
          : "Registration has been closed";

      toast(message);
      handleUpdateStatus();
      setRegistrationStatus(updatedRegistration.status);
    } catch (error) {
      toast.error("Error updating registration status");
      console.error("Error opening/closing registration:", error);
    }
  };

  if (loading) {
    return <div />;
  }

  return (
    <div className="bg-white p-1 rounded-lg drop-shadow-xl border mt-1 border-gray-300 w-52 relative md:mt-0">
      <div
        onClick={handleOpenRegistration}
        className="flex items-center w-full p-2 mb-1 rounded-lg cursor-pointer hover:bg-gray-200"
      >
        <div className="w-10 flex justify-center items-center">
          {registrationStatus === "Open"
            ? <FaLock size={22} className="text-gray-700" />
            : <FaUnlock size={22} className="text-gray-700" />}
        </div>
        <span className="ml-2 text-sm">
          {registrationStatus === "Open"
            ? "Close Registration"
            : "Open Registration"}
        </span>
      </div>

      <Link to={registrantsLink}>
        <div className="flex items-center w-full p-2 mb-1 rounded-lg cursor-pointer hover:bg-gray-200">
          <div className="  w-10 flex justify-center items-center">
            <FaEye size={22} className="text-gray-700" />
          </div>
          <span className="ml-2 text-sm">View Registrants</span>
        </div>
      </Link>

      <Link
        to={`/registration/manage-registration/edit-details/${selectedRegistrationformId}`}
      >
        <div className="flex items-center w-full p-2 mb-1 rounded-lg cursor-pointer hover:bg-gray-200">
          <div className="  w-10 flex justify-center items-center">
            <MdEdit size={22} className="text-gray-700" />
          </div>
          <span className="ml-2 text-sm">Edit Details</span>
        </div>
      </Link>
    </div>
  );
};

export default ActionPopup;
