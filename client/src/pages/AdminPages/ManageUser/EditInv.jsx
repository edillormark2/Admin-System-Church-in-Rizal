import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../Admin.css";
import Navbar from "../../../components/AdminComponents/Navbar";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { useStateContext } from "../../../redux/ContextProvider";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCamera } from "react-icons/fa";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import { app } from "../../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { Divider } from "@mui/material";

const EditInv = () => {
  const { activeMenu } = useStateContext();
  const { userID } = useParams();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isDataChanged, setIsDataChanged] = useState(false);

  const breadcrumbLinks = [
    { to: "/admin/dashboard", label: "Home" },
    { to: "/admin/manage-user", label: "Manage User" },
    { to: "/admin/manage-user/inventory-user", label: "Inventory User" },
    { to: "", label: "Edit User" }
  ];

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [signupError, setSignupError] = useState("");
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    locality: "",
    role: "Reg Coor",
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/server/users/userinv/${userID}`);
      setFormData({
        ...formData,
        name: response.data.name,
        locality: response.data.locality,
        profilePicture: response.data.profilePicture,
        role: response.data.role,
        dateCreated: response.data.dateCreated,
        username: response.data.username,
        password: response.data.password,
      });
      setLoading(false);
          setTimeout(() => {
            setShowLoader(false);
          }, 1000);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
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
      () => {
        setImageError(true);
      },
      async () => {
        try {
          await getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setFormData({ ...formData, profilePicture: downloadURL });
            setIsImageChanged(true); // Set isImageChanged to true when the image is uploaded
          });
        } catch (error) {
          console.error("Error updating profile picture: ", error);
        }
      }
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Only set isDataChanged to true if the value is different from the original value
    if (formData[id] !== value) {
      setIsDataChanged(true);
    }

    setFormData({ ...formData, [id]: value });
  };

  
  const handleSubmit = async e => {
    e.preventDefault();

     // Check if data or image has changed
     if (!isDataChanged && !isImageChanged) {
      toast.info("You haven't changed anything.");
      return;
    }

    try {
      setLoading(true);
      const updateData = { ...formData };
      const response = await axios.put(
        `http://localhost:3000/server/users/userinv/update/${userID}`,
        updateData
      );
      if (response.status === 200) {

        toast.success("User data updated successfully!");
      }
      await fetchUserData();
      setLoading(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update user data. Please try again later.");
      setLoading(false);
    }
  };

  
  

  return (
    <div className="bg-gray-200 mb-16">
      <div className="flex relative ">
        {activeMenu
          ? <div className="w-64 fixed sidebar drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>
          : <div className="w-0 drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>}
        <div
          className={` bg-gray-100 min-h-screen w-full ${activeMenu
            ? "lg:ml-60"
            : "flex-1"}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md z-10">
            <Navbar />
          </div>
          <div className="mt-28 md:mt-16 mx-4 md:mx-16 ">
            {showLoader // Conditional rendering to show loader spinner or the edit page
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
                  <div className="mb-12 md:mb-4">
                    <h1 className="text-2xl font-semibold mb-2 ">
                      Edit Inventory User
                    </h1>
                    <Breadcrumbs links={breadcrumbLinks} />
                  </div>
                  <div className="flex flex-col lg:flex-row  mx-8 md:mx-0 mt-8">
                    <div className="flex flex-col ml-0 mt-8 items-center bg-none lg:bg-white w-full lg:w-2/6 shadow-none lg:shadow-lg h-auto mb-4 rounded-xl ">
                      <div className="relative my-0 md:my-8">
                        <input
                          type="file"
                          ref={fileRef}
                          hidden
                          accept="image/*"
                          onChange={e => setImage(e.target.files[0])}
                        />
                        <img
                          src={formData.profilePicture}
                          alt="profile"
                          className="flex items-center w-44 h-44 rounded-full object-cover"
                          key={formData.profilePicture} // Change the key dynamically
                        />

                        <button
                          onClick={() => fileRef.current.click()}
                          className="absolute drop-shadow-lg bottom-1 right-3 bg-gray-300 rounded-full p-2 text-gray-600 hover:bg-primary hover:text-white cursor-pointer"
                        >
                          <FaCamera size={20} />
                        </button>
                      </div>
                      <div className="text-sm self-center mt-4">
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
                              ? <span className="text-green-500 font-semibold">
                                  Image uploaded successfully
                                </span>
                              : null}
                      </div>
                      <div className="flex justify-center font-semibold mt-4">
                        {formData.name}
                      </div>
                      <div className="flex justify-center text-sm text-gray-600 ">
                        {formData.role}
                      </div>
                    </div>
                    <div className="my-8 w-full lg:w-4/6 ml-0 lg:ml-12  ">
                      <form onSubmit={handleSubmit}>
                        <h5 className="text-xl relative  font-semibold mb-2">
                          User Information
                          <span className="h5-after bg-primary" />
                        </h5>
                        <Divider />
                        <div className="flex flex-row  gap-4 mt-4 mb-4">
                          <div className="w-full ">
                            <p className="text-sm mb-2">Name</p>
                            <input
                              type="text"
                              placeholder=""
                              id="name"
                              onChange={handleChange}
                              value={formData.name || ""}
                              className="form-control bg-slate-50 p-3 rounded-lg border border-gray-300 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
                            />
                          </div>
                          <div className="w-full ">
                            <p className="text-sm mb-2">Locality</p>
                            <input
                              type="text"
                              placeholder=""
                              id="locality"
                              onChange={handleChange}
                              value={formData.locality}
                              className="form-control bg-slate-50 p-3 rounded-lg border border-gray-300 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
                            />
                          </div>          
                        </div>
                        <div className="flex flex-row gap-4 mt-4 mb-4">
                        <div className="w-full">
                            <p className="text-sm mb-2">Role</p>
                            <input
                              type="text"
                              placeholder=""
                              id="role"
                              value={formData.role} // Making it view-only
                              readOnly // Making it view-only
                              className="form-read-only bg-slate-50 p-3 rounded-lg border border-gray-300 text-sm sm:text-base text-gray-500"
                            />
                          </div>
                          <div className="w-full ">
                            <p className="text-sm mb-2">Account Created</p>
                            <input
                              type="text"
                              placeholder=""
                              id="dateCreated"
                              onChange={handleChange}
                              value={formData.dateCreated}
                              readOnly 
                              className="form-read-only bg-slate-50 p-3 rounded-lg border  border-gray-300 text-sm sm:text-base text-gray-500 "
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4 mb-4">
                          <div className="w-full">
                            <p className="text-sm mb-2">Username</p>
                            <input
                              type="text"
                              placeholder=""
                              id="username"
                              onChange={handleChange}
                              value={formData.username}
                              className="form-control bg-slate-50 p-3 rounded-lg border border-gray-300 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
                            />
                          </div>
                          <div className="w-full">
                            <p className="text-sm mb-2">Password</p>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                placeholder=""
                                id="password"
                                onChange={handleChange}
                                value={formData.password}
                                className="form-control bg-slate-50 p-3  rounded-lg border border-gray-300 pr-10 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
                              />
                              <div
                                className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-gray-500 "
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword
                                  ? <AiFillEye size={23} />
                                  : <AiFillEyeInvisible size={23} />}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center ">
                          <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary w-full text-white p-3 rounded-lg hover:opacity-85 disabled:opacity-80 text-sm sm:text-base mt-4"
                          >
                            {loading ? "Loading..." : "Update"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInv;
