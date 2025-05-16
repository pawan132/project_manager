import React from "react";
import { FaExchangeAlt, FaClipboard, FaDollarSign, FaFileAlt, FaTasks, FaFile } from "react-icons/fa";

export const HeaderTabs = ({ selectedTab, onTabChange }) => {
  return (
    <>
    <div className="flex gap-4 mb-6">
      <Tab
        icon={<FaExchangeAlt />}
        label="Equipment"
        active={selectedTab === "equipment"}
        onClick={() => onTabChange("equipment")}
      />
      <Tab
        icon={<FaClipboard />}
        label="Survey"
        active={selectedTab === "survey"}
        onClick={() => onTabChange("survey")}
      />
      <Tab
        icon={<FaDollarSign />}
        label="Expenditure"
        active={selectedTab === "expenditure"}
        onClick={() => onTabChange("expenditure")}
      />
      <Tab
        icon={<FaFileAlt />}
        label="Research Notes"
        active={selectedTab === "researchNotes"}
        onClick={() => onTabChange("researchNotes")}
      />
      <Tab
        icon={<FaTasks />}
        label="Actions"
        active={selectedTab === "actions"}
        onClick={() => onTabChange("actions")}
      />
      <Tab
        icon={<FaFile />}
        label="Documents"
        active={selectedTab === "documents"}
        onClick={() => onTabChange("documents")}
      />
    </div>
    
    </>
  );
};

export const Tab = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
      active ? "bg-blue-100 text-blue-700" : "bg-white hover:bg-gray-100 text-gray-700"
    }`}
  >
    {icon}
    {label}
  </button>
);