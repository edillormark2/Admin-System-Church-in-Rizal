import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Dashboard",
        url: "/admin/dashboard",
        icon: <AiOutlineHome />
      }
    ]
  },
  {
    title: "Pages",
    links: [
      {
        name: "Registration",
        icon: <FaRegAddressCard />,
        subMenu: [
          {
            subname: "Bible Reading",
            url: "/admin/reg/bible-reading"
          },
          {
            subname: "SSOT",
            url: "/registration/ssot"
          }
        ]
      },
      {
        name: "User Logs",
        url: "/admin/userlogs",
        icon: <MdOutlineFormatListBulleted />
      },
      {
        name: "Manage User",
        url: "/admin/manage-user",
        icon: <RiContactsLine />
      }
    ]
  }
];
