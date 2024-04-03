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
import { MdLocalPrintshop } from "react-icons/md";
import { MdAdd, MdEdit } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import CreateTeamPopup from "../../../components/RegComponents/ManageTraining/CreateTeamPopup";
import EditTeamPopup from "../../../components/RegComponents/ManageTraining/EditTeamPopup";
import nocoor from "../../../assets/nocoor.png";
import { ThreeDots } from "react-loader-spinner";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import select from "../../../assets/select.png";

const Teams = () => {
  const { activeMenu } = useStateContext();
  const [regDropdownOpen, setRegDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null); // State to store selected team ID
  const [teams, setTeams] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  const regDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const teamsContainerRef = useRef(null); // Ref to the teams container

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

  const handleRegItemClick = item => {
    setSelectedTraining(item);
    setRegDropdownOpen(false);
  };

  const handleYearItemClick = year => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
  };

  const handleOpenCreate = () => {
    setOpenCreatePopup(true);
  };

  const handleOpenEdit = teamId => {
    setSelectedTeamId(teamId); // Set selected team ID
    setOpenEditPopup(true);
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/training/team-display",
        {
          params: {
            selectedTraining,
            selectedYear
          }
        }
      );
      setTeams(response.data.teams);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching teams", error);
      setShowLoader(false);
    }
  };

  useEffect(
    () => {
      fetchTeams();
    },
    [selectedTraining, selectedYear]
  );

  const handleTeamCreated = async () => {
    fetchTeams();
  };

  const handlePrint = useReactToPrint({
    content: () => {
      // Check if there are any teams available
      if (teams.length === 0) {
        // Show toast message
        toast.error("No data available to print");
        return null;
      }
      return teamsContainerRef.current;
    },
    documentTitle: `${selectedTraining} ${selectedYear} Teams`
  });

  const breadcrumbLinks = [
    { to: "/registration/dashboard", label: "Home" },
    { to: "/registration/manage-training", label: "Manage Training" },
    { to: "", label: "Teams" }
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
            <h1 className="text-2xl font-semibold mb-2 ">Teams</h1>
            <Breadcrumbs links={breadcrumbLinks} />
            <div className="relative my-4 p-0 flex flex-col">
              <p className="absolute right-11/12 md:right-72 mr-14  top-0 text-sm text-gray-400">
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
                      title="Create Teams"
                      placement="bottom"
                      TransitionComponent={Fade}
                    >
                      <div
                        onClick={handleOpenCreate}
                        className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70"
                      >
                        <button className="text-white flex items-center">
                          <MdAdd size={22} />
                        </button>
                      </div>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip
                      arrow
                      title="Print"
                      placement="bottom"
                      TransitionComponent={Fade}
                    >
                      <div
                        className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70"
                        onClick={handlePrint}
                      >
                        <button className="text-white flex items-center">
                          <MdLocalPrintshop size={22} />
                        </button>
                      </div>
                    </Tooltip>
                  </div>
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
                : teams.length === 0
                  ? <div className="flex flex-col items-center text-gray-500 mt-8">
                      <img
                        src={nocoor}
                        alt="img"
                        className="h-72 lg:h-1/3 w-72 lg:w-1/3 object-cover"
                      />
                      <p className="text-xl font-semibold">No Teams Created</p>
                    </div>
                  : <div
                      id="team-data-container"
                      className="team-data-container"
                      ref={teamsContainerRef}
                    >
                      <div className="print-title text-xl font-semibold print-margin">
                        {selectedTraining} {selectedYear}
                      </div>

                      <div className="w-full flex flex-wrap mt-4 team-format">
                        {teams.map(team =>
                          <div
                            key={team._id}
                            className="w-full sm:w-full lg:w-1/2 2xl:w-1/4 pr-3 py-3 team-container"
                          >
                            <div className="bg-white border border-gray-300 rounded-md drop-shadow-lg mt-4">
                              <div className="p-3 flex justify-between bg-blue-100 font-semibold print-teamName">
                                <p className="text-gray-700 self-center  ">
                                  {team.teamName}
                                </p>
                                <Tooltip
                                  arrow
                                  title="Edit"
                                  placement="bottom"
                                  TransitionComponent={Fade}
                                  className="print-icon-hidden"
                                >
                                  <p
                                    onClick={() => handleOpenEdit(team._id)} // Pass team ID to handleOpenEdit
                                    className="text-gray-600 hover:bg-gray-200  hover:text-gray-600  rounded-full p-2 cursor-pointer drop-shadow-md"
                                  >
                                    <FaUserEdit size={20} />
                                  </p>
                                </Tooltip>
                              </div>
                              <div className="py-2 mt-2 flex flex-col items-center text-sm md:text-base text-gray-600 font-semibold">
                                {team.teamMembers.map((member, index) =>
                                  <p key={index}>
                                    {member}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
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
          </div>
        </div>
        <EditTeamPopup
          openEditPopup={openEditPopup}
          setOpenEditPopup={setOpenEditPopup}
          selectedTeamId={selectedTeamId}
          onTeamUpdated={handleTeamCreated}
          onTeamDeleted={handleTeamCreated}
        />
        <CreateTeamPopup
          openCreatePopup={openCreatePopup}
          setOpenCreatePopup={setOpenCreatePopup}
          onTeamCreated={handleTeamCreated}
        />
      </div>
    </div>
  );
};
export default Teams;
