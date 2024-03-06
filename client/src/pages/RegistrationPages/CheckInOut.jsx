import React, { useState, useEffect, useRef } from "react";
import "./Reg.css";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { MdDownload } from "react-icons/md";
import YearMenuPicker from "../../components/YearMenuPicker";
import RegMenuPicker from "../../components/RegMenuPicker";
import BrDataGrid from "../../components/RegistrantsDataGrid/BrDataGrid";
import ToltDataGrid from "../../components/RegistrantsDataGrid/ToltDataGrid";
import select from "../../assets/select.png";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const CheckInOut = () => {
  const { activeMenu } = useStateContext();
  const [regDropdownOpen, setRegDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const regDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  useEffect(() => {
    const storedSelectedReg = localStorage.getItem("selectedReg");
    if (storedSelectedReg) {
      setSelectedReg(storedSelectedReg);
    }

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

  useEffect(
    () => {
      localStorage.setItem("selectedReg", selectedReg);
    },
    [selectedReg]
  );

  const handleRegItemClick = item => {
    setSelectedReg(item);
    setRegDropdownOpen(false);
  };

  const handleYearItemClick = year => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
  };

  const handleDownloadData = async () => {
    let data = [];
    if (selectedReg === "Bible Reading") {
      data = await BrDataGrid.getRegistrantsData(selectedYear);
    } else if (selectedReg === "Tour of a Lifetime") {
      data = await ToltDataGrid.getRegistrantsData(selectedYear);
    }

    // Ensure data is fetched successfully before proceeding
    if (data && data.length > 0) {
      // Filter the columns you want to include in the Excel file
      const filteredData = data.map(item => ({
        surname: item.surname,
        firstname: item.firstname,
        dateRegistered: item.dateRegistered,
        locality: item.locality,
        checkin: item.checkin,
        checkout: item.checkout,
        checkStatus: item.checkStatus
      }));

      // Convert filtered data to Excel workbook
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Registrants");

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      const excelBlob = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      // Generate file name with year
      const fileName = `${selectedReg
        .toLowerCase()
        .replace(" ", "-")}-registrants-checkin-checkout-${selectedYear}.xlsx`;

      // Save Excel file
      saveAs(excelBlob, fileName);
    } else {
      // Handle case where data couldn't be fetched
      console.error("Error fetching data.");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex relative">
        {activeMenu
          ? <div className="w-64 fixed sidebar drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>
          : <div className="w-0 drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>}
        <div
          className={`bg-gray-100 min-h-screen w-full md:flex-1 md:overflow-hidden ${activeMenu
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
            <div className="relative my-4 p-0 flex flex-col">
              <p className="absolute right-11/12 md:right-64 mr-4  top-0 text-sm text-gray-400">
                Select registration type
              </p>
              <div className="flex flex-col md:flex-row justify-end gap-2 mt-6">
                <div>
                  {/* Reg Menu */}
                  <RegMenuPicker
                    selectedReg={selectedReg}
                    handleRegItemClick={handleRegItemClick}
                    regDropdownOpen={regDropdownOpen}
                    setRegDropdownOpen={setRegDropdownOpen}
                    regDropdownRef={regDropdownRef}
                  />
                </div>
                <div className="flex flex-row md:flex-row gap-2">
                  <div className="w-full">
                    {/* Year Menu */}
                    <YearMenuPicker
                      selectedYear={selectedYear}
                      handleYearItemClick={handleYearItemClick}
                      yearDropdownOpen={yearDropdownOpen}
                      setYearDropdownOpen={setYearDropdownOpen}
                      yearDropdownRef={yearDropdownRef}
                    />
                  </div>
                  <div>
                    <Tooltip
                      arrow
                      title="Download Data"
                      placement="bottom"
                      TransitionComponent={Fade}
                    >
                      <div
                        onClick={handleDownloadData}
                        className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70"
                      >
                        <button className="text-white flex items-center">
                          <MdDownload size={22} />
                        </button>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {selectedReg
                ? <div>
                    {selectedReg === "Bible Reading" &&
                      <BrDataGrid selectedYear={selectedYear} />}
                    {selectedReg === "Tour of a Lifetime" &&
                      <ToltDataGrid selectedYear={selectedYear} />}
                  </div>
                : <div className="flex flex-col items-center justify-center h-full py-4 md:py-8">
                    <img
                      src={select}
                      alt="profile"
                      className="h-72 lg:h-1/3 w-72 lg:w-1/3 object-cover"
                    />
                    <p className="text-gray-500 text-lg font-semibold">
                      Please choose a registration type
                    </p>
                  </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;
