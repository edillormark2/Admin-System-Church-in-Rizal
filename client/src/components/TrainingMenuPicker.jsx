import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegAddressBook } from "react-icons/fa6";

const TrainingMenuPicker = ({
  selectedTraining,
  handleRegItemClick,
  regDropdownOpen,
  setRegDropdownOpen,
  regDropdownRef
}) => {
  const toggleDropdown = () => {
    setRegDropdownOpen(!regDropdownOpen);
  };
  return (
    <div
      className={`reg-dropdown-button flex relative p-2 min-h-10 w-auto min-w-64 text-sm border-1 border-gray-300 bg-white rounded-md cursor-pointer ${regDropdownOpen
        ? "border-primary"
        : "border-gray-300"}`}
      onClick={toggleDropdown}
    >
      <FaRegAddressBook className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <p className="px-6">
        {selectedTraining}
      </p>
      <IoMdArrowDropdown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
      {regDropdownOpen &&
        <div
          ref={regDropdownRef}
          className="absolute top-full left-0 mt-2 min-w-64 w-auto bg-white rounded-md shadow-xl z-10"
        >
          <button
            onClick={() => handleRegItemClick("Bible Reading")}
            className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedTraining ===
              "Bible Reading" && "bg-blue-50 text-gray-700"}`}
          >
            Bible Reading
          </button>

          <button
            onClick={() => handleRegItemClick("Summer School of Truth")}
            className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedTraining ===
              "Summer School of Truth" && "bg-blue-50 text-gray-700"}`}
          >
            Summer School of Truth
          </button>
          <button
            onClick={() => handleRegItemClick("Tour of a Lifetime")}
            className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedTraining ===
              "Tour of a Lifetime" && "bg-blue-50 text-gray-700"}`}
          >
            Tour of a Lifetime
          </button>
        </div>}
    </div>
  );
};

export default TrainingMenuPicker;
