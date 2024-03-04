import React, { useState, useEffect, useRef } from "react";
import "./Reg.css";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import { CSVLink } from "react-csv";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { MdDownload } from "react-icons/md";
import YearMenuPicker from "../../components/YearMenuPicker";
import RegMenuPicker from "../../components/RegMenuPicker";
import BrDataGrid from "../../components/RegistrantsDataGrid/BrDataGrid";
import ToltDataGrid from "../../components/RegistrantsDataGrid/ToltDataGrid";

const CheckInOut = () => {
  const { activeMenu } = useStateContext();
  const [regDropdownOpen, setRegDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const regDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        (regDropdownRef.current &&
          !regDropdownRef.current.contains(event.target) &&
          !event.target.closest(".reg-dropdown-button")) ||
        (yearDropdownRef.current &&
          !yearDropdownRef.current.contains(event.target) &&
          !event.target.closest(".year-dropdown-button"))
      ) {
        setRegDropdownOpen(false);
        setYearDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleRegItemClick = item => {
    setSelectedReg(item);
    setRegDropdownOpen(false);
  };

  const handleYearItemClick = year => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex relative ">
        {activeMenu
          ? <div className="w-64 fixed sidebar drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>
          : <div className="w-0 drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>}
        <div
          className={` bg-gray-100 min-h-screen w-full md:flex-1 md:overflow-hidden ${activeMenu
            ? "lg:ml-60"
            : "flex-1"}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md">
            <Navbar />
          </div>
          <div className="my-28 md:my-16 mx-10 md:mx-16 ">
            <h1 className="text-2xl font-semibold mb-2 ">
              Check-in | Check-out
            </h1>
            <div>
              <div className="my-4 p-4 ">
                <div className="flex justify-end gap-3">
                  {/* Reg Menu */}
                  <RegMenuPicker
                    selectedReg={selectedReg}
                    handleRegItemClick={handleRegItemClick}
                    regDropdownOpen={regDropdownOpen}
                    setRegDropdownOpen={setRegDropdownOpen}
                    regDropdownRef={regDropdownRef}
                  />
                  {/* Year Menu */}
                  <YearMenuPicker
                    selectedYear={selectedYear}
                    handleYearItemClick={handleYearItemClick}
                    yearDropdownOpen={yearDropdownOpen}
                    setYearDropdownOpen={setYearDropdownOpen}
                    yearDropdownRef={yearDropdownRef}
                  />
                  <Tooltip
                    arrow
                    title="Download Data"
                    placement="bottom"
                    TransitionComponent={Fade}
                  >
                    <div className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70 text-white">
                      <MdDownload size={24} />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div>
              <div>
                {selectedReg === "Bible Reading" &&
                  <BrDataGrid selectedYear={selectedYear} />}
                {selectedReg === "Tour of a Lifetime" &&
                  <ToltDataGrid selectedYear={selectedYear} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;
