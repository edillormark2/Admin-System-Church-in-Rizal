import React, { useState, useEffect, useRef } from "react";
import "./Reg.css";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import { CSVLink } from "react-csv";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { MdDownload } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa6";
import { FaRegAddressBook } from "react-icons/fa6";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { gridClasses } from "@mui/x-data-grid";
import { ThreeDots } from "react-loader-spinner";

const CheckInOut = () => {
  const { activeMenu } = useStateContext();
  const [regDropdownOpen, setRegDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [registrants, setRegistrants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegistrant, setSelectedRegistrant] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  // Filter registrants based on search query
  const filteredRegistrants = registrants.filter(registrant =>
    Object.values(registrant).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  useEffect(() => {
    fetchRegistrantsData();
  }, []);

  const fetchRegistrantsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/server/registrants/registrants-display"
      );
      setRegistrants(response.data.registrants);

      setTimeout(() => {
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching registrants:", error);
    }
  };

  const columns = [
    {
      field: "surname",
      headerName: "Surname",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 120
    },
    {
      field: "firstname",
      headerName: "Firstname",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 120
    },
    {
      field: "dateRegistered",
      headerName: "Date Registered",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 150
    },
    {
      field: "locality",
      headerName: "Locality",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 120
    },
    {
      field: "check-in",
      headerName: "Check in",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 140
    },
    {
      field: "check-out",
      headerName: "Check out",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 140
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 120
    }
  ];

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
                  {/*Reg Menu */}
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
                          onClick={() =>
                            handleRegItemClick(
                              "Combined Young People's Meeting"
                            )}
                          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
                            "Combined Young People's Meeting" &&
                            "bg-blue-50 text-gray-700"}`}
                        >
                          Combined Young People's Meeting
                        </button>
                        <button
                          onClick={() =>
                            handleRegItemClick("Combined Lord's Table Meeting")}
                          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
                            "Combined Lord's Table Meeting" &&
                            "bg-blue-50 text-gray-700"}`}
                        >
                          Combined Lord's Table Meeting
                        </button>
                        <button
                          onClick={() =>
                            handleRegItemClick("Coordinators Meeting")}
                          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
                            "Coordinators Meeting" &&
                            "bg-blue-50 text-gray-700"}`}
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
                          onClick={() =>
                            handleRegItemClick("Fellowship Among the Churches")}
                          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
                            "Fellowship Among the Churches" &&
                            "bg-blue-50 text-gray-700"}`}
                        >
                          Fellowship Among the Churches
                        </button>
                        <button
                          onClick={() =>
                            handleRegItemClick("Summer School of Truth")}
                          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
                            "Summer School of Truth" &&
                            "bg-blue-50 text-gray-700"}`}
                        >
                          Summer School of Truth
                        </button>
                        <button
                          onClick={() =>
                            handleRegItemClick("Tour of a life time")}
                          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedReg ===
                            "Tour of a life time" &&
                            "bg-blue-50 text-gray-700"}`}
                        >
                          Tour of a life time
                        </button>
                      </div>}
                  </div>
                  {/*Year Menu */}
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
                  </div>
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
              <div className="bg-white p-4  rounded-xl drop-shadow-xl">
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="form-control bg-white p-2 md:p-2 rounded-lg border border-gray-300 text-xs md:text-sm dark:bg-half-transparent dark:text-gray-200"
                    />
                    <div className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-gray-500">
                      <IoMdSearch />
                    </div>
                  </div>
                </div>
                <div
                  className={`max-w-full overflow-x-auto mt-12 ${filteredRegistrants.length ===
                  0
                    ? "h-44"
                    : ""}`}
                >
                  {loading
                    ? <div className="p-16 flex flex-col items-center">
                        <ThreeDots
                          visible={true}
                          height="80"
                          width="80"
                          color="#85929E"
                          radius="9"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    : <DataGrid
                        sx={{
                          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                            outline: "none"
                          },
                          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
                            outline: "none"
                          }
                        }}
                        initialState={{
                          pagination: { paginationModel: { pageSize: 6 } }
                        }}
                        rows={filteredRegistrants}
                        columns={columns}
                        pageSizeOptions={[6, 20, 50]}
                        getRowId={row => row._id}
                      />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;
