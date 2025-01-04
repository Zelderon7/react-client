import React, { useState } from "react";
import { useLogOut } from "../../utils/globalFunctions/authorization";

export default function UserIcon() {
  const logOut = useLogOut();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const icon = localStorage.getItem("userIcon");
  const username = localStorage.getItem("username");

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <>
      {icon || username ? (
        <div className="h-full relative">
          <a
            onClick={toggleDropdown}
            className="flex h-full items-center justify-center"
          >
            {icon ? (
              <img
                src={icon ?? undefined}
                alt={username ?? icon!}
                className="h-full aspect-square rounded-full"
              ></img>
            ) : (
              <h5 className="font-bold cursor-pointer">{username!}</h5>
            )}
          </a>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-navbar_bg border-2 border-border rounded-lg shadow-lg p-2"
              onMouseLeave={toggleDropdown}
            >
              <ul>
                <li className="px-4 py-2 hover:bg-secondary hover:rounded-lg text-textSecondary hover:text-textPrimary cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-secondary hover:rounded-lg text-textSecondary hover:text-textPrimary cursor-pointer">
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-secondary hover:rounded-lg cursor-pointer"
                  onClick={logOut}
                >
                  <a className="text-textDanger">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <a href="/login">Login</a>
      )}
    </>
  );
}
