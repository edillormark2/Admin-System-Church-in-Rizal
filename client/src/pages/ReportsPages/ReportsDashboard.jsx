import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const ReportsDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear local storage
    localStorage.clear();

    // Dispatch signOut action
    dispatch(signOut());

    // Navigate to admin login page after signout
    navigate("/reportslogin");
  };

  return (
    <div className="flex flex-col items-center mt-40">
      <h1 className="mb-4">Welcome Report Department</h1>
      <button
        className="p-2 bg-white rounded-lg border border-primary cursor-pointer hover:bg-primary hover:text-white"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default ReportsDashboard;
