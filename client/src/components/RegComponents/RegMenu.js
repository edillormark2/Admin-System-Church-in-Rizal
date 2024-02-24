import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";

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
      }
    ]
  }
];
