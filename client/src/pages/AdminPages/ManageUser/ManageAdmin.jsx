import React, { useState, useEffect } from "react";
import "../Admin.css";
import Navbar from "../../../components/AdminComponents/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { useStateContext } from "../../../redux/ContextProvider";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const ManageAdmin = () => {
  const { activeMenu } = useStateContext();
  const [adminData, setAdminData] = useState([]);

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

  const breadcrumbLinks = [
    { to: "/admin/dashboard", label: "Home" },
    { to: "/admin/manage-user", label: "Manage User" },
    { to: "", label: "Admin User" }
  ];

  const columns = [
    { field: "userID", headerName: "User ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      editable: true
    },
    {
      field: "password",
      headerName: "Password",
      width: 110,
      editable: true
    },
    {
      field: "role",
      headerName: "Role",
      width: 110,
      editable: true
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      width: 150, // Adjust width as needed
      editable: true
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
          className={` bg-white min-h-screen w-full  ${activeMenu
            ? "md:ml-60"
            : "flex-1"}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md">
            <Navbar />
          </div>
          <div className="my-20 md:my-16 mx-10 md:mx-16 ">
            <div className="mb-12">
              <h1 className="text-2xl font-semibold mb-2 ">
                Manage User Admin
              </h1>
              <Breadcrumbs links={breadcrumbLinks} />
            </div>
            <div>
              <DataGrid
                rows={adminData}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
