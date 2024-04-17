import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";
import { TbMapPinCheck } from "react-icons/tb";
import { MdToday } from "react-icons/md";
import { MdOutlineViewKanban } from "react-icons/md";

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
      },
      {
        name: "Manage Training",
        url: "/registration/manage-training",
        icon: <MdOutlineViewKanban size={20} />
      },
      {
        name: "Manage Events",
        url: "/registration/manage-events",
        icon: <MdToday size={20} />
      }
    ]
  }
];
