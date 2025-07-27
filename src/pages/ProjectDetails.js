import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import EquipmentsTab from "../components/ProjectDetails/EquipmentTab";
import SurveyTab from "../components/ProjectDetails/SurveyTab";
import ExpenditureTab from "../components/ProjectDetails/ExpenditureTab";
import ResearchNotesTab from "../components/ProjectDetails/ResearchNotesTab";
import ActionsTab from "../components/ProjectDetails/ActionsTab";
import DocumentsTab from "../components/ProjectDetails/DocumentsTab";

const tabs = [
  "Equipments",
  "Survey",
  "Expenditure",
  "Research Notes",
  "Actions",
  "Documents",
];

function ProjectDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Equipments");

  const renderTabComponent = () => {
    switch (activeTab) {
      case "Equipments":
        return <EquipmentsTab projectId={id} />;
      case "Survey":
        return <SurveyTab projectId={id} />;
      case "Expenditure":
        return <ExpenditureTab projectId={id} />;
      case "Research Notes":
        return <ResearchNotesTab projectId={id} />;
      case "Actions":
        return <ActionsTab projectId={id} />;
      case "Documents":
        return <DocumentsTab projectId={id} />;
      default:
        return <EquipmentsTab projectId={id} />;
    }
  };

  return (
    <>
    <Header/>
    <div>
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 border-b pb-2">📌 Project Details</h2>
      <div className="flex space-x-4 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{renderTabComponent()}</div>
    </div>
    </>
  );
}

export default ProjectDetails;
