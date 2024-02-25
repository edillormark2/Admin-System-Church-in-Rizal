import React, { useState, useEffect } from "react";
import "./Reg.css";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import { GoKebabHorizontal } from "react-icons/go";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ActionPopup from "../../components/RegComponents/ManageReg/ActionPopup";
import { Divider } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaSortAmountUp } from "react-icons/fa";
import axios from "axios";

const ManageRegForm = () => {
  const { activeMenu } = useStateContext();
  const [actionPopupOpen, setActionPopupOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [placement, setPlacement] = React.useState("bottom-end");
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("sortBy") || "status";
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event, popupSetter) => {
    popupSetter(true);
    setAnchor(event.currentTarget);
  };

  const handleCloseSort = () => {
    setDropdownOpen(false);
  };

  const handleClose = () => {
    setActionPopupOpen(false);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(
    () => {
      const results = registrations.filter(registration =>
        registration.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    },
    [searchTerm, registrations]
  );

  useEffect(
    () => {
      sortRegistrations();
      localStorage.setItem("sortBy", sortBy);
    },
    [sortBy, registrations]
  );

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/registration/registration-display"
      );
      setRegistrations(response.data.registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const sortRegistrations = () => {
    if (sortBy === "status") {
      const sortedRegistrations = [...registrations].sort((a, b) =>
        a.status.localeCompare(b.status)
      );
      setSearchResults(sortedRegistrations.reverse());
    } else if (sortBy === "name") {
      const sortedRegistrations = [...registrations].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setSearchResults(sortedRegistrations);
    }
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
            <div className="mb-12">
              <h1 className="text-2xl font-semibold mb-2 ">
                Manage Registration
              </h1>
              <div className="flex justify-end mb-4 relative">
                <button
                  className="relative p-3 bg-white drop-shadow-md text-sm rounded-md cursor-pointer hover:bg-gray-100 border-gray-300"
                  onClick={e => {
                    e.preventDefault(); // Prevents default button behavior
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <FaSortAmountUp className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
                  <p className="px-6">
                    Sort by {sortBy}
                  </p>
                  <TiArrowSortedDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
                </button>
                {dropdownOpen &&
                  <div className="absolute mt-12 w-40 bg-white rounded-md shadow-xl z-10">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        setSortBy("status");
                        setDropdownOpen(false);
                      }}
                    >
                      Sort by status
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        setSortBy("name");
                        setDropdownOpen(false);
                      }}
                    >
                      Sort by name
                    </button>
                  </div>}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-read-only bg-white pl-10 py-2 md:py-3 rounded-lg border border-gray-300 text-xs md:text-sm dark:bg-half-transparent dark:text-gray-200"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-3 flex items-center pr-3 pointer-events-none">
                  <IoSearch className="text-gray-800" />
                </div>
              </div>
              <div className="w-full flex flex-wrap mt-6">
                {searchResults.length > 0
                  ? searchResults.map((registration, index) =>
                      <div
                        key={index}
                        className="w-full sm:w-full lg:w-1/2 2xl:w-1/3 p-2"
                      >
                        <div
                          className={`relative bg-white hover:bg-blue-50 rounded-md drop-shadow-xl p-2 border ${registration.status ===
                          "Open"
                            ? "border-green-400 bg-gradient-to-r from-green-100 to-white hover:bg-gradient hover:from-green-200 hover:to-white"
                            : "border-gray-300"} w-full h-48`}
                        >
                          <p
                            className={`absolute top-4 left-2 ${registration.status ===
                            "Open"
                              ? "bg-green-400"
                              : "bg-gray-400"} text-white py-1 px-2 rounded-md text-xs`}
                          >
                            {registration.status}
                          </p>
                          <div className="flex justify-end">
                            <GoKebabHorizontal
                              onClick={event =>
                                handleClick(event, setActionPopupOpen)}
                              size={37}
                              className="cursor-pointer text-gray-600 hover:bg-gray-200 p-2 rounded-full drop-shadow-md mb-4"
                            />
                          </div>
                          <Divider />
                          <div className="flex justify-between p-4 rounded-xl mt-0 mb-2">
                            <div className="flex flex-col my-2 pt-2">
                              <p className="text-black font-semibold text-sm">
                                {registration.title}
                              </p>
                              <p
                                className={`text-xl font-semibold ${registration.status ===
                                "Open"
                                  ? "text-gray-700"
                                  : "text-gray-500"}`}
                              >
                                Currently Registered
                              </p>
                            </div>
                            <div className="my-auto text-black text-4xl font-semibold pt-2">
                              0
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  : <div className="mx-auto p-8 text-gray-500 font-semibold">
                      No registrations found
                    </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {actionPopupOpen &&
        <ClickAwayListener onClickAway={handleClose}>
          <BasePopup
            id={id}
            open={Boolean(anchor)}
            anchor={anchor}
            placement={placement}
            offset={4}
            onClose={handleClose}
          >
            <ActionPopup onClose={handleClose} />
          </BasePopup>
        </ClickAwayListener>}
    </div>
  );
};

export default ManageRegForm;
