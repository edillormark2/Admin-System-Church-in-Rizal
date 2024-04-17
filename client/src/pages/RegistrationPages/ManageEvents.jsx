import React, { useState } from "react";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Divider } from "@mui/material";

const ManageEvents = () => {
  const { activeMenu } = useStateContext();
  const [date, setDate] = useState(new Date());

  const handlePrevMonth = () => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(nextMonth);
  };

  const getCurrentMonthDays = () => {
    const currentMonthDays = [];
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    // Fill in the days of the previous month
    for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
      const day = new Date(date.getFullYear(), date.getMonth(), 1 - i);
      currentMonthDays.push({ date: day, isCurrentMonth: false });
    }

    // Fill in the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);
      currentMonthDays.push({ date: day, isCurrentMonth: true });
    }

    return currentMonthDays;
  };

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
            ? "lg:ml-64"
            : "flex-1"}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md">
            <Navbar />
          </div>
          <div className="my-10 md:my-16 mx-6 md:mx-16">
            <h1 className="text-2xl font-semibold mb-2">Manage Events</h1>
            <div className="flex flex-col md:flex-row mt-10 gap-4">
              <div className="w-full bg-white p-4 rounded-lg drop-shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    <div
                      className="p-1 border border-blue-200 rounded-md cursor-pointer hover:bg-primary hover:text-white"
                      onClick={handlePrevMonth}
                    >
                      <MdKeyboardArrowLeft size={22} />
                    </div>
                    <div
                      className="p-1 border border-blue-200 rounded-md cursor-pointer hover:bg-primary hover:text-white"
                      onClick={handleNextMonth}
                    >
                      <MdKeyboardArrowRight size={22} />
                    </div>
                  </div>

                  <div className="flex flex-grow justify-center">
                    <p className="flex text-xl font-semibold uppercase hover:bg-gray-100 py-1 px-2 rounded-lg">
                      {date.toLocaleString("default", { month: "long" })}{" "}
                      {date.getFullYear()}{" "}
                    </p>
                  </div>

                  <div className="flex border border-blue-100 rounded-md">
                    <div className="py-1 px-2 cursor-pointer   hover:bg-blue-100 ">
                      Month
                    </div>
                    <div className="py-1 px-2 cursor-pointer    hover:bg-blue-100 ">
                      Week
                    </div>
                    <div className="py-1 px-2 cursor-pointer  hover:bg-blue-100 ">
                      Day
                    </div>
                  </div>
                </div>
                <div className="w-full mt-4 flex justify-center text-sm">
                  <div className="w-full h-full">
                    <div className="grid grid-cols-7">
                      {[
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat"
                      ].map((day, index) =>
                        <div
                          key={index}
                          className="p-2 text-center font-semibold text-gray-600 bg-gray-100"
                        >
                          {day}
                        </div>
                      )}
                      {getCurrentMonthDays().map((day, index) =>
                        <div
                          key={index}
                          className={`p-2 text-center border ${day.isCurrentMonth
                            ? "border-gray-100"
                            : "border-transparent"} ${day.isCurrentMonth &&
                          day.date.getDate() === new Date().getDate() &&
                          day.date.getMonth() === new Date().getMonth() &&
                          day.date.getFullYear() === new Date().getFullYear()
                            ? "bg-blue-100 border border-blue-200"
                            : "hover:bg-gray-100 hover:border-gray-200"}`}
                          style={{ height: "80px", position: "relative" }}
                        >
                          <div
                            className={`absolute top-2 right-0 text-sm text-gray-600 mt-1 mr-2 ${day.isCurrentMonth
                              ? ""
                              : "opacity-50"}`}
                          >
                            {day.date.getDate()}
                            {day.isCurrentMonth && day.date.getDate() === 1
                              ? <div className="absolute top-0 right-4 text-sm text-gray-600 ">
                                  {date.toLocaleString("default", {
                                    month: "long"
                                  })}
                                </div>
                              : null}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-lg drop-shadow-lg p-4">
                  <p className="font-semibold text-xl text-gray-600 mb-2">
                    Event List
                  </p>
                  <Divider />
                  Events
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
