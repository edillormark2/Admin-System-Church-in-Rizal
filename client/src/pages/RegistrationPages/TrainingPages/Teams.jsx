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
import { IoMdDownload } from "react-icons/io";
import { MdAdd, MdEdit } from "react-icons/md";
import axios from "axios";
import CreateTeamPopup from "../../../components/RegComponents/ManageTraining/CreateTeamPopup";
import EditTeamPopup from "../../../components/RegComponents/ManageTraining/EditTeamPopup";

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
    } catch (error) {
      console.error("Error fetching teams", error);
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
                      title="Download"
                      placement="bottom"
                      TransitionComponent={Fade}
                    >
                      <div className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70">
                        <button className="text-white flex items-center">
                          <IoMdDownload size={22} />
                        </button>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap justify-left mt-4">
              {teams.map(team =>
                <div
                  key={team._id}
                  className="w-full sm:w-full lg:w-1/2 2xl:w-1/4 pr-3 py-3"
                >
                  <div className="bg-white border border-gray-300 rounded-md drop-shadow-lg mt-4">
                    <div className="p-3 flex justify-between bg-blue-100 font-semibold ">
                      <p className="text-gray-700 self-center">
                        {team.teamName}
                      </p>
                      <Tooltip
                        arrow
                        title="Edit"
                        placement="bottom"
                        TransitionComponent={Fade}
                      >
                        <p
                          onClick={() => handleOpenEdit(team._id)} // Pass team ID to handleOpenEdit
                          className="text-gray-600 hover:bg-primary bg-opacity-55 hover:text-white  rounded-full p-2 cursor-pointer drop-shadow-md"
                        >
                          <MdEdit size={18} />
                        </p>
                      </Tooltip>
                    </div>
                    <div className="py-2 mt-2 flex flex-col items-center text-gray-500 font-semibold">
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
