import React, { useState, useEffect } from "react";
import "../../Reg.css";
import Navbar from "../../../../components/RegComponents/Navbar";
import Sidebar from "../../../../components/RegComponents/Sidebar";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useStateContext } from "../../../../redux/ContextProvider";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { gridClasses } from "@mui/x-data-grid";
import { TiUserAdd } from "react-icons/ti";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { MdDownload } from "react-icons/md";
import { CSVLink } from "react-csv";
import TOLTDeletePopup from "../../../../components/RegComponents/Registrants/TOLTDeletePopup";

const TOLTregistrants = () => {
  const { activeMenu } = useStateContext();
  const [registrants, setRegistrants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegistrant, setSelectedRegistrant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDeleteRegistrantsPopup, setOpenDeleteRegistrantsPopup] = useState(
    false
  );

  useEffect(() => {
    fetchRegistrantsData();
  }, []);

  const fetchRegistrantsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/server/registrants/tolt-registrants-display"
      );
      setRegistrants(response.data.registrants);

      setTimeout(() => {
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching registrants:", error);
    }
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

  const handleDeleteRegistrantsPopup = id => {
    setSelectedRegistrant(id);
    setOpenDeleteRegistrantsPopup(true);
  };

  const handleRegistrantsDeleted = async () => {
    setLoading(true);
    setTimeout(async () => {
      await fetchRegistrantsData();
      setLoading(false);
    }, 1000);
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
      field: "email",
      headerName: "Email",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 140
    },
    {
      field: "contact",
      headerName: "Contact No.",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 140
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
            <Link
              to={`/registration/manage-registration/TOLT-registrants/view-registrant/${params
                .row._id}`}
            >
              <button
                style={{
                  backgroundColor: "#F39C12",
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
                <MdOutlineRemoveRedEye
                  style={{
                    color: "white",
                    fontSize: "18px"
                  }}
                />
              </button>
            </Link>
          </Tooltip>
          <Tooltip
            arrow
            title="Delete"
            placement="top"
            TransitionComponent={Fade}
          >
            <button
              onClick={() => {
                handleDeleteRegistrantsPopup(params.row._id);
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                border: "none",
                cursor: "pointer",
                borderRadius: "30%",
                backgroundColor: "#DE3163"
              }}
            >
              <AiOutlineDelete style={{ color: "white", fontSize: "18px" }} />
            </button>
          </Tooltip>
        </div>
    }
  ];

  const breadcrumbLinks = [
    { to: "/registration/dashboard", label: "Home" },
    { to: "/registration/manage-registration", label: "Registration" },
    { to: "", label: "View Registrants" }
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
          <div className="my-28 md:my-16 mx-4 md:mx-16 ">
            <div className="mb-12">
              <h1 className="text-2xl font-semibold mb-2 ">
                Tour of a Lifetime Registrants
              </h1>
              <Breadcrumbs links={breadcrumbLinks} />
            </div>
            <div>
              <div className="flex justify-end mb-8 gap-2">
                <Tooltip
                  arrow
                  title="Download Data"
                  placement="bottom"
                  TransitionComponent={Fade}
                >
                  <div className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70">
                    <CSVLink
                      data={registrants}
                      filename={"tour-of-a-lifetime-registrants.csv"}
                      className="text-white flex items-center"
                      target="_blank"
                    >
                      <MdDownload size={22} />
                    </CSVLink>
                  </div>
                </Tooltip>
                <Tooltip
                  arrow
                  title="Add Registrants"
                  placement="bottom"
                  TransitionComponent={Fade}
                >
                  <Link to="/registration/manage-registration/TOLT-registrants/Add-TOLTregistrants">
                    <div className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70">
                      <TiUserAdd size={22} className="text-white" />
                    </div>
                  </Link>
                </Tooltip>
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
                  <TOLTDeletePopup
                    openDeleteRegistrantsPopup={openDeleteRegistrantsPopup}
                    setOpenDeleteRegistrantsPopup={
                      setOpenDeleteRegistrantsPopup
                    }
                    selectedRegistrant={selectedRegistrant}
                    onRegistrantsDeleted={handleRegistrantsDeleted}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TOLTregistrants;
