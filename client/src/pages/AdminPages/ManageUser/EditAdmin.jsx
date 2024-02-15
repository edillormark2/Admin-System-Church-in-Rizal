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
import { updateUserSuccess } from "../../../redux/user/userSlice";

const EditAdmin = () => {
  const { activeMenu } = useStateContext();
  const { userID } = useParams();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const breadcrumbLinks = [
    { to: "/admin/dashboard", label: "Home" },
    { to: "/admin/manage-user", label: "Manage User" },
    { to: "/admin/manage-user/admin-user", label: "Admin User" },
    { to: "", label: "Edit User" }
  ];

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [signupError, setSignupError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    role: "Admin",
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:3000/server/users/useradmin/${userID}`
          );
          const userData = response.data;
          setFormData(userData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data. Please try again later.");
          setLoading(false);
        }
      };

      fetchUserData();
    },
    [userID]
  );
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

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setSignupError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/server/users/useradmin/update/${userID}`,
        formData
      );
      if (response.status === 200) {
        toast.success("User data updated successfully!");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update user data. Please try again later.");
      setLoading(false);
    }
  };

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
          className={` bg-gray-100 min-h-screen w-full ${activeMenu
            ? "md:ml-60"
            : "flex-1"}`}
        >
          <div className="fixed md:static navbar w-full md:w-11/12 mx-auto rounded-md">
            <Navbar />
          </div>
          <div className="my-28 md:my-16 mx-4 md:mx-16 ">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold mb-2 ">Edit Admin User</h1>
              <Breadcrumbs links={breadcrumbLinks} />
            </div>
            <div className="flex flex-col md:w-full max-w-screen-xl mx-8 md:mx-4 items-center mt-4">
              <div className="relative">
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/*"
                  onChange={e => setImage(e.target.files[0])}
                />
                <img
                  src={
                    formData.profilePicture
                      ? `${formData.profilePicture}?${Math.random()}`
                      : currentUser && currentUser.profilePicture
                  }
                  alt="profile"
                  className="flex items-center w-36 h-36 cursor-pointer rounded-full object-cover"
                  key={formData.profilePicture || Math.random()} // Change the key dynamically
                />

                <button
                  onClick={() => fileRef.current.click()}
                  className="absolute bottom-1 right-1 bg-gray-300 rounded-full p-2 text-gray-600 hover:bg-primary hover:text-white cursor-pointer"
                >
                  <FaCamera size={20} />
                </button>
              </div>
              <p className="text-sm self-center mt-4">
                {imageError
                  ? <span className="text-red-700">
                      Error uploading image (file size must be less than 3 MB)
                    </span>
                  : imagePercent > 0 && imagePercent < 100
                    ? <span className="text-slate-700 dark:text-gray-200">
                        Uploading: {imagePercent}%
                        <span
                          className="block h-1 bg-blue-500"
                          style={{
                            width: `${imagePercent}%`,
                            transition: "width 0.3s ease-out" // Smooth transition effect
                          }}
                        />
                      </span>
                    : imagePercent === 100 &&
                      image &&
                      image.size <= 3 * 1024 * 1024
                      ? <span className="text-green-700 font-semibold">
                          Image uploaded successfully
                        </span>
                      : null}
              </p>

              <div className="my-8 w-full md:w-5/6">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="w-full">
                      <p className="text-sm mb-2">Name</p>
                      <input
                        type="text"
                        placeholder=""
                        id="name"
                        onChange={handleChange}
                        value={formData.name}
                        className="form-control bg-slate-50 p-3 rounded-lg border border-gray-300 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-sm mb-2">Role</p>
                      <input
                        type="text"
                        placeholder=""
                        id="role"
                        value={formData.role} // Making it view-only
                        readOnly // Making it view-only
                        className="form-control bg-slate-50 p-3 rounded-lg border border-gray-300 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
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
                  <div className="flex justify-center">
                    <button
                      disabled={loading}
                      className="bg-primary text-white p-3 rounded-lg w-52  hover:opacity-85 disabled:opacity-80 text-sm sm:text-base mt-4"
                    >
                      {loading ? "Loading..." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;
