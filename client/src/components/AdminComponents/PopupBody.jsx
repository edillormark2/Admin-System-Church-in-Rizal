import React from "react";
import { useSelector } from "react-redux";

const PopupBody = ({ closePopup }) => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className="bg-white p-4 rounded-lg drop-shadow-xl border border-gray-200 w-60">
      <p className="capitalize">
        {currentUser.role} | {currentUser.name}
      </p>
      <button className="w-full p-2 bg-white hover:bg-gray-200 border border-gray-200 rounded-lg mb-1 mt-4">
        Profile
      </button>
      <button className="w-full p-2 bg-white hover:bg-gray-200 border border-gray-200 rounded-lg my-0">
        Log out
      </button>
    </div>
  );
};

export default PopupBody;
