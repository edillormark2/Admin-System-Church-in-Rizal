import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { gridClasses } from "@mui/x-data-grid";
import { ThreeDots } from "react-loader-spinner";
import { FaPlay } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

const ToltDataGrid = ({ selectedYear }) => {
  const [registrants, setRegistrants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  // Fetch registrants data
  useEffect(
    () => {
      fetchToltRegistrantsData();
    },
    [selectedYear]
  );

  const fetchToltRegistrantsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/server/registrants/tolt-registrants-display?year=${selectedYear}`
      );
      setRegistrants(response.data.registrants);
      setLoading(false); // Set loading to false after data fetch
    } catch (error) {
      console.error("Error fetching registrants:", error);
      setLoading(false); // Ensure loading is set to false even in case of error
    }
  };

  const columns = [
    {
      field: "surname",
      headerName: "Surname",
      width: 150,
      flex: 1,
      minWidth: 120
    },
    {
      field: "firstname",
      headerName: "Firstname",
      width: 150,
      flex: 1,
      minWidth: 120
    },
    {
      field: "dateRegistered",
      headerName: "Date Registered",
      width: 150,
      flex: 1,
      minWidth: 150
    },
    {
      field: "locality",
      headerName: "Locality",
      width: 150,
      flex: 1,
      minWidth: 120
    },
    {
      field: "check-in",
      headerName: "Check-in",
      width: 150,
      flex: 1,
      minWidth: 140
    },
    {
      field: "check-out",
      headerName: "Check-out",
      width: 150,
      flex: 1,
      minWidth: 140
    },
    {
      field: "check-status",
      headerName: "Status",
      width: 150,
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
              <FaPlay style={{ color: "white", fontSize: "18px" }} />
            </button>
          </Tooltip>
        </div>
    }
  ];

  return (
    <div>
      <div className="bg-white p-4  rounded-xl drop-shadow-xl">
        <div className="flex justify-between">
          <div className="flex relative">
            <GoDotFill className="absolute top-1/2 transform -translate-y-1/2 text-green-500" />
            <p className="ml-5 font-semibold">Tour of a Lifetime Registrants</p>
          </div>
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
        </div>
        <div
          className={`max-w-full overflow-x-auto mt-12 ${registrants.length ===
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
                rows={registrants}
                columns={columns}
                pageSizeOptions={[6, 20, 50]}
                getRowId={row => row._id}
              />}
        </div>
      </div>
    </div>
  );
};

export default ToltDataGrid;
