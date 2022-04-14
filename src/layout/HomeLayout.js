import React from "react";
import { Outlet } from "react-router-dom";
import { CSWNavbar } from "../components/Navbar";

export const HomeLayout = () => {
  const navList = [
    {
      id: "homePage",
      path: "/home",
      name: "Home",
    },
    {
      id: "userList",
      path: "/list",
      name: "User List",
    },
    {
      id: "userDetails",
      path: "/details",
      name: "User Details",
    },
  ];

  return (
    <div className="main-container">
      <CSWNavbar navList={navList} />
      <div className="container">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
