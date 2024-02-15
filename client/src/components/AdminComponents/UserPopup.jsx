import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserPopup = ({ closePopup, buttonLink }) => {
  return (
    <div className="bg-white p-1 rounded-lg drop-shadow-xl border mt-1 border-gray-300 w-52 relative md:mt-0">
      <Link to={buttonLink}>
        <div className="flex items-center w-full p-2 rounded-lg cursor-pointer hover:bg-gray-200">
          <div className="  w-10 flex justify-center items-center">
            <FaEye size={22} className="text-gray-700" />
          </div>
          <span className="ml-2 text-sm">View User Details</span>
        </div>
      </Link>
    </div>
  );
};

export default UserPopup;
