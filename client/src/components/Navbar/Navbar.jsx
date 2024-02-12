// Importing React and necessary hooks
import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";

// Array of navigation links
export const Navlinks = [
  {
    id: 1,
    name: "Admin",
    link: "/adminlogin"
  },
  {
    id: 2,
    name: "Registration",
    link: "/registrationlogin"
  },
  {
    id: 3,
    name: "Inventory",
    link: "/inventorylogin"
  },
  {
    id: 4,
    name: "Reports",
    link: "/reportslogin"
  }
];

// Navbar component
const Navbar = () => {
  // State variables
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("/");

  // Effect to update currentPath when URL changes
  useEffect(
    () => {
      setCurrentPath(location.pathname);
    },
    [location.pathname]
  );

  // Function to toggle menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to handle click on nav links
  const handleNavLinkClick = link => {
    setCurrentPath(link);
    navigate(link); // Navigate to the clicked link
    setShowMenu(false); // Close the menu after clicking a link
    window.scrollTo({ top: 0 });
  };

  return (
    <div>
      <div className="flex bg-white sm:rounded-xl drop-shadow-2xl duration-400 mt-8 w-11/12 md:w-9/12 mx-auto rounded-md">
        <div className="container p-2 md:p-1">
          <div className="flex justify-between items-center w-full max-w-6xl mx-auto ">
            <div>
              <span className="font-bold text-sm sm:text-sm xl:text-lg ml-8 xl:ml-24">
                Login
              </span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex items-center gap-5">
                {/* Mapping through Navlinks array */}
                {Navlinks.map(({ id, name, link }) =>
                  <li key={id} className="py-4">
                    <NavLink
                      to={link}
                      onClick={() => handleNavLinkClick(link)}
                      className={`text-sm sm:text-base hover:bg-gray-200 dark:hover:text-black p-3 rounded-md ${currentPath ===
                        link ||
                      (currentPath === "/" && link === "/adminlogin") // Check if the current path matches the link or if the current path is "/" and the link is "/adminlogin"
                        ? "text-primary bg-gray-200"
                        : ""}`}
                    >
                      {name}
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
            {/* Mobile view  */}
            <div className="flex items-center gap-4 md:hidden ">
              {/* Mobile Hamburger icon */}
              {showMenu
                ? <HiMenuAlt1
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={20}
                  />
                : <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={20}
                  />}
            </div>
          </div>
        </div>
      </div>
      <div className="z-10">
        <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </div>
  );
};

export default Navbar;
