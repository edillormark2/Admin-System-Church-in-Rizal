import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useStateContext } from "../../redux/ContextProvider";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

const NavButton = ({ customFunc, icon, color, dotColor }) =>
  <Tooltip arrow title="Menu" placement="bottom" TransitionComponent={Fade}>
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 bg-gray-100 hover:bg-gray-200"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </Tooltip>;

const Navbar = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { currentColor, activeMenu, setActiveMenu } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(
    () => {
      setActiveMenu(screenSize > 1250);
    },
    [screenSize, setActiveMenu]
  );

  const handleActiveMenu = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <div className="flex justify-between p-2 relative bg-white   drop-shadow-xl rounded-lg px-1 md:px-8">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="flex drop-shadow-sm">
        <Tooltip
          arrow
          title="Account"
          placement="bottom"
          TransitionComponent={Fade}
        >
          <div className="flex items-center gap-2 cursor-pointer p-2 rounded-xl hover:bg-gray-200">
            <p>
              <span className="text-gray-500 text-14">Hi,</span>{" "}
              <span className="text-gray-500 font-bold ml-1 text-14">
                Admin
              </span>
            </p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
