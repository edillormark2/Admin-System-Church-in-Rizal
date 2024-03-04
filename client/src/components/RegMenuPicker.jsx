import React from "react";
import { MdDownload } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegAddressBook } from "react-icons/fa6";

const RegMenuPicker = ({
  selectedReg,
  handleRegItemClick,
  regDropdownOpen,
  setRegDropdownOpen,
  regDropdownRef
}) =>
  <div
    className="reg-dropdown-button flex relative p-2 border  text-sm min-w-64 w-auto border-gray-200 bg-white shadow-lg rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-200"
    onClick={() => setRegDropdownOpen(!regDropdownOpen)}
  >
    <FaRegAddressBook className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
    <p className="px-6">
      {selectedReg}
    </p>
    <IoMdArrowDropdown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
    {regDropdownOpen &&
      <div
        ref={regDropdownRef}
        className="absolute top-full left-0 mt-2 min-w-64 w-auto bg-white rounded-md shadow-xl z-10"
      >
        <button
          onClick={() => handleRegItemClick("Bible Reading")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
            "Bible Reading" && "bg-blue-50 text-gray-700"}`}
        >
          Bible Reading
        </button>
        <button
          onClick={() => handleRegItemClick("Combined Young People's Meeting")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
            "Combined Young People's Meeting" && "bg-blue-50 text-gray-700"}`}
        >
          Combined Young People's Meeting
        </button>
        <button
          onClick={() => handleRegItemClick("Combined Lord's Table Meeting")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
            "Combined Lord's Table Meeting" && "bg-blue-50 text-gray-700"}`}
        >
          Combined Lord's Table Meeting
        </button>
        <button
          onClick={() => handleRegItemClick("Coordinators Meeting")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
            "Coordinators Meeting" && "bg-blue-50 text-gray-700"}`}
        >
          Coordinators Meeting
        </button>
        <button
          onClick={() => handleRegItemClick("Family Day")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
            "Family Day" && "bg-blue-50 text-gray-700"}`}
        >
          Family Day
        </button>
        <button
          onClick={() => handleRegItemClick("Fellowship Among the Churches")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
            "Fellowship Among the Churches" && "bg-blue-50 text-gray-700"}`}
        >
          Fellowship Among the Churches
        </button>
        <button
          onClick={() => handleRegItemClick("Summer School of Truth")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
            "Summer School of Truth" && "bg-blue-50 text-gray-700"}`}
        >
          Summer School of Truth
        </button>
        <button
          onClick={() => handleRegItemClick("Tour of a Lifetime")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
            "Tour of a Lifetime" && "bg-blue-50 text-gray-700"}`}
        >
          Tour of a Lifetime
        </button>
      </div>}
  </div>;

export default RegMenuPicker;
