import React, { useState } from "react";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { Calendar } from "react-calendar";
import { useStateContext } from "../../redux/ContextProvider";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

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

  const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  const getCurrentMonthDays = () => {
    const currentMonthDays = [];
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      currentMonthDays.push(currentDate);
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
                  <p className="text-2xl font-semibold uppercase">
                    {date.toLocaleString("default", { month: "long" })}
                  </p>
                  <p className="text-2xl font-semibold ml-3">
                    {date.getFullYear()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <div className="p-1 border border-blue-200 rounded-md cursor-pointer hover:bg-primary hover:text-white">
                    Month
                  </div>
                  <div className="p-1 border border-blue-200 rounded-md cursor-pointer hover:bg-primary hover:text-white">
                    Week
                  </div>
                  <div className="p-1 border border-blue-200 rounded-md cursor-pointer hover:bg-primary hover:text-white">
                    Day
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 flex justify-center text-sm">
                <div className="w-full h-full">
                  {/* Custom grid-style calendar */}
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
                        className={`p-2 text-center font-semibold text-gray-600 ${isSameDay(
                          new Date(),
                          new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            index + 1
                          )
                        )
                          ? "bg-gray-200" // Background color for the current day
                          : "bg-gray-100" // Default background color
                        }`}
                      >
                        {day}
                      </div>
                    )}
                    {/* Dummy elements to fill the grid */}
                    {getCurrentMonthDays().map((day, index) =>
                      <div
                        key={index}
                        className={`p-2 text-center border border-gray-100 ${isSameDay(
                          day,
                          new Date()
                        )
                          ? "bg-blue-100"
                          : ""}`}
                        style={{ height: "80px", position: "relative" }} // Adjusting height and position
                      >
                        <div className="absolute top-2 right-0 text-sm text-gray-600 mt-1 mr-1">
                          {day.getDate()}
                        </div>
                      </div>
                    )}
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

export default ManageEvents;
