import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa6";

const YearMenuPicker = ({
  selectedYear,
  handleYearItemClick,
  yearDropdownOpen,
  setYearDropdownOpen,
  yearDropdownRef
}) => {
  const currentYear = new Date().getFullYear(); // Get current year

  // Generate an array of years from the current year to 5 years back
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

  return (
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
          className="absolute top-full left-0 mt-2 w-28 bg-white rounded-md shadow-xl z-50"
        >
          {/* Map through the years array to create buttons for each year */}
          {years.map(year =>
            <button
              key={year}
              onClick={() => handleYearItemClick(String(year))}
              className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-center ${selectedYear ===
                String(year) && "bg-blue-50 text-gray-700"}`}
            >
              {year}
            </button>
          )}
        </div>}
    </div>
  );
};

export default YearMenuPicker;
