import React, { useState, useEffect, useRef } from "react";
import "../Reg.css";
import Navbar from "../../../components/RegComponents/Navbar";
import Sidebar from "../../../components/RegComponents/Sidebar";
import { useStateContext } from "../../../redux/ContextProvider";
import Breadcrumbs from "../../../components/Breadcrumbs";
import YearMenuPicker from "../../../components/YearMenuPicker";
import TrainingMenuPicker from "../../../components/TrainingMenuPicker";
import { BsPersonFillAdd } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { MdAdd } from "react-icons/md";
import { FaAward } from "react-icons/fa6";
import { MdLocalPrintshop } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Divider } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReactToPrint } from "react-to-print";

const Culminating = () => {
  const { activeMenu } = useStateContext();
  const [regDropdownOpen, setRegDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Individual Awards");
  const [resetCatDropdown, setResetCatDropdown] = useState(false);
  const [individualAwards, setIndividualAwards] = useState([]);
  const [teamAwards, setTeamAwards] = useState([]);
  const [selectedAwardId, setSelectedAwardId] = useState(null);
  const [formData, setFormData] = useState({
    awardName: "",
    awardCategory: ""
  });

  const regDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const catDropdownRef = useRef(null);
  const awardNameInputRef = useRef(null);
  const awardsContainerRef = useRef(null);

  useEffect(
    () => {
      fetchAwards("Individual Awards");
      fetchAwards("Team Awards");
    },
    [selectedTraining, selectedYear]
  );

  const fetchAwards = async category => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/training/award-display",
        {
          params: {
            awardCategory: category,
            trainingType: selectedTraining, // Pass selectedTraining as a parameter
            yearCreated: selectedYear // Pass selectedYear as a parameter
          }
        }
      );
      if (category === "Individual Awards") {
        setIndividualAwards(response.data.awards);
      } else if (category === "Team Awards") {
        setTeamAwards(response.data.awards);
      }
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(
    () => {
      setFormData({ ...formData, awardCategory: selectedCategory });
    },
    [selectedCategory]
  );

  useEffect(
    () => {
      if (resetCatDropdown) {
        setSelectedCategory("Individual Awards");
        setResetCatDropdown(false);
      }
    },
    [resetCatDropdown]
  );

  const handleAddAward = async e => {
    e.preventDefault();
    setLoading(true);
    const { awardName, awardCategory } = formData;

    if (!awardName.trim()) {
      toast.error("Award name cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const trainingType = localStorage.getItem("selectedTraining");
      await axios.post("http://localhost:3000/server/training/award-create", {
        awardName,
        awardCategory,
        trainingType
      });
      await fetchAwards(awardCategory);
      toast.success("Award Added");
      setFormData({ ...formData, awardName: "" }); // Clear the awardName field
      awardNameInputRef.current.value = "";
      setResetCatDropdown(true);
    } catch (error) {
      toast.error("Error adding award:", error);
    }
    setLoading(false);
  };

  const handleDeleteAward = async id => {
    try {
      await axios.delete(
        `http://localhost:3000/server/training/award-delete/${id}`
      );
      toast.success("Award deleted");
      await fetchAwards("Individual Awards");
      await fetchAwards("Team Awards");
    } catch (error) {
      console.error("Error deleting award:", error);
      toast.error("Error deleting award");
    }
  };

  const toggleDropdown = () => {
    setCatDropdownOpen(!catDropdownOpen);
  };

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
          !event.target.closest(".year-dropdown-button")) ||
        (catDropdownRef.current &&
          !catDropdownRef.current.contains(event.target) &&
          !event.target.closest(".cat-dropdown-button"))
      ) {
        setRegDropdownOpen(false);
        setYearDropdownOpen(false);
        setCatDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleRegItemClick = item => {
    setSelectedTraining(item);
    setRegDropdownOpen(false);
  };

  const handleYearItemClick = year => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
  };

  const handleCategoryItemClick = item => {
    setSelectedCategory(item);
    setCatDropdownOpen(false);
  };

  const handleClick = awardId => {
    setSelectedAwardId(awardId);
  };

  const handleAddAwardee = async awardId => {
    try {
      const awardeeName = formData.awardName;
      await axios.post(
        `http://localhost:3000/server/training/awardee-add/${awardId}`,
        { awardeeName }
      );
      toast.success("Awardee added");
      setFormData({ ...formData, awardName: "" }); // Clear the awardName field
      awardNameInputRef.current.value = "";
      setSelectedAwardId(null); // Reset selectedAwardId
      await fetchAwards("Individual Awards");
      await fetchAwards("Team Awards");
    } catch (error) {
      console.error("Error adding awardee:", error);
      toast.error("Error adding awardee");
    }
  };

  const handleDeleteAwardee = async (awardId, awardeeName) => {
    try {
      await axios.delete(
        `http://localhost:3000/server/training/awardee-delete/${awardId}`,
        { data: { awardeeName } } // Pass the awardeeName as data
      );
      toast.success("Awardee deleted");
      await fetchAwards("Individual Awards");
      await fetchAwards("Team Awards");
    } catch (error) {
      console.error("Error deleting awardee:", error);
      toast.error("Error deleting awardee");
    }
  };

  const handlePrint = useReactToPrint({
    content: () => {
      if (teamAwards.length === 0 && individualAwards.length === 0) {
        toast.error("No data available to print");
        return null;
      }
      return awardsContainerRef.current;
    },
    documentTitle: `${selectedTraining} ${selectedYear} culminating awardees`
  });

  useEffect(
    () => {
      localStorage.setItem("selectedTraining", selectedTraining);
    },
    [selectedTraining]
  );

  const breadcrumbLinks = [
    { to: "/registration/dashboard", label: "Home" },
    { to: "/registration/manage-training", label: "Manage Training" },
    { to: "", label: "Culminating" }
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
            <h1 className="text-2xl font-semibold mb-2 ">Culminating</h1>
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

            {/*printable section starts here */}
            <div
              className="print-margin show-on-print-only"
              ref={awardsContainerRef}
            >
              <div>
                <div className="print-title text-2xl font-semibold">
                  Culminating Awardees
                </div>
                <div className="print-title text-base text-gray-500">
                  {selectedTraining} {selectedYear}
                </div>
              </div>

              <p className="font-semibold text-gray-400 my-2">
                Individual Awards
              </p>
              <Divider />
              <div className="mt-4 ">
                {individualAwards.map((award, index) =>
                  <div key={index} className="p-1">
                    <div className="flex justify-between text-primary font-semibold">
                      {award.awardName}
                    </div>
                    <div className="mt-2 ml-4">
                      {award.awardee.map((awardee, awardeeIndex) =>
                        <li key={awardeeIndex} className="text-gray-600">
                          {awardee}
                        </li>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <p className="font-semibold text-gray-400 mt-8">Team Awards</p>
              <Divider />
              <div className="mt-4 ">
                {teamAwards.map((award, index) =>
                  <div key={index} className="p-1">
                    <div className="flex justify-between text-primary font-semibold">
                      {award.awardName}
                    </div>
                    <div className="mt-2 ml-4">
                      {award.awardee.map((awardee, awardeeIndex) =>
                        <li key={awardeeIndex} className="text-gray-600">
                          {awardee}
                        </li>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/*printable section ends here */}

            <div className="flex flex-col md:flex-row mt-10 gap-4">
              <div className="w-full">
                <div className="mx-0 md:mx-4">
                  <p className="font-semibold text-gray-400 my-2">
                    Individual Awards
                  </p>
                  <Divider />
                  <div className="mt-4 ">
                    {individualAwards.map((award, index) =>
                      <div
                        key={index}
                        className="bg-white rounded-md shadow-md mb-2 border border-gray-100"
                      >
                        <div className="flex justify-between text-primary font-semibold bg-blue-50 p-3">
                          {award.awardName}

                          <div className="flex gap-1">
                            <Tooltip
                              arrow
                              title="Add"
                              placement="top"
                              TransitionComponent={Fade}
                            >
                              <div>
                                <BsPersonFillAdd
                                  size={23}
                                  className="self-center text-gray-500 cursor-pointer"
                                  onClick={() => handleClick(award._id)}
                                />
                              </div>
                            </Tooltip>
                            <Tooltip
                              arrow
                              title="Delete"
                              placement="top"
                              TransitionComponent={Fade}
                            >
                              <div>
                                <MdDelete
                                  size={23}
                                  className="self-center text-gray-500 cursor-pointer"
                                  onClick={() => handleDeleteAward(award._id)}
                                />
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                        <div className="mt-4 px-3 pb-2">
                          {award.awardee.map((awardee, awardeeIndex) =>
                            <li
                              key={awardeeIndex}
                              className="text-gray-600 flex justify-between"
                            >
                              {awardee}
                              <Tooltip
                                arrow
                                title="Remove"
                                placement="right"
                                TransitionComponent={Fade}
                              >
                                <div>
                                  <FaMinusCircle
                                    size={15}
                                    className="text-gray-400 cursor-pointer hover:text-gray-600"
                                    onClick={() =>
                                      handleDeleteAwardee(award._id, awardee)}
                                  />
                                </div>
                              </Tooltip>
                            </li>
                          )}
                        </div>
                        {selectedAwardId === award._id &&
                          <div className="flex items-center mt-4 px-3 pb-3">
                            <input
                              type="text"
                              placeholder="Enter awardee name"
                              id="awardName"
                              onChange={handleChange}
                              autoComplete="off"
                              className="form-control bg-white p-2 rounded-lg border border-gray-300 text-sm sm:text-base mr-2"
                            />
                            <button
                              className="bg-primary text-white py-2 px-4 rounded-md hover:opacity-70"
                              onClick={() => handleAddAwardee(award._id)}
                            >
                              <MdAdd size={22} />
                            </button>
                          </div>}
                      </div>
                    )}
                  </div>
                </div>
                <div className="m-0 md:m-4">
                  <p className="font-semibold text-gray-400 my-2">
                    Team Awards
                  </p>
                  <Divider />
                  <div className="mt-4">
                    {teamAwards.map((award, index) =>
                      <div
                        key={index}
                        className="bg-white rounded-md shadow-md mb-2 border border-gray-100"
                      >
                        <div className="flex justify-between text-primary font-semibold bg-blue-50 p-3">
                          {award.awardName}

                          <div className="flex gap-1">
                            <Tooltip
                              arrow
                              title="Add"
                              placement="top"
                              TransitionComponent={Fade}
                            >
                              <div>
                                <BsPersonFillAdd
                                  size={23}
                                  className="self-center text-gray-500 cursor-pointer"
                                  onClick={() => handleClick(award._id)}
                                />
                              </div>
                            </Tooltip>
                            <Tooltip
                              arrow
                              title="Delete"
                              placement="top"
                              TransitionComponent={Fade}
                            >
                              <div>
                                <MdDelete
                                  size={23}
                                  className="self-center text-gray-500 cursor-pointer"
                                  onClick={() => handleDeleteAward(award._id)}
                                />
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                        <div className="mt-4 px-3 pb-2">
                          {award.awardee.map((awardee, index) =>
                            <li
                              key={index}
                              className="text-gray-600 flex justify-between"
                            >
                              {awardee}
                              <Tooltip
                                arrow
                                title="Remove"
                                placement="right"
                                TransitionComponent={Fade}
                              >
                                <div>
                                  <FaMinusCircle
                                    size={15}
                                    className="text-gray-400 cursor-pointer hover:text-gray-600"
                                    onClick={() =>
                                      handleDeleteAwardee(award._id, awardee)}
                                  />
                                </div>
                              </Tooltip>
                            </li>
                          )}
                        </div>
                        {selectedAwardId === award._id &&
                          <div className="flex items-center mt-4 px-3 pb-3">
                            <input
                              type="text"
                              placeholder="Enter awardee name"
                              id="awardName"
                              onChange={handleChange}
                              autoComplete="off"
                              className="form-control bg-white p-2 rounded-lg border border-gray-300 text-sm sm:text-base mr-2"
                            />
                            <button
                              className="bg-primary text-white py-2 px-4 rounded-md hover:opacity-70"
                              onClick={() => handleAddAwardee(award._id)}
                            >
                              <MdAdd size={22} />
                            </button>
                          </div>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="bg-white p-4 rounded-lg drop-shadow-lg mt-8">
                  <p className="my-2 font-semibold text-gray-400">Add Awards</p>
                  <Divider />
                  <p className="text-sm font-semibold mt-4 mb-2">Award Name</p>
                  <input
                    type="text"
                    placeholder=""
                    id="awardName"
                    onChange={handleChange}
                    autoComplete="off"
                    ref={awardNameInputRef}
                    className="form-control bg-white p-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                  />
                  <p className="text-sm font-semibold mt-4 mb-2">Category</p>
                  <div
                    className={`cat-dropdown-button flex relative p-2 min-h-10 w-auto min-w-64 text-sm border-1 border-gray-300 bg-white rounded-md cursor-pointer ${catDropdownOpen
                      ? "border-primary"
                      : "border-gray-300"}`}
                    onClick={toggleDropdown}
                  >
                    <p>
                      {selectedCategory}
                    </p>
                    <IoMdArrowDropdown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    {catDropdownOpen &&
                      <div
                        ref={catDropdownRef}
                        className="absolute top-full left-0 mt-2 min-w-64 w-full bg-white rounded-md shadow-xl z-10"
                      >
                        <button
                          onClick={() =>
                            handleCategoryItemClick("Individual Awards")}
                          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedCategory ===
                            "Individual Awards" && "bg-blue-50 text-gray-700"}`}
                        >
                          Individual Awards
                        </button>

                        <button
                          onClick={() => handleCategoryItemClick("Team Awards")}
                          className={`block px-4 py-2 text-sm text-gray-400 hover:bg-blue-50 w-full text-left ${selectedCategory ===
                            "Team Awards" && "bg-blue-50 text-gray-700"}`}
                        >
                          Team Awards
                        </button>
                      </div>}
                  </div>
                  <div
                    className="bg-primary p-4 rounded-md shadow-lg text-white hover:opacity-70 cursor-pointer mt-8 "
                    onClick={handleAddAward}
                    type="submit"
                  >
                    <p className="flex justify-center">
                      <FaAward className="self-center mr-2" size={20} />Add
                      Awards
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Culminating;
