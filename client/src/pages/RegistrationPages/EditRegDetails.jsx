import React, { useState, useEffect, useRef } from "react";
import "./Reg.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import { app } from "../../firebase";
import Navbar from "../../components/RegComponents/Navbar";
import Sidebar from "../../components/RegComponents/Sidebar";
import { useStateContext } from "../../redux/ContextProvider";
import { MdLocationOn } from "react-icons/md";
import { TbCurrencyPeso } from "react-icons/tb";
import Breadcrumbs from "../../components/Breadcrumbs";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
import { Divider } from "@mui/material";

const EditRegDetails = () => {
  const { id } = useParams();
  const fileRef = useRef(null);
  const { activeMenu } = useStateContext();
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    cardImage: "",
    status: "",
    formTitle: "",
    description: ""
  });

  const [titleLength, setTitleLength] = useState(0);
  const [localityLength, setLocalityLength] = useState(0);
  const [priceLength, setPriceLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const handleChange = e => {
    const { id, value } = e.target;
    const maxLength = id === "title" ? 30 : id === "location" ? 20 : 6;
    if (id === "description") {
      setFormData({ ...formData, description: value });
      setIsDataChanged(formData.description !== value);
    } else if (id === "formTitle") {
      setFormData({ ...formData, formTitle: value });
      setIsDataChanged(formData.formTitle !== value);
    } else {
      if (value.length <= maxLength) {
        if (formData[id] !== value) {
          setIsDataChanged(true);
        }
        setFormData({ ...formData, [id]: value });
        if (id === "title") {
          setTitleLength(value.length);
        } else if (id === "location") {
          setLocalityLength(value.length);
        }
      }
    }
  };

  const fetchRegistrationData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/server/registration/registration-get/${id}`
      );
      setFormData({
        ...formData,
        title: response.data.title,
        status: response.data.status,
        location: response.data.location,
        price: response.data.price,
        cardImage: response.data.cardImage,
        formTitle: response.data.formTitle,
        description: response.data.description
      });

      // Set default state values for titleLength and localityLength
      setTitleLength(response.data.title.length);
      setLocalityLength(response.data.location.length);
      setPriceLength(response.data.price.length);

      setLoading(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching registration data:", error);
    }
  };

  useEffect(() => {
    fetchRegistrationData();
  }, []);

  useEffect(
    () => {
      if (image) {
        handleFileUpload(image);
      }
    },
    [image]
  );

  const handleFileUpload = async newImage => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + newImage.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, newImage);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        setImagePercent(Math.round(progress));
      },
      error => {
        console.error("Error uploading image: ", error);
        setImageError(true); // Set image error state
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData({ ...formData, cardImage: downloadURL });
          setIsImageChanged(true); // Set isImageChanged to true when the image is uploaded
        } catch (error) {
          console.error("Error updating card image URL: ", error);
        }
      }
    );
  };

  const handleSave = async e => {
    e.preventDefault();

    // Check if data or image has changed
    if (!isDataChanged && !isImageChanged) {
      toast.info("You haven't changed anything.");
      return;
    }

    // Check if name, locality, or username is empty
    if (
      !formData.title ||
      !formData.location ||
      !formData.price ||
      !formData.description ||
      !formData.formTitle
    ) {
      toast.error("Please fill out all fields.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:3000/server/registration/registration-update/${id}`,
        formData
      );
      toast.success("Updated successfully!");
    } catch (error) {
      toast.error("Error updating registration data:", error);
    }
  };

  const breadcrumbLinks = [
    { to: "/registration/dashboard", label: "Home" },
    { to: "/registration/manage-registration", label: "Registration" },
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
            {showLoader
              ? <div className="p-16 mt-60 flex flex-col items-center">
                  <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#85929E"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  <p>Loading</p>
                </div>
              : <div>
                  <h1 className="text-xl md:text-2xl font-semibold mb-2 ">
                    Edit Registration Details
                  </h1>
                  <Breadcrumbs links={breadcrumbLinks} />
                  <div className="mt-4 flex flex-col lg:flex-row gap-4">
                    <div className="w-80 max-w-1/4 mx-auto lg:mx-0">
                      <p className="text-slate-400 text-sm my-2">Overview</p>
                      <div className="relative bg-white rounded-md drop-shadow-xl dark:bg-secondary-dark-bg mb-6">
                        <div>
                          <input
                            type="file"
                            ref={fileRef}
                            hidden
                            accept="image/*"
                            onChange={e => setImage(e.target.files[0])}
                          />
                          <img
                            className="h-52 w-full object-cover rounded-t-lg"
                            src={formData.cardImage}
                            alt="image"
                            key={formData.cardImage}
                          />
                          <button
                            onClick={() => fileRef.current.click()}
                            className="absolute top-1 left-2 bg-black opacity-50 rounded-full p-2   text-white hover:opacity-80 text-sm hover:text-white cursor-pointer"
                          >
                            <FaCamera size={18} />
                          </button>
                        </div>
                        <div
                          className={`absolute top-2 right-2 py-1 px-2 rounded-md text-xs ${formData.status ===
                          "Open"
                            ? "bg-green-500 text-white opacity-80"
                            : formData.status === "Closed"
                              ? "bg-red-500 text-white opacity-75"
                              : ""}`}
                        >
                          {formData.status}
                        </div>

                        <div className="flex flex-col m-2 dark:text-gray-200">
                          <div className="flex justify-between">
                            <p className="flex items-center text-sm">
                              <MdLocationOn className="mr-1" />
                              {formData.location}
                            </p>
                            <p className="flex items-center text-sm">
                              <TbCurrencyPeso className="mr-1" />
                              {formData.price}
                            </p>
                          </div>
                          <h1 className="text-md font-semibold mt-2 dark:text-gray-200 mb-4">
                            {formData.title}
                          </h1>

                          <div className="bg-primary text-white text-center p-2 rounded-md hover:opacity-85 disabled:opacity-80 text-sm sm:text-base cursor-pointer m-2">
                            Register Now
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center text-sm mx-auto my-4">
                        {imageError
                          ? <span className="text-red-500">
                              Error uploading image (file size must be less than
                              3 MB)
                            </span>
                          : imagePercent > 0 && imagePercent < 100
                            ? <span className="text-slate-700 dark:text-gray-200">
                                Uploading: {imagePercent}%
                                <span
                                  className="block h-1 bg-blue-500"
                                  style={{
                                    width: `${imagePercent}%`,
                                    transition: "width 0.3s ease-out"
                                  }}
                                />
                              </span>
                            : imagePercent === 100 &&
                              image &&
                              image.size <= 3 * 1024 * 1024
                              ? <span className="text-green-500 text-sm">
                                  Image uploaded successfully
                                </span>
                              : null}
                      </div>
                    </div>
                    <div className="w-full lg:w-2/3">
                      <p className="text-slate-400 text-sm my-2">
                        Edit Details
                      </p>
                      <div className="bg-white rounded-lg shadow-lg p-4">
                        <div className="w-full  my-4">
                          <div className="flex justify-between">
                            <p className="text-sm font-semibold">Title</p>
                            <p className="text-sm ml-2 text-gray-400">
                              {titleLength}/{20}
                            </p>
                          </div>
                          <input
                            type="text"
                            placeholder=""
                            id="title"
                            maxLength={30}
                            autoComplete="off"
                            onChange={handleChange}
                            value={formData.title}
                            className="form-control bg-white p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                          <div className="w-full my-4">
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold">Location</p>
                              <p className="text-sm ml-2 text-gray-400">
                                {localityLength}/{20}
                              </p>
                            </div>

                            <input
                              type="text"
                              placeholder=""
                              id="location"
                              maxLength={20}
                              autoComplete="off"
                              onChange={handleChange}
                              value={formData.location}
                              className="form-control bg-white p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                            />
                          </div>
                          <div className="w-full my-4">
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold">Price</p>
                              <p className="text-sm ml-2 text-gray-400">
                                {priceLength}/{20}
                              </p>
                            </div>
                            <input
                              type="text"
                              placeholder=""
                              id="price"
                              autoComplete="off"
                              maxLength={6}
                              onChange={handleChange}
                              value={formData.price}
                              className="form-control bg-white p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                            />
                          </div>
                        </div>
                        <Divider />
                        <p className="text-sm text-gray-400 my-4">
                          Note: The Title and Description fields in this section
                          are only visible within a registration form. In the
                          Title field, you can input a title for the form, and
                          in the Description field, you can include
                          requirements, rules, qualifications, etc.
                        </p>
                        <div className="w-full my-4 ">
                          <p className="text-sm font-semibold">Title</p>

                          <input
                            type="text"
                            placeholder=""
                            id="formTitle"
                            autoComplete="off"
                            onChange={handleChange}
                            value={formData.formTitle}
                            className="form-control bg-white p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                          />
                        </div>
                        <div className="w-full my-6">
                          <p className="text-sm font-semibold">Description</p>

                          <textarea
                            placeholder=""
                            id="description"
                            onChange={handleChange}
                            value={formData.description}
                            autoComplete="off"
                            className="form-control bg-white p-3  mt-2 rounded-lg border border-gray-300 text-sm sm:text-base overflow-scroll"
                            rows="3"
                          />
                        </div>
                        <div
                          onClick={handleSave}
                          disabled={loading}
                          className="bg-primary text-white text-center p-2 rounded-md hover:opacity-70 disabled:opacity-80 text-sm sm:text-base cursor-pointer mt-8 "
                        >
                          {loading ? "Loading..." : "Save"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRegDetails;
