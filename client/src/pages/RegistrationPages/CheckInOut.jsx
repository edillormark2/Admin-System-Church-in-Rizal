import React, { useState, useEffect, useRef } from "react";
import "./Reg.css";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import { CSVLink } from "react-csv";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { MdDownload } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { gridClasses } from "@mui/x-data-grid";
import { ThreeDots } from "react-loader-spinner";
import YearMenuPicker from "../../components/YearMenuPicker";
import RegMenuPicker from "../../components/RegMenuPicker";
import { FaPlay } from "react-icons/fa6";

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
      headerName: "Check-in",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 140
    },
    {
      field: "check-out",
      headerName: "Check-out",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 140
    },
    {
      field: "check-status",
      headerName: "Status",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 120
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      flex: 1,
      minWidth: 120,
      renderCell: params =>
        <div className="flex justify-center gap-1">
          <Tooltip
            arrow
            title="View"
            placement="top"
            TransitionComponent={Fade}
          >
            <button
              style={{
                backgroundColor: "#58D68D",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                border: "none",
                cursor: "pointer",
                borderRadius: "30%",
                textDecoration: "none"
              }}
            >
              <FaPlay
                style={{
                  color: "white",
                  fontSize: "18px"
                }}
              />
            </button>
          </Tooltip>
        </div>
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
