import { useState, useEffect, useRef } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} from "../../redux/user/userSlice";
import { ThreeDots } from "react-loader-spinner";

const RegProfileSettings = () => {
  const token = localStorage.getItem("access_token");
  const { activeMenu } = useStateContext();

  const fileRef = useRef(null);
  const { userID } = useParams();
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const [showAccount, setShowAccount] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Account");

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showPasswordnew, setShowPasswordnew] = useState(false);
  const togglePasswordVisibilitynew = () => {
    setShowPasswordnew(!showPasswordnew);
  };

  const [showPasswordconfirm, setShowPasswordconfirm] = useState(false);
  const togglePasswordVisibilityconfirm = () => {
    setShowPasswordconfirm(!showPasswordconfirm);
  };
  const [formData, setFormData] = useState({
    name: "",
    locality: "",
    role: "",
    username: "",
    password: "",
    profilePicture: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/server/users/userreg/${userID}`
      );
      setFormData({
        ...formData,
        name: response.data.name,
        locality: response.data.locality,
        profilePicture: response.data.profilePicture,
        role: response.data.role,
        dateCreated: response.data.dateCreated,
        username: response.data.username,
        password: response.data.password
      });
      setLoading(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 800);
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

  const handleMenuClick = menu => {
    setSelectedMenu(menu);
    setShowAccount(menu === "Account");
  };

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
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setFormData({ ...formData, profilePicture: downloadURL });
          setIsImageChanged(true); // Set isImageChanged to true when the image is uploaded
        } catch (error) {
          console.error("Error updating profile picture: ", error);
        }
      }
    );
  };
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { id, value } = e.target;

    // Only set isDataChanged to true if the value is different from the original value
    if (formData[id] !== value) {
      setIsDataChanged(true);
    }

    // If the changed field is one of the password fields, update the state of formData accordingly
    if (
      id === "currentPassword" ||
      id === "newPassword" ||
      id === "confirmPassword"
    ) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [id]: value
      }));
    } else {
      // For non-password fields, directly update the state
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Check if data or image has changed
    if (!isDataChanged && !isImageChanged) {
      toast.info("You haven't changed anything.");
      return;
    }

    // Check if name, locality, or username is empty
    if (!formData.name || !formData.locality || !formData.username) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      dispatch(updateUserStart());
      const updateData = { ...formData };
      const response = await axios.put(
        `http://localhost:3000/server/users/userreg/update/${userID}`,
        updateData
      );
      if (response.status === 200) {
        dispatch(updateUserSuccess(response.data));
        toast.success(response.data.message || "Updated successfully");
        await fetchUserData();
      } else {
        dispatch(updateUserFailure(response.data));
        toast.error(response.data.message || "Error updating data");
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch(updateUserFailure(error));
      toast.error("Error updating data");
    }
  };

  const changePassword = async e => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill out all password fields.");
      return;
    }

    // Check if new password matches confirm password
    if (formData.newPassword !== formData.confirmPassword) {
      toast.warning("New password and confirm password must match.");
      return;
    }

    // Check if new password meets security requirements
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      toast.warning(
        "New password must be at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter."
      );
      return;
    }

    try {
      // Check if current password matches the password in the database
      if (formData.currentPassword !== formData.password) {
        toast.error("Current password is incorrect.");
        return;
      }

      dispatch(updateUserStart());
      const updateData = { ...formData, password: formData.newPassword };
      const response = await axios.put(
        `http://localhost:3000/server/users/userreg/update/${userID}`,
        updateData
      );
      if (response.status === 200) {
        dispatch(updateUserSuccess(response.data));
        toast.success(response.data.message || "Password updated successfully");

        // Clear password-related fields in formData
        setFormData(prevFormData => ({
          ...prevFormData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }));
        setShowLoader(true);
        setTimeout(() => {
          setShowLoader(false);
        }, 1000);

        await fetchUserData();
      } else {
        dispatch(updateUserFailure(response.data));
        toast.error(response.data.message || "Error updating password");
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch(updateUserFailure(error));
      toast.error("Error updating password");
    }
  };

  return (
    <div className="bg-gray-200 ">
      <div className="flex relative mb-48">
        {activeMenu
          ? <div className="w-64 fixed sidebar drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>
          : <div className="w-0 drop-shadow-xl bg-gray-100">
              <Sidebar />
            </div>}
        <div
          className={` bg-gray-100 w-full  ${activeMenu
            ? "lg:ml-60 "
            : "flex-1  "}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md">
            <Navbar />
          </div>
          <div className="mb-48 my-28 md:my-16 mx-6 md:mx-10 xl:mx-16 ">
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
                  <h1 className="mb-4 text-2xl font-semibold">My Profile</h1>
                  <div className="flex flex-col lg:flex-row gap-4 xl:gap-8">
                    <div className=" bg-none lg:bg-white  shadow-none lg:shadow-lg  rounded-lg mx-auto lg:mx-0 w-72 p-0 lg:p-4 h-64 lg:h-80 ">
                      <div className="flex justify-center flex-col items-center">
                        <div className="relative mt-4">
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
                            className="flex items-center w-32 h-32 rounded-full object-cover"
                            key={formData.profilePicture} // Change the key dynamically
                          />
                          <button
                            onClick={() => fileRef.current.click()}
                            className="absolute drop-shadow-lg bottom-1 right-0 bg-gray-300 rounded-full p-2 text-gray-600 hover:bg-primary hover:text-white cursor-pointer"
                          >
                            <FaCamera size={20} />
                          </button>
                        </div>
                        <div className="text-sm self-center m-4">
                          {imageError
                            ? <span className="text-red-500">
                                Error uploading image (file size must be less
                                than 3 MB)
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
                        <div className="flex justify-center font-semibold mt-0">
                          {currentUser.name}
                        </div>
                        <div className="flex justify-center text-sm text-gray-600 ">
                          {currentUser.role}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-md drop-shadow-lg w-full xl:w-8/12 h-16">
                      <ul className="flex flex-row gap-8 ml-4 my-4">
                        <li
                          className={`cursor-pointer text-sm md:text-base  ${selectedMenu ===
                          "Account"
                            ? "pb-2 border-b-2  border-primary text-primary"
                            : ""}`}
                          onClick={() => handleMenuClick("Account")}
                        >
                          Account
                        </li>
                        <li
                          className={`cursor-pointer text-sm md:text-base ${selectedMenu ===
                          "Change Password"
                            ? "pb-2 border-b-2 border-primary text-primary"
                            : ""}`}
                          onClick={() => handleMenuClick("Change Password")}
                        >
                          Change Password
                        </li>
                      </ul>
                      {showAccount
                        ? <div className="mt-8 w-auto">
                            <div className="text-sm md:text-base">
                              <h1 className="font-semibold">Access</h1>
                              <ul className="list-disc list-inside p-2 text-gray-600">
                                <li>
                                  Access administrative functions and settings
                                </li>
                                <li>Manage user accounts and permissions</li>
                                <li>
                                  Configure system settings and preferences
                                </li>
                                <li>
                                  Oversee the overall operation of the
                                  application
                                </li>
                              </ul>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                              <div className="w-full">
                                <p className="text-sm">Name</p>
                                <input
                                  type="text"
                                  placeholder=""
                                  id="name"
                                  autoComplete="off"
                                  value={formData.name || ""}
                                  onChange={handleChange}
                                  className="form-control bg-slate-50 p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                                />
                              </div>
                              <div className="w-full">
                                <p className="text-sm">Locality</p>
                                <input
                                  type="text"
                                  placeholder=""
                                  id="locality"
                                  autoComplete="off"
                                  value={formData.locality}
                                  onChange={handleChange}
                                  className="form-control bg-slate-50 p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base "
                                />
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                              <div className="w-full">
                                <p className="text-sm">Role</p>
                                <input
                                  type="text"
                                  placeholder=""
                                  id="role"
                                  autoComplete="off"
                                  value={formData.role}
                                  readOnly
                                  className="form-read-only bg-slate-50 p-3 mt-2 rounded-lg border border-gray-300 text-sm sm:text-base text-gray-500"
                                />
                              </div>
                              <div className="w-full">
                                <p className="text-sm">Username</p>
                                <input
                                  type="text"
                                  placeholder=""
                                  id="username"
                                  autoComplete="off"
                                  value={formData.username}
                                  onChange={handleChange}
                                  className="form-control bg-slate-50  mt-2 p-3 rounded-lg border border-gray-300 text-sm sm:text-base "
                                />
                              </div>
                            </div>
                            <div className="mt-4">
                              <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-primary w-full text-white p-3 rounded-lg hover:opacity-85 disabled:opacity-80 text-sm sm:text-base mt-2 lg:mt-4 mb-8"
                              >
                                {loading ? "Loading..." : "Save"}
                              </button>
                            </div>
                          </div>
                        : <div className="mt-8 w-auto">
                            <div className="text-sm md:text-base">
                              <h1 className="font-semibold">Security</h1>
                              <ul className="list-disc list-inside p-2 text-gray-600">
                                <li>
                                  Minimum 8 characters, at least one number, at
                                  least one lower case letter, at least one
                                  upper case letter.
                                </li>
                              </ul>
                            </div>
                            <div className="w-full my-4 ">
                              <p className="text-sm mb-2">Current Password</p>
                              <div className="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  placeholder=""
                                  id="currentPassword"
                                  onChange={handleChange}
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
                            <div className="w-full my-4">
                              <p className="text-sm mb-2">New Password</p>
                              <div className="relative">
                                <input
                                  type={showPasswordnew ? "text" : "password"}
                                  placeholder=""
                                  id="newPassword"
                                  onChange={handleChange}
                                  className="form-control bg-slate-50 p-3  rounded-lg border border-gray-300 pr-10 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
                                />
                                <div
                                  className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-gray-500 "
                                  onClick={togglePasswordVisibilitynew}
                                >
                                  {showPasswordnew
                                    ? <AiFillEye size={23} />
                                    : <AiFillEyeInvisible size={23} />}
                                </div>
                              </div>
                            </div>
                            <div className="w-full my-4">
                              <p className="text-sm mb-2">Confirm Password</p>
                              <div className="relative">
                                <input
                                  type={
                                    showPasswordconfirm ? "text" : "password"
                                  }
                                  placeholder=""
                                  id="confirmPassword"
                                  onChange={handleChange}
                                  className="form-control bg-slate-50 p-3  rounded-lg border border-gray-300 pr-10 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
                                />
                                <div
                                  className="absolute inset-y-0 right-2 flex items-center pr-2 cursor-pointer text-gray-500 "
                                  onClick={togglePasswordVisibilityconfirm}
                                >
                                  {showPasswordconfirm
                                    ? <AiFillEye size={23} />
                                    : <AiFillEyeInvisible size={23} />}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <button
                                onClick={changePassword}
                                disabled={loading}
                                className="bg-primary w-full text-white p-3 rounded-lg hover:opacity-85 disabled:opacity-80 text-sm sm:text-base mt-2 lg:mt-4 mb-10"
                              >
                                {loading ? "Loading..." : "Save"}
                              </button>
                            </div>
                          </div>}
                    </div>
                  </div>
                </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegProfileSettings;
