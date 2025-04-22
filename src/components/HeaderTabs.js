import React from "react";
import { FaExchangeAlt, FaClipboard, FaDollarSign, FaFileAlt } from "react-icons/fa";

export const HeaderTabs = () => {
  return (
    <div className="flex gap-4 mb-6">
      <Tab icon={<FaExchangeAlt />} label="Equipment" active />
      <Tab icon={<FaClipboard />} label="Survey" />
      <Tab icon={<FaDollarSign />} label="Expenditure" />
      <Tab icon={<FaFileAlt />} label="Research Notes" />
      <Tab label="Actions" />
    </div>
  );
};

const Tab = ({ icon, label, active }) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
      active ? "bg-blue-100 text-blue-700" : "bg-white hover:bg-gray-100 text-gray-700"
    }`}
  >
    {icon}
    {label}
  </button>
);
