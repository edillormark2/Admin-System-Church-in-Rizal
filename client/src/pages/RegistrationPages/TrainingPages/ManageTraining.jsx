import React from "react";
import "../Reg.css";
import Navbar from "../../../components/RegComponents/Navbar";
import Sidebar from "../../../components/RegComponents/Sidebar";
import { useStateContext } from "../../../redux/ContextProvider";
import { Divider } from "@mui/material";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { FaAward } from "react-icons/fa6";
import { HiUser } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";

const ManageTraining = () => {
  const { activeMenu } = useStateContext();

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
            <h1 className="text-2xl font-semibold mb-2 ">Manage Training</h1>

            <div className="w-full flex flex-wrap mt-6 ">
              <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/3 pr-3 py-3 ">
                <div className=" bg-white h-52 md:h-48 hover:bg-blue-50 rounded-md drop-shadow-xl border">
                  <div className="flex justify-between p-4">
                    <div className="w-3/5">
                      <p className="font-semibold text-xl">Coordinators</p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-6">
                        Manage coordinators for each department. Assign or
                        remove coordinators.
                      </p>
                    </div>
                    <HiUser size={100} className="text-gray-200" />
                  </div>

                  <div className="px-4">
                    <Link to="/registration/manage-training/coordinators">
                      <Tooltip
                        arrow
                        title="Manage"
                        placement="right"
                        TransitionComponent={Fade}
                      >
                        <div className=" cursor-pointer bg-gray-300 hover:bg-primary text-white rounded-full p-2 w-8 h-8">
                          <IoMdArrowRoundForward />
                        </div>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/3 pr-3 py-3 ">
                <div className=" bg-white h-52 md:h-48  hover:bg-blue-50 rounded-md drop-shadow-xl border">
                  <div className="flex justify-between p-4">
                    <div className="w-3/5">
                      <p className="font-semibold text-xl">Teams</p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-6 ">
                        Manage teams every training. Create, edit, and delete
                        teams with ease.
                      </p>
                    </div>
                    <FaUsers size={100} className="text-gray-200" />
                  </div>

                  <div className="px-4">
                    <Link to="/registration/manage-training/teams">
                      <Tooltip
                        arrow
                        title="Manage"
                        placement="right"
                        TransitionComponent={Fade}
                      >
                        <div className=" cursor-pointer bg-gray-300 hover:bg-primary text-white rounded-full p-2 w-8 h-8">
                          <IoMdArrowRoundForward />
                        </div>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/3 pr-3 py-3 ">
                <div className=" bg-white h-52 md:h-48  hover:bg-blue-50 rounded-md drop-shadow-xl border">
                  <div className="flex justify-between p-4">
                    <div className="w-1/2">
                      <p className="font-semibold text-xl">Culminating</p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-10 ">
                        Easily list, modify, and assign awards for trainees.
                      </p>
                    </div>
                    <FaAward size={100} className="text-gray-200" />
                  </div>

                  <div className="px-4">
                    <Link to="/registration/manage-training/culminating">
                      <Tooltip
                        arrow
                        title="Manage"
                        placement="right"
                        TransitionComponent={Fade}
                      >
                        <div className=" cursor-pointer bg-gray-300 hover:bg-primary text-white rounded-full p-2 w-8 h-8">
                          <IoMdArrowRoundForward />
                        </div>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/3 pr-3 py-3 ">
                <div className=" bg-white h-52 md:h-48  hover:bg-blue-50 rounded-md drop-shadow-xl border">
                  <div className="flex justify-between p-4">
                    <div className="w-1/2">
                      <p className="font-semibold text-xl">Grading</p>
                      <p className="text-gray-500 text-xs sm:text-sm mt-6 ">
                        Manage merit and demerit for each team. Keep track of
                        services grades.
                      </p>
                    </div>
                    <IoStatsChart size={100} className="text-gray-200" />
                  </div>

                  <div className="px-4">
                    <Link to="/registration/manage-training/grading">
                      <Tooltip
                        arrow
                        title="Manage"
                        placement="right"
                        TransitionComponent={Fade}
                      >
                        <div className=" cursor-pointer bg-gray-300 hover:bg-primary text-white rounded-full p-2 w-8 h-8">
                          <IoMdArrowRoundForward />
                        </div>
                      </Tooltip>
                    </Link>
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

export default ManageTraining;
