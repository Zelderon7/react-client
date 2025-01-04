import React from "react";
import UserIcon from "./UserIcon";
import ThemeSwitch from "../general/ThemeSwitch";

export default function Navbar() {
  return (
    <div className="bg-navbar_bg w-full h-14 flex justify-between items-center px-8 py-2 text-white shadow-shadow_primary shadow-md">
      {/* Left-aligned div */}
      <div>
        <p className="font-bold text-2xl text-logo_color">Learning Platform</p>
      </div>

      {/* Center-aligned div */}
      <div className="flex h-full items-center space-x-4">
        <p className="text-textPrimary">Dashboard</p>
        <p className="text-textPrimary">Courses</p>
        <p className="text-textPrimary">Challenges</p>
        <UserIcon />
        <ThemeSwitch />
      </div>
    </div>
  );
}
