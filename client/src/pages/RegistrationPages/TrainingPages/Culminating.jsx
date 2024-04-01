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
import { Divider } from "@mui/material";

const Culminating = () => {
  const { activeMenu } = useStateContext();
  const [regDropdownOpen, setRegDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Individual Awards");
  const [resetDeptDropdown, setResetDeptDropdown] = useState(false);
  const [formData, setFormData] = useState({
    awardName: "",
    category: ""
  });

  const regDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const catDropdownRef = useRef(null);

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(
    () => {
      setFormData({ ...formData, department: selectedCategory });
    },
    [selectedCategory]
  );

  useEffect(
    () => {
      if (resetDeptDropdown) {
        setSelectedCategory("Individual Awards");
        setResetDeptDropdown(false);
      }
    },
    [resetDeptDropdown]
  );

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

  const handleCategoryItemClick = item => {
    setSelectedCategory(item);
    setCatDropdownOpen(false);
  };

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
                      <div className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70">
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
                      <div className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70">
                        <button className="text-white flex items-center">
                          <MdLocalPrintshop size={22} />
                        </button>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row mt-16 gap-4">
              <div className="w-full">
                <div className="m-0 md:m-4">
                  <p className="font-semibold text-gray-400 my-2">
                    Individual Awards
                  </p>
                  <Divider />
                  <div className="mt-4">
                    <div className="bg-white p-3 rounded-md shadow-md ">
                      <div className="flex justify-between text-primary font-semibold">
                        Best Trainee
                        <BsPersonFillAdd
                          size={23}
                          className="self-center text-gray-500 cursor-pointer"
                        />
                      </div>
                      <p className="mt-4 mb-2 text-gray-600 text-sm flex justify-between">
                        Mark Daniel
                        <FaMinusCircle className="self-center text-gray-500 cursor-pointer" />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="m-0 md:m-4">
                  <p className="font-semibold text-gray-400 my-2">
                    Team Awards
                  </p>
                  <Divider />
                  <div className="mt-4">
                    <div className="bg-white p-3 rounded-md shadow-md ">
                      <div className="flex justify-between text-primary font-semibold">
                        Best Meal Service
                        <BsPersonFillAdd
                          size={23}
                          className="self-center text-gray-500 cursor-pointer"
                        />
                      </div>
                      <p className="mt-4 mb-2 text-gray-600 text-sm flex justify-between">
                        Team 4
                        <FaMinusCircle className="self-center text-gray-500 cursor-pointer" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-white p-4 rounded-lg drop-shadow-lg">
                  <p className="my-2 font-semibold text-gray-400">Add Awards</p>
                  <Divider />
                  <p className="text-sm font-semibold mt-4 mb-2">Name</p>
                  <input
                    type="text"
                    placeholder=""
                    id="name"
                    onChange={handleChange}
                    autoComplete="off"
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
                  <div className="bg-primary p-4 rounded-md shadow-lg text-white hover:opacity-70 cursor-pointer mt-8 ">
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
