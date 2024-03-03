import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";
import { TbMapPinCheck } from "react-icons/tb";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Dashboard",
        url: "/registration/dashboard",
        icon: <AiOutlineHome />
      }
    ]
  },
  {
    title: "Pages",
    links: [
      {
        name: "Announcement",
        url: "/registration/announcement",
        icon: <GrAnnounce />
      },
      {
        name: "Registration",
        url: "/registration/manage-registration",
        icon: <LuClipboardList />
      },
      {
        name: "Check in / out",
        url: "/registration/check-in-out",
        icon: <TbMapPinCheck size={20} />
      }
    ]
  }
];
