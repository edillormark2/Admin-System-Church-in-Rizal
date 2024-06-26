import React, { useState, useEffect, useRef } from "react";
import "../Reg.css";
import Navbar from "../../../components/RegComponents/Navbar";
import Sidebar from "../../../components/RegComponents/Sidebar";
import { useStateContext } from "../../../redux/ContextProvider";
import Breadcrumbs from "../../../components/Breadcrumbs";
import YearMenuPicker from "../../../components/YearMenuPicker";
import TrainingMenuPicker from "../../../components/TrainingMenuPicker";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { TiUserAdd } from "react-icons/ti";
import { Divider } from "@mui/material";
import AddCoorPopup from "../../../components/RegComponents/ManageTraining/AddCoorPopup";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import nocoor from "../../../assets/nocoor.png";
import { ThreeDots } from "react-loader-spinner";
import select from "../../../assets/select.png";

const Coordinators = () => {
  const { activeMenu } = useStateContext();
  const [regDropdownOpen, setRegDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [coordinators, setCoordinators] = useState([]);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const regDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  useEffect(() => {
    const storedSelectedTraining = localStorage.getItem("selectedTraining");
    if (storedSelectedTraining) {
      setSelectedTraining(storedSelectedTraining);
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
      localStorage.setItem("selectedTraining", selectedTraining);
    },
    [selectedTraining]
  );

  useEffect(
    () => {
      fetchData();
    },
    [selectedTraining, selectedYear]
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/training/coordinators-display",
        {
          params: {
            selectedTraining,
            selectedYear
          }
        }
      );
      setCoordinators(response.data);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching coordinators:", error);
      setShowLoader(false);
    }
  };

  const fetchLatestData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/training/coordinators-display",
        {
          params: {
            selectedTraining,
            selectedYear
          }
        }
      );
      setCoordinators(response.data);
    } catch (error) {
      console.error("Error fetching latest coordinators data:", error);
    }
  };

  const handleRegItemClick = item => {
    setSelectedTraining(item);
    setRegDropdownOpen(false);
  };

  const handleYearItemClick = year => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
  };

  const handleOpenAdd = () => {
    setOpenAddPopup(true);
  };

  const handleCoordAdded = async () => {
    setOpenAddPopup(false); // Close the add coordinator popup
    fetchLatestData(); // Fetch the latest data
  };

  const handleDeleteCoordinator = async id => {
    try {
      await axios.delete(
        `http://localhost:3000/server/training/coordinators-delete/${id}`
      );
      fetchLatestData();
    } catch (error) {
      console.error("Error deleting coordinator:", error);
    }
  };

  const getCoordinatorsByDepartment = department => {
    return coordinators
      .filter(coordinator => coordinator.department === department)
      .map(coordinator =>
        <div className="flex justify-between py-1" key={coordinator._id}>
          <p className="text-gray-600">
            {coordinator.name}
          </p>
          <p
            className="self-center text-gray-400 hover:bg-gray-200 cursor-pointer rounded-full p-1 "
            onClick={() => handleDeleteCoordinator(coordinator._id)}
          >
            <MdDelete size={20} />
          </p>
        </div>
      );
  };

  const breadcrumbLinks = [
    { to: "/registration/dashboard", label: "Home" },
    { to: "/registration/manage-training", label: "Manage Training" },
    { to: "", label: "Coordinators" }
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
            <h1 className="text-2xl font-semibold mb-2 ">Coordinators</h1>
            <Breadcrumbs links={breadcrumbLinks} />
            <div className="relative my-4 p-0 flex flex-col">
              <p className="absolute right-11/12 md:right-72 mr-2  top-0 text-sm text-gray-400">
                Select training type
              </p>
              <div className="flex flex-col md:flex-row justify-end gap-2 mt-6">
                <div>
                  {/* Reg Menu */}
                  <TrainingMenuPicker
                    selectedTraining={selectedTraining}
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
                      title="Add coordinators"
                      placement="bottom"
                      TransitionComponent={Fade}
                    >
                      <div
                        onClick={handleOpenAdd}
                        className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70"
                      >
                        <button className="text-white flex items-center">
                          <TiUserAdd size={22} />
                        </button>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
              {selectedTraining
                ? showLoader
                  ? <div className="p-16 mt-20 flex flex-col items-center">
                      <ThreeDots
                        visible={true}
                        height={80}
                        width={80}
                        color="#85929E"
                        radius={9}
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                      <p>Loading</p>
                    </div>
                  : coordinators.length === 0
                    ? <div className="flex flex-col items-center text-gray-500 mt-8">
                        <img
                          src={nocoor}
                          alt="img"
                          className="h-72 lg:h-1/3 w-72 lg:w-1/3 object-cover"
                        />
                        <p className="text-xl font-semibold">
                          No Coordinators Assigned Yet
                        </p>
                      </div>
                    : <div>
                        <div className="w-full flex flex-wrap justify-left mt-12 ">
                          <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/4 pr-3 py-3 ">
                            <p className="font-semibold text-lg">
                              Registration
                            </p>
                            <div className="bg-white  rounded-md drop-shadow-lg p-4 mt-4">
                              <p className="pb-2">Department In-charge</p>
                              <Divider />
                              <div className="mt-2">
                                {getCoordinatorsByDepartment("Registration")}
                              </div>
                            </div>
                          </div>
                          <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/4 pr-3 py-3 ">
                            <p className="font-semibold text-lg">Environment</p>
                            <div className="bg-white rounded-md drop-shadow-lg p-4 mt-4">
                              <p className="pb-2">Department In-charge</p>
                              <Divider />
                              <div className="mt-2">
                                {getCoordinatorsByDepartment("Environment")}
                              </div>
                            </div>
                          </div>
                          <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/4 pr-3 py-3 ">
                            <p className="font-semibold text-lg">Kitchen</p>
                            <div className="bg-white rounded-md drop-shadow-lg p-4 mt-4">
                              <p className="pb-2">Department In-charge</p>
                              <Divider />
                              <div className="mt-2">
                                {getCoordinatorsByDepartment("Kitchen")}
                              </div>
                            </div>
                          </div>
                          <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/4 pr-3 py-3 ">
                            <p className="font-semibold text-lg">
                              Living / Accommodation
                            </p>
                            <div className="bg-white rounded-md drop-shadow-lg p-4 mt-4">
                              <p className="pb-2">Department In-charge</p>
                              <Divider />
                              <div className="mt-2">
                                {getCoordinatorsByDepartment(
                                  "Living / Accommodation"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="w-full flex flex-wrap justify-left mt-8 ">
                          <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/4 pr-3 py-3 ">
                            <p className="font-semibold text-lg">Medical</p>
                            <div className="bg-white rounded-md drop-shadow-lg p-4 mt-4">
                              <p className="pb-2">Department In-charge</p>
                              <Divider />
                              <div className="mt-2">
                                {getCoordinatorsByDepartment("Medical")}
                              </div>
                            </div>
                          </div>
                          <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/4 pr-3 py-3 ">
                            <p className="font-semibold text-lg">Overall</p>
                            <div className="bg-white rounded-md drop-shadow-lg p-4 mt-4">
                              <p className="pb-2">Department In-charge</p>
                              <Divider />
                              <div className="mt-2">
                                {getCoordinatorsByDepartment("Overall")}
                              </div>
                            </div>
                          </div>
                          <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/4 pr-3 py-3 ">
                            <p className="font-semibold text-lg">
                              Audio video / Multimedia
                            </p>
                            <div className="bg-white rounded-md drop-shadow-lg p-4 mt-4">
                              <p className="pb-2">Department In-charge</p>
                              <Divider />
                              <div className="mt-2">
                                {getCoordinatorsByDepartment(
                                  "Audio video / Multimedia"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                : <div className="flex flex-col items-center justify-center h-full py-4 md:py-8">
                    <img
                      src={select}
                      alt="profile"
                      className="h-72 lg:h-1/3 w-72 lg:w-1/3 object-cover"
                    />
                    <p className="text-gray-500 text-lg font-semibold">
                      Please select a training type
                    </p>
                  </div>}

              <AddCoorPopup
                openAddPopup={openAddPopup}
                setOpenAddPopup={setOpenAddPopup}
                onCoorAdded={handleCoordAdded}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coordinators;
