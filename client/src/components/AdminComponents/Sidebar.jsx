import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../../redux/ContextProvider";
import { links } from "./Menu"; // Import your links data
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [openSection, setOpenSection] = useState("");
  const [activeNavLink, setActiveNavLink] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [activeParentMenu, setActiveParentMenu] = useState(""); // Track active parent menu
  const [arrowMarginLeft, setArrowMarginLeft] = useState(50);
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    let parentLinkActive = false; // Track if any parent link is active
    links.forEach((category) => {
      category.links.forEach((link) => {
        if (link.subMenu) {
          link.subMenu.forEach((subItem) => {
            if (subItem.url === pathname) {
              setOpenSection(link.name);
              setActiveSubMenu(subItem.url);
              setActiveParentMenu(link.url); // Set active parent menu when submenu is active
              parentLinkActive = true; // Set parent link active
            }
          });
        } else if (link.url === pathname) {
          setActiveParentMenu(link.url); // Set active parent menu when a link is active
        }
      });
    });
  }, [location]);
  

  const toggleSection = (sectionName, arrowMargin = 50) => {
    setOpenSection(openSection === sectionName ? "" : sectionName);
    setArrowMarginLeft(openSection === sectionName ? 50 : arrowMargin);
  };

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 1300) {
      setActiveMenu(false);
    }
  };

  const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 drop-shadow-xl";
  const normalLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-gray-300 m-2";
  const subNavTitle = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 m-2 hover:bg-gray-300  cursor-pointer";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 ">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/admin/dashboard"
              onClick={handleCloseSideBar}
              className="items-center gap-1 ml-16 mt-8 flex text-xl font-extrabold tracking-tight text-slate-900"
            >
              <span>Logo</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover-bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <div key={link.name}>
                    {link.subMenu ? (
                      <div
                        className={subNavTitle}
                        onClick={() => {
                          toggleSection(link.name);
                        }}
                      >
                        <div style={{ fontSize: "1.2rem" }}>{link.icon}</div>
                        <div>
                          <NavLink to={link.url} className="capitalize">{link.name}</NavLink>
                        </div>
                        <div>
                          {openSection === link.name ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                        </div>
                      </div>
                    ) : (
                      <NavLink
                        to={link.url}
                        key={link.name}                      
                        onClick={() => {
                          handleCloseSideBar();
                          setOpenSection("");
                          setActiveNavLink(link.url);
                          setActiveParentMenu(link.url); // Set active parent menu when link is clicked
                        }}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) => (isActive || activeParentMenu === link.url ? activeLink : normalLink)} // Update active state based on activeParentMenu
                      >
                        <span style={{ fontSize: "1.2rem" }}>{link.icon}</span>
                        <span className="capitalize ">{link.name}</span>
                      </NavLink>
                    )}
                    {openSection === link.name && link.subMenu && (
                      <div style={{ marginLeft: "30px" }}>
                        {link.subMenu.map((submenuItem) => (
                          <NavLink
                            key={submenuItem.subname}
                            to={submenuItem.url}
                            style={({ isActive }) => ({
                              backgroundColor: isActive ? "#E5E8E8" : "",
                              color: isActive ? "currentColor" : "black",
                            })}
                            className={({ isActive }) => (isActive ? activeLink : normalLink)}
                            onClick={() => setActiveSubMenu(submenuItem.url)}
                          >
                            <span
                              style={{
                                background: activeSubMenu === submenuItem.url ? currentColor : "black",
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                marginRight: "5px",
                              }}
                              className="rounded-full left-2 top-2"
                            />
                            <span className="capitalize">{submenuItem.subname}</span>
                          </NavLink>
                        ))}
                      </div>                    
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
