import { useState, useEffect, useRef } from "react";
import "./Reg.css";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import { MdLocationOn } from "react-icons/md";
import { TbCurrencyPeso } from "react-icons/tb";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

const EditRegDetails = () => {
  const { activeMenu } = useStateContext();
  const [formData, setFormData] = useState({
    title: "",
    locality: "",
    price: "",
    image: "",
    status: "",
    description: ""
  });

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const breadcrumbLinks = [
    { to: "/registration/dashboard", label: "Home" },
    { to: "/registration/manage-registration", label: "Registraion" },
    { to: "", label: "Edit Details" }
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
          <div className="my-28 md:my-8 mx-10 md:mx-16 ">
            <h1 className="text-xl md:text-2xl font-semibold mb-2 ">
              Edit Registration Details
            </h1>
            <Breadcrumbs links={breadcrumbLinks} />
            <div className="mt-4 flex flex-col lg:flex-row gap-4">
              <div className="w-2/3 lg:w-1/4 mx-auto lg:mx-0">
                <p className="text-slate-400 text-sm my-2">Overview</p>
                <div className="relative bg-white rounded-md drop-shadow-xl dark:bg-secondary-dark-bg mb-6">
                  <img
                    className="h-52 w-full object-cover rounded-t-lg"
                    alt=""
                  />
                  <div className="absolute top-2 right-2 bg-primary text-white py-1 px-2 rounded-md text-xs opacity-75">
                    status
                  </div>
                  <div className="flex flex-col m-2 dark:text-gray-200">
                    <div className="flex justify-between">
                      <p className="flex items-center text-sm">
                        <MdLocationOn className="mr-1" />
                        loc
                      </p>
                      <p className="flex items-center text-sm">
                        <TbCurrencyPeso className="mr-1" />
                        price
                      </p>
                    </div>
                    <h1 className="text-md font-semibold mt-2 dark:text-gray-200 mb-4">
                      title
                    </h1>

                    <div className="bg-primary text-white text-center p-2 rounded-md hover:opacity-85 disabled:opacity-80 text-sm sm:text-base cursor-pointer m-2">
                      Register Now
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-2/3">
                <p className="text-slate-400 text-sm my-2">Edit Details</p>
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <div>
                    <p className="text-sm">Image</p>
                    <img
                      className="h-44 w-64 object-cover rounded-t-lg py-2"
                      alt=""
                    />
                  </div>
                  <div className="w-full  mb-4">
                    <p className="text-sm">Title</p>
                    <input
                      type="text"
                      placeholder=""
                      id="Title"
                      autoComplete="off"
                      onChange={handleChange}
                      className="form-control bg-slate-50 p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                    />
                  </div>

                  <div className="w-full mb-4">
                    <p className="text-sm">Locality</p>
                    <input
                      type="text"
                      placeholder=""
                      id="locality"
                      autoComplete="off"
                      onChange={handleChange}
                      className="form-control bg-slate-50 p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                    />
                  </div>
                  <div className="w-full mb-4">
                    <p className="text-sm">Price</p>
                    <input
                      type="number"
                      placeholder=""
                      id="price"
                      autoComplete="off"
                      min="0"
                      max="100000000"
                      onChange={handleChange}
                      className="form-control bg-slate-50 p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                    />
                  </div>

                  <div className="w-full mb-4">
                    <p className="text-sm">Description</p>
                    <p className="text-sm text-slate-400 my-2">
                      Note: The Description field is only visible within a
                      registration form. In this field, you can input a
                      description for the form, including requirements, rules,
                      qualifications, etc.
                    </p>
                    <textarea
                      placeholder=""
                      id="description"
                      onChange={handleChange}
                      autoComplete="off"
                      className="form-control bg-white p-3  mt-2 rounded-lg border border-gray-300 text-sm sm:text-base overflow-scroll"
                      rows="3"
                    />
                  </div>
                  <div className="bg-primary text-white text-center p-2 rounded-md hover:opacity-85 disabled:opacity-80 text-sm sm:text-base cursor-pointer ">
                    Save
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

export default EditRegDetails;
