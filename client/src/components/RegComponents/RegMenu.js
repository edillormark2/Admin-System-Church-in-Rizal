import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";
import { RiContactsLine } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";

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
      }
    ]
  }
];
