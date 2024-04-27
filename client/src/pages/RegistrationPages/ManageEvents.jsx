import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Divider } from "@mui/material";
import YearMenuPicker from "../../components/YearMenuPicker";
import { MdLocalPrintshop } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { FaCalendarPlus } from "react-icons/fa6";
import CreateEventPopup from "../../components/RegComponents/ManageEvents/CreateEventPopup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import noevent from "../../assets/noevent.png";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditEventPopup from "../../components/RegComponents/ManageEvents/EditEventPopup";
import DeleteEventPopup from "../../components/RegComponents/ManageEvents/DeleteEventPopup";

const ManageEvents = () => {
  const { activeMenu } = useStateContext();
  const [date, setDate] = useState(new Date());
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsForSchedule, setEventsForSchedule] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const yearDropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        yearDropdownRef.current &&
        !yearDropdownRef.current.contains(event.target) &&
        !event.target.closest(".year-dropdown-button")
      ) {
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
      fetchEventsByYear();
    },
    [selectedYear]
  );

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEventsByYear = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/event/event-display-year",
        {
          params: {
            selectedYear: selectedYear // Send selectedYear as a query parameter
          }
        }
      );
      setEventsForSchedule(response.data);
    } catch (error) {
      toast.error("Error fetching events:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/server/event/event-display"
      );
      setEvents(response.data);
    } catch (error) {
      toast.error("Error fetching events:", error);
    }
  };

  const handleEventCreated = async () => {
    fetchEventsByYear();
    fetchEvents();
  };

  const handleDeleteEvent = async () => {
    fetchEventsByYear();
    fetchEvents();
  };
  const handleEditEvent = async () => {
    fetchEventsByYear();
    fetchEvents();
  };
  const getMonthAbbreviation = fullMonthName => {
    switch (fullMonthName) {
      case "January":
        return "Jan";
      case "February":
        return "Feb";
      case "March":
        return "March";
      case "April":
        return "April";
      case "May":
        return "May";
      case "June":
        return "June";
      case "July":
        return "July";
      case "August":
        return "Aug";
      case "September":
        return "Sept";
      case "October":
        return "Oct";
      case "November":
        return "Nov";
      case "December":
        return "Dec";
      default:
        return fullMonthName;
    }
  };

  const handleYearItemClick = year => {
    setSelectedYear(year);
    setYearDropdownOpen(false);
  };

  const handleOpenCreate = () => {
    setOpenCreatePopup(true);
  };

  const handleOpenEdit = event => {
    setSelectedEvent(event);
    setOpenEditPopup(true);
  };

  const handleOpenDelete = event => {
    setSelectedEvent(event);
    setOpenDeletePopup(true);
  };

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

  // Function to handle hovering over an event
  const handleEventHover = index => {
    setHoveredEvent(index);
  };

  // Function to handle mouse leaving an event
  const handleEventLeave = () => {
    setHoveredEvent(null);
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
          <div className="my-24 md:my-16 mx-5 md:mx-16">
            <h1 className="text-2xl font-semibold mb-2">Manage Events</h1>
            <div className="relative my-4 p-0 flex flex-col">
              <div className="flex  justify-end gap-2 mt-6">
                <Tooltip
                  arrow
                  title="Create Event"
                  placement="bottom"
                  TransitionComponent={Fade}
                >
                  <div
                    className=" bg-primary p-2 rounded-md drop-shadow-lg cursor-pointer hover:opacity-70"
                    onClick={handleOpenCreate}
                  >
                    <p className="text-white flex items-center">
                      <FaCalendarPlus size={22} />
                    </p>
                  </div>
                </Tooltip>
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

            <div className="flex flex-col md:flex-row mt-10 gap-4">
              {/*Calendar component */}
              <div className="w-full bg-white p-2 md:p-4 rounded-lg drop-shadow-xl max-h-[600px]">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm md:text-lg font-semibold text-gray-600">
                    Events Calendar
                  </div>
                  <div className="flex gap-2">
                    <div className="flex">
                      <p className="flex text-sm md:text-lg bg-gray-100 p-2 rounded-lg">
                        {date.toLocaleString("default", {
                          month: "long"
                        })}{" "}
                        {date.getFullYear()}{" "}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div
                        className="p-1 md:p-2 self-center border border-blue-200 rounded-md cursor-pointer hover:bg-primary hover:text-white"
                        onClick={handlePrevMonth}
                      >
                        <MdKeyboardArrowLeft size={22} />
                      </div>
                      <div
                        className="p-1 md:p-2 self-center border border-blue-200 rounded-md cursor-pointer hover:bg-primary hover:text-white"
                        onClick={handleNextMonth}
                      >
                        <MdKeyboardArrowRight size={22} />
                      </div>
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
                          className="p-2 text-xs md:text-sm text-center font-semibold text-gray-600 bg-gray-100"
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
                            className={`absolute top-2 right-0 text-sm  text-gray-600 mt-1 mr-2 ${day.isCurrentMonth
                              ? ""
                              : "opacity-50"}`}
                          >
                            {day.date.getDate()}
                            {day.isCurrentMonth && day.date.getDate() === 1
                              ? <div className="absolute  top-0 right-4 hidden md:block text-sm text-gray-700">
                                  {date.toLocaleString("default", {
                                    month: "long"
                                  })}
                                </div>
                              : null}
                          </div>
                          {/* Add color labels */}
                          <div className="absolute mt-0 md:mt-1 inset-0 flex flex-wrap justify-center items-center cursor-pointer hover:opacity-75">
                            {events.map(event => {
                              const eventStartDate = new Date(event.startDate);
                              const eventEndDate = new Date(event.endDate);
                              if (
                                day.date >= eventStartDate &&
                                day.date <= eventEndDate &&
                                day.date.getMonth() ===
                                  eventStartDate.getMonth() &&
                                day.date.getFullYear() ===
                                  eventStartDate.getFullYear()
                              ) {
                                // Check if the current day is the start date
                                if (
                                  day.date.getDate() ===
                                  eventStartDate.getDate()
                                ) {
                                  const truncatedTitle =
                                    event.title.length > 12
                                      ? `${event.title.slice(0, 12)}...`
                                      : event.title;
                                  return (
                                    <div
                                      key={event._id}
                                      className={`relative w-full h-4 md:h-5 mt-1 bg-${event.color}-500`}
                                      title={event.title}
                                    >
                                      <span
                                        className={`absolute inset-0 flex items-center justify-start ml-1 text-xs text-white overflow-hidden`}
                                        style={{
                                          whiteSpace: "nowrap",
                                          textOverflow: "ellipsis"
                                        }}
                                      >
                                        {truncatedTitle}
                                      </span>
                                    </div>
                                  );
                                } else {
                                  // Render color labels for the rest of the days in the event duration
                                  const truncatedTitle =
                                    event.title.length > 12
                                      ? `${event.title.slice(0, 12)}...`
                                      : event.title;
                                  return (
                                    <div
                                      key={event._id}
                                      className={`relative w-full h-4 md:h-5 mt-1 bg-${event.color}-500`}
                                      title={event.title}
                                    >
                                      <span
                                        className={`absolute inset-0 flex items-center justify-start ml-1 text-xs text-white overflow-hidden`}
                                        style={{
                                          whiteSpace: "nowrap",
                                          textOverflow: "ellipsis"
                                        }}
                                      >
                                        {truncatedTitle}
                                      </span>
                                    </div>
                                  );
                                }
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/*Calendar component end here*/}

              <div className="w-full md:w-8/12">
                <div className="bg-white rounded-lg drop-shadow-lg p-1 md:p-4 ">
                  <div className="flex justify-between mb-4 mt-2 md:mt-0 p-2 md:p-0">
                    <p className="font-semibold text-base md:text-lg text-gray-600 self-center md:self-end">
                      Event Schedule
                    </p>
                    <div className="w-1/2 md:w-auto">
                      <YearMenuPicker
                        selectedYear={selectedYear}
                        handleYearItemClick={handleYearItemClick}
                        yearDropdownOpen={yearDropdownOpen}
                        setYearDropdownOpen={setYearDropdownOpen}
                        yearDropdownRef={yearDropdownRef}
                      />
                    </div>
                  </div>

                  <Divider />
                  <div className="mt-4">
                    {/* Check if there are events for the selected year */}
                    {eventsForSchedule.length === 0
                      ? <div>
                          <img
                            src={noevent}
                            alt="img"
                            className="mx-auto w-64 object-cover"
                          />
                          <p className="text-gray-600 text-center">
                            There are no events scheduled for the year{" "}
                            {selectedYear}
                          </p>
                        </div>
                      : eventsForSchedule.map((event, index) => {
                          const startDate = new Date(event.startDate);
                          const endDate = new Date(event.endDate);

                          // Get month abbreviations
                          const startMonthAbbr = getMonthAbbreviation(
                            startDate.toLocaleString("default", {
                              month: "long"
                            })
                          );
                          const endMonthAbbr = getMonthAbbreviation(
                            endDate.toLocaleString("default", { month: "long" })
                          );

                          return (
                            <div
                              key={index}
                              className="flex mb-4 relative hover:bg-gray-100 rounded-md py-2 px-1"
                              onMouseEnter={() => handleEventHover(index)}
                              onMouseLeave={handleEventLeave}
                            >
                              {hoveredEvent === index &&
                                <div
                                  className="absolute top-0 right-0 m-0 md:m-2 cursor-pointer text-gray-600  hover:bg-gray-200 rounded-full p-2"
                                  title="Edit"
                                  onClick={() => handleOpenEdit(event)}
                                >
                                  <MdEdit size={19} />
                                </div>}
                              {hoveredEvent === index &&
                                <div
                                  className="absolute top-8 right-0 m-0 md:m-2 cursor-pointer text-gray-600  hover:bg-gray-200 rounded-full p-2"
                                  title="Delete"
                                  onClick={() => handleOpenDelete(event)}
                                >
                                  <MdDelete size={19} />
                                </div>}

                              <div
                                className={`w-1/4 md:w-1/5 text-center bg-gradient-to-r from-${event.color}-100 to-white rounded-lg mx-0 md:mx-2`}
                              >
                                <p className="font-semibold text-sm md:text-base">
                                  {startMonthAbbr}
                                </p>
                                <p className="font-bold text-lg md:text-2xl">
                                  {startDate.getDate()}
                                </p>
                              </div>
                              <div
                                className={`w-full border-l-4 pl-4 border-${event.color}-500`}
                              >
                                <p className="font-semibold text-sm md:text-base text-gray-700">
                                  {event.title}
                                </p>
                                <p className="flex text-xs md:text-sm text-gray-500">
                                  {event.location}
                                </p>
                                <p className="flex text-xs md:text-sm text-gray-500">
                                  {startMonthAbbr} {startDate.getDate()},{" "}
                                  {startDate.getFullYear()} - {endMonthAbbr}{" "}
                                  {endDate.getDate()}, {endDate.getFullYear()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateEventPopup
        openCreatePopup={openCreatePopup}
        setOpenCreatePopup={setOpenCreatePopup}
        onEventCreated={handleEventCreated}
      />
      <EditEventPopup
        openEditPopup={openEditPopup}
        setOpenEditPopup={setOpenEditPopup}
        selectedEvent={selectedEvent}
        onEditEvent={handleEditEvent}
      />
      <DeleteEventPopup
        openDeletePopup={openDeletePopup}
        setOpenDeletePopup={setOpenDeletePopup}
        selectedEvent={selectedEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default ManageEvents;
