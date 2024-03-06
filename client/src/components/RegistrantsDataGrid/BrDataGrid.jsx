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
import BRViewRegistrant from "../RegComponents/CheckInCheckout/BRViewRegistrant";

const BrDataGrid = ({ selectedYear }) => {
  const [registrants, setRegistrants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRegistrant, setSelectedRegistrant] = useState(null);
  const [openViewRegistrant, setOpenViewRegistrant] = useState(false);

  const handleViewRegistrant = id => {
    setSelectedRegistrant(id);
    setOpenViewRegistrant(true);
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

  // Fetch registrants data
  useEffect(
    () => {
      fetchRegistrantsData();
    },
    [selectedYear]
  );

  const fetchRegistrantsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/server/registrants/br-registrants-display?year=${selectedYear}`
      );
      setRegistrants(response.data.registrants);
      setLoading(false); // Set loading to false after data fetch
    } catch (error) {
      console.error("Error fetching registrants:", error);
      setLoading(false); // Ensure loading is set to false even in case of error
    }
  };

  const handleCheckCreated = async () => {
    setOpenViewRegistrant(false);
    setLoading(true);
    setTimeout(async () => {
      await fetchRegistrantsData();
      setLoading(false);
    }, 800);
  };

  const RegistrantGridStatus = props => {
    let bgColorClass = "";

    switch (props.checkStatus) {
      case "Registered":
        bgColorClass = "bg-yellow-600";
        break;
      case "Checked In":
        bgColorClass = "bg-green-500";
        break;
      case "Checked Out":
        bgColorClass = "bg-red-500";
        break;
      default:
        bgColorClass = "";
    }

    return (
      <button
        type="button"
        className={`px-2 py-1 w-24 capitalize rounded-2xl text-md text-white ${bgColorClass}`}
      >
        {props.checkStatus}
      </button>
    );
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
      field: "checkin",
      headerName: "Check-in",
      width: 150,
      flex: 1,
      minWidth: 140
    },
    {
      field: "checkout",
      headerName: "Check-out",
      width: 150,
      flex: 1,
      minWidth: 140
    },
    {
      field: "checkStatus",
      headerName: "Status",
      width: 150,
      flex: 1,
      minWidth: 150,
      renderCell: params => <RegistrantGridStatus checkStatus={params.value} />
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
              onClick={() => {
                handleViewRegistrant(params.row._id);
              }}
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
      <div className="bg-white p-4 rounded-xl drop-shadow-xl">
        <div className="flex justify-between">
          <div className="flex relative">
            <GoDotFill className="absolute top-1/2 transform -translate-y-1/2 text-green-500" />
            <p className="ml-5 font-semibold text-sm md:text-base">
              Bible Reading Registrants
            </p>
          </div>
          <div className="absolute top-0 right-0 w-full md:w-auto mt-12 md:mt-4 mr-3 pl-8">
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
          className={`max-w-full overflow-x-auto mt-14 ${filteredRegistrants.length ===
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
                rows={filteredRegistrants}
                columns={columns}
                pageSizeOptions={[6, 20, 50]}
                getRowId={row => row._id}
              />}
        </div>
        <BRViewRegistrant
          openViewRegistrant={openViewRegistrant}
          setOpenViewRegistrant={setOpenViewRegistrant}
          selectedRegistrant={selectedRegistrant}
          onCheckCreated={handleCheckCreated}
        />
      </div>
    </div>
  );
};

// Static method to get registrants data
BrDataGrid.getRegistrantsData = async selectedYear => {
  try {
    const response = await axios.get(
      `http://localhost:3000/server/registrants/br-registrants-display?year=${selectedYear}`
    );
    return response.data.registrants;
  } catch (error) {
    console.error("Error fetching registrants:", error);
    return []; // Return an empty array in case of error
  }
};

export default BrDataGrid;
