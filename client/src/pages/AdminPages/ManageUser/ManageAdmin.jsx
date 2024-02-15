import React, { useState, useEffect } from "react";
import "../Admin.css";
import Navbar from "../../../components/AdminComponents/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { useStateContext } from "../../../redux/ContextProvider";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { gridClasses } from "@mui/x-data-grid";
import { TiUserAdd } from "react-icons/ti";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import CreateAdminPopup from "../../../components/AdminComponents/CreateAdminPopup";
import { Link } from "react-router-dom";

const ManageAdmin = ({ userID }) => {
  const { activeMenu } = useStateContext();
  const [adminData, setAdminData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/users/useradmin/users"
      );
      // Map the admin data to include the userID as the id
      const formattedAdminData = response.data.map(admin => ({
        ...admin,
        id: admin.userID
      }));
      setAdminData(formattedAdminData);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const handleUserCreated = () => {
    fetchAdminData();
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const filteredAdminData = adminData.filter(admin =>
    Object.values(admin).some(
      value =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const breadcrumbLinks = [
    { to: "/admin/dashboard", label: "Home" },
    { to: "/admin/manage-user", label: "Manage User" },
    { to: "", label: "Admin User" }
  ];

  const handleOpenCreate = () => {
    setOpenCreatePopup(true);
  };

  const columns = [
    {
      field: "profilePicture",
      headerName: "Profile",
      width: 40,
      flex: 1,
      minWidth: 120,
      renderCell: params =>
        <img
          src={params.value} // Assuming the value contains the URL of the image
          alt="Profile"
          className="object-cover"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
    },
    {
      field: "userID",
      headerName: "User ID",
      width: 150,
      flex: 1,
      minWidth: 120
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 120
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 140
    },
    {
      field: "password",
      headerName: "Password",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 140
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 120
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      width: 150,
      editable: false,
      flex: 1,
      minWidth: 150
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
            title="Edit"
            placement="top"
            TransitionComponent={Fade}
          >
            <Link to={`/admin/manage-user/admin-user/${params.row.userID}`}>
              <button
                style={{
                  backgroundColor: "#03C9D7",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px", // Set a fixed width
                  height: "28px", // Set a fixed height
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "30%", // To make it a circle
                  textDecoration: "none"
                }}
              >
                <AiOutlineEdit
                  title="Edit"
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
              <AiOutlineDelete
                title="Delete"
                style={{ color: "white", fontSize: "18px" }}
              />
            </button>
          </Tooltip>
        </div>
    }
  ];

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
            ? "md:ml-64"
            : ""}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md z-10">
            <Navbar />
          </div>
          <div className="my-28 md:my-16 mx-4 md:mx-16 overflow-x-auto">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold mb-2">Manage User Admin</h1>
              <Breadcrumbs links={breadcrumbLinks} />
            </div>
            <div className="flex justify-end mb-8">
              <Tooltip
                arrow
                title="Add User Admin"
                placement="bottom"
                TransitionComponent={Fade}
              >
                <div
                  onClick={handleOpenCreate}
                  className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70"
                >
                  <TiUserAdd size={22} className="text-white" />
                </div>
              </Tooltip>
            </div>
            <CreateAdminPopup
              openCreatePopup={openCreatePopup}
              setOpenCreatePopup={setOpenCreatePopup}
              onUserCreated={handleUserCreated}
            />
            <div>
              <div className="bg-white p-4  rounded-xl drop-shadow-xl">
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="form-control bg-white p-2 rounded-lg border border-gray-300 text-sm dark:bg-half-transparent dark:text-gray-200"
                    />
                    <div className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-gray-500">
                      <IoMdSearch />
                    </div>
                  </div>
                </div>
                <div
                  className={`max-w-full overflow-x-auto mt-12 ${filteredAdminData.length ===
                  0
                    ? "h-44"
                    : ""}`}
                >
                  <DataGrid
                    sx={{
                      [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                        outline: "none"
                      },
                      [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
                        outline: "none"
                      }
                    }}
                    initialState={{
                      ...filteredAdminData.initialState,
                      pagination: { paginationModel: { pageSize: 6 } }
                    }}
                    rows={filteredAdminData}
                    columns={columns}
                    pageSizeOptions={[6, 20, 50]}
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

export default ManageAdmin;
