import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { loading } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setLoginError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.username && !formData.password) {
      setLoginError("Please fill out all fields");
      return;
    }
    if (!formData.username) {
      setLoginError("Username is required");
      return;
    }
    if (!formData.password) {
      setLoginError("Password is required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/server/login/adminlogin",
        formData
      );
      const userData = response.data; // Assuming the response contains user data
      userData.role = "admin"; // Add role information, assuming it's 'admin'
      dispatch(signInSuccess(userData));
      navigate("/admin/dashboard");
    } catch (error) {
      dispatch(signInFailure(error));
      if (error.response && error.response.status === 401) {
        setLoginError("Email or password is incorrect");
      } else if (error.response && error.response.status === 404) {
        setLoginError("User not found");
      } else {
        setLoginError("Error signing in");
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-12 md:mt-28 mb-16 md:mb-0">
      {loginError &&
        <div className="text-red-600 font-semibold text-sm mx-4 my-2 px-6 py-2 mt-9  text-center bg-red-200 rounded-lg opacity-90">
          {loginError}
        </div>}
      <div
        className={`dark:bg-secondary-dark-bg bg-white drop-shadow-2xl p-6 ${loginError
          ? "mt-2"
          : "mt-20"} m-4 rounded-2xl`}
      >
        <h1 className="dark:text-gray-200 text-2xl sm:text-2xl text-center font-semibold mb-7">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-sm">Username</p>
          <input
            type="text"
            placeholder=""
            id="username"
            onChange={handleChange}
            value={formData.username}
            className="form-control bg-slate-50 p-3 rounded-lg border border-gray-300 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
          />
          <p className="text-sm">Password</p>
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
          <p className="text-sm hover:text-primary cursor-pointer">
            Forgot Your Password?
          </p>
          <button className="bg-primary text-white p-3 rounded-lg  hover:opacity-85 disabled:opacity-80 text-sm sm:text-base mt-4">
            {loading ? "Loading..." : "Login"}
          </button>
          <div className="bg-blue-100 p-2 rounded-md mt-4 text-sm">
            <p className="font-semibold text-blue-900">Login as Admin</p>
            <ul className="list-disc list-inside p-4 text-blue-900">
              <li>Access administrative functions and settings</li>
              <li>Manage user accounts and permissions</li>
              <li>Configure system settings and preferences</li>
              <li>Oversee the overall operation of the application</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
