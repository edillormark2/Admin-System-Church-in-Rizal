import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa6";

const YearMenuPicker = ({
  selectedYear,
  handleYearItemClick,
  yearDropdownOpen,
  setYearDropdownOpen,
  yearDropdownRef
}) =>
  <div
    className="year-dropdown-button flex relative p-2 w-28 text-sm border border-gray-200 bg-white shadow-lg rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-200"
    onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
  >
    <FaRegCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
    <p className="px-6">
      {selectedYear}
    </p>
    <IoMdArrowDropdown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
    {yearDropdownOpen &&
      <div
        ref={yearDropdownRef}
        className="absolute top-full left-0 mt-2 w-28 bg-white rounded-md shadow-xl z-10"
      >
        <button
          onClick={() => handleYearItemClick("2024")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-center ${selectedYear ===
            "2024" && "bg-blue-50 text-gray-700"}`}
        >
          2024
        </button>
        <button
          onClick={() => handleYearItemClick("2023")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-center ${selectedYear ===
            "2023" && "bg-blue-50 text-gray-700"}`}
        >
          2023
        </button>
        <button
          onClick={() => handleYearItemClick("2022")}
          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-center ${selectedYear ===
            "2022" && "bg-blue-50 text-gray-700"}`}
        >
          2022
        </button>
      </div>}
  </div>;

export default YearMenuPicker;
