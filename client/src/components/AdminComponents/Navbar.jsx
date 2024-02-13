import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { useSelector } from "react-redux";
import { useStateContext } from "../../redux/ContextProvider";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import PopupBody from "./PopupBody"; // Import your PopupBody component here

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
  const [menuClicked, setMenuClicked] = useState("");
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { currentUser } = useSelector(state => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = React.useState("bottom-end");

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { currentColor, activeMenu, setActiveMenu } = useStateContext();

  useEffect(
    () => {
      setActiveMenu(screenSize > 1250);
    },
    [screenSize, setActiveMenu]
  );

  const handleActiveMenu = () => {
    setActiveMenu(!activeMenu);
  };

  const handleClick = event => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const [anchor, setAnchor] = React.useState(null);

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  return (
    <div className="flex justify-between p-2 relative bg-white   drop-shadow-xl rounded-lg px-1 md:px-8">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color="black" // You can set your color here
        icon={<AiOutlineMenu />}
      />

      <div className="flex drop-shadow-sm">
        <div
          onClick={handleClick}
          className="flex items-center gap-2 cursor-pointer p-2 rounded-xl hover:bg-gray-200"
        >
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="h-8 w-8 rounded-full object-cover"
          />
          <p className="hidden md:block">
            {currentUser.name}
          </p>
        </div>
      </div>

      <BasePopup
        id={id}
        open={Boolean(anchor)}
        anchor={anchor}
        placement={placement}
        offset={4}
      >
        <PopupBody closePopup={handleClose} />
      </BasePopup>
    </div>
  );
};

export default Navbar;
