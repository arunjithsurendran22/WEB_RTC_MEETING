'use client'
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import icon for profile picture placeholder
import { useUser } from "@/context/UserContext"; // Import the custom hook to access user data
import { useRouter } from "next/navigation"; // Import Next.js router for navigation

const Header = () => {
  const { user, setUser } = useUser(); // Consume the user context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for controlling dropdown visibility
  const router = useRouter();

  // Function to handle logout
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("google_token");
    // Reset the user context
    setUser(null);
    // Redirect to the home page
    router.push("/");
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Online Meeting</h1>
      </div>

      {/* Profile Picture Section */}
      <div className="relative flex items-center gap-4">
        {/* Profile icon */}
        {user && user.picture ? (
          <img
            src={user.picture}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown on click
          />
        ) : (
          <FaUserCircle
            size={40}
            className="cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown on click
          />
        )}

        {/* Display the user name or default name */}
        <span className="font-semibold text-xl">{user ? user.name : "John Doe"}</span>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 mr-20 top-10 bg-black border border-gray-500 shadow-black text-white items-center rounded-lg shadow-lg p-2">
            <button
              className="w-full text-left py-2 px-4 rounded items-center mx-auto text-lg font-bold "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
