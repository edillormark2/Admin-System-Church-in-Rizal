import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const RegistrationLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  return (
    <div className="p-3 max-w-lg mx-auto mt-12 md:mt-28 mb-16 md:mb-0">
      <div className="dark:bg-secondary-dark-bg bg-white drop-shadow-2xl p-6 mt-20 m-4 rounded-2xl">
        <h1 className="dark:text-gray-200 text-2xl sm:text-2xl text-center font-semibold mb-7">
          Login
        </h1>
        <form className="flex flex-col gap-4">
          <p className="text-sm">Username</p>
          <input
            type="email"
            placeholder=""
            id="email"
            className="form-control bg-slate-50 p-3 rounded-lg border border-gray-300 text-sm sm:text-base dark:bg-half-transparent dark:text-gray-200"
          />
          <p className="text-sm">Password</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              id="password"
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
            Login
          </button>
          <div className="bg-blue-100 p-2 rounded-md mt-4 text-sm">
            <p className="font-semibold text-blue-900">
              Login for Registration Department
            </p>
            <ul className="list-disc list-inside p-4 text-blue-900">
              <li>View event registration data</li>
              <li>Modify and manage event registration records</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationLogin;
