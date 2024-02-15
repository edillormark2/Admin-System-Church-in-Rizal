import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [signupError, setSignupError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    role: "Admin", // Setting default value to "Admin"
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setSignupError("");
  };

  // Your existing handleSubmit function with modifications
  const handleSubmit = async e => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.role ||
      !formData.username ||
      !formData.password
    ) {
      setSignupError("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/server/login/adminsignup",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setLoading(false);
      toast.success("Account created successfully");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists");
      } else {
        toast.error("Error submitting data");
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-12 md:mt-28 mb-16 md:mb-0">
      {signupError &&
        <div className="text-red-600 font-semibold text-sm mx-4 my-2 px-6 py-2 mt-9  text-center bg-red-200 rounded-lg opacity-90">
          {signupError}
        </div>}
      <div className="dark:bg-secondary-dark-bg bg-white drop-shadow-2xl p-6 mt-20 m-4 rounded-2xl">
        <h1 className="dark:text-gray-200 text-2xl sm:text-2xl text-center font-semibold mb-7">
          Signup
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-sm">Name</p>
          <input
            type="text"
            placeholder=""
            id="name"
            onChange={handleChange}
            value={formData.name}
            className="form-control bg-slate-50 p-3 rounded-lg border border-gray-300 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
          />
          <p className="text-sm">Role</p>
          <input
            type="text"
            placeholder=""
            id="role"
            value={formData.role} // Making it view-only
            readOnly // Making it view-only
            className="form-control bg-slate-50 p-3 rounded-lg border border-gray-300 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
          />
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
          <button
            disabled={loading}
            className="bg-primary text-white p-3 rounded-lg  hover:opacity-85 disabled:opacity-80 text-sm sm:text-base mt-4"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
