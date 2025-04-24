import React from "react";
import { FaExchangeAlt, FaClipboard, FaDollarSign, FaFileAlt } from "react-icons/fa";

export const HeaderTabs = ({ selectedProject, onChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <Tab
        icon={<FaExchangeAlt />}
        label="Equipment"
        active={selectedProject.selectedTab === "equipment"}
        onClick={() => onChange("equipment")}
      />
      <Tab
        icon={<FaClipboard />}
        label="Survey"
        active={selectedProject.selectedTab === "survey"}
        onClick={() => onChange("survey")}
      />
      <Tab
        icon={<FaDollarSign />}
        label="Expenditure"
        active={selectedProject.selectedTab === "expenditure"}
        onClick={() => onChange("expenditure")}
      />
      <Tab
        icon={<FaFileAlt />}
        label="Research Notes"
        active={selectedProject.selectedTab === "researchNotes"}
        onClick={() => onChange("researchNotes")}
      />
      <Tab
        label="Actions"
        active={selectedProject.selectedTab === "actions"}
        onClick={() => onChange("actions")}
      />
    </div>
  );
};

const Tab = ({ icon, label, active, onClick }) => (
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
