import { useState, useRef } from "react";
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from 'react-icons/hi'
import useOnClickOutside from "../hooks/useOnClickOutside";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Left: Logo */}
      <div className="text-2xl font-bold tracking-wide">IARI</div>

      {/* Middle: Search */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-[24rem]">
          <HiOutlineSearch
            size={20}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-black"
          />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none h-10 w-full border border-black rounded-md pl-11 pr-4"
          />
        </div>
      </div>

      {/* Right: Links */}
      <nav className="flex items-center gap-6">
        <a href="/about" className="hover:underline">
          About Us
        </a>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hover:underline focus:outline-none"
          >
            Profile ▾
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg border border-gray-200">
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                My Profile
              </a>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
