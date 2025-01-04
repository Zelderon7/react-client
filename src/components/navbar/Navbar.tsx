import React from "react";
import UserIcon from "./UserIcon";
import ThemeSwitch from "../general/ThemeSwitch";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  title?: string; // Optional title prop
}

export default function Navbar({ title }: NavbarProps) {
  const navigate = useNavigate();

  function handleNavigate(url: string) {
    navigate(url);
  }

  return (
    <div className="bg-navbar_bg w-full h-14 flex justify-between items-center px-8 py-2 text-white shadow-shadow_primary shadow-md">
      {/* Left-aligned div */}
      <div>
        <p className="font-bold text-2xl text-logo_color select-none">
          {title ? title : "Learning Platform"}
        </p>
      </div>

      {/* Center-aligned div */}
      <div className="flex h-full items-center space-x-4">
        <a
          className="text-textPrimary cursor-pointer select-none"
          onClick={() => handleNavigate("/")}
        >
          Home
        </a>
        <p className="text-textPrimary select-none">Courses</p>
        <p className="text-textPrimary select-none">Challenges</p>
        <UserIcon />
        <ThemeSwitch />
      </div>
    </div>
  );
}
