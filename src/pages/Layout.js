import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { HeaderTabs } from "../components/HeaderTabs";
import { EquipmentTable } from "../components/EquipmentTable";
import { SurveyTable } from "../components/SurveyTable";
import { Expenditure } from "../components/Expenditure";
import { ResearchNotes } from "../components/ResearchNotes";
import { Actions } from "../components/Actions";
import { Documents } from "../components/Documents";

const Layout = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "CPP Project",
      details: {
        equipment: [
          { id: 1, name: "Incubator", description: "Used for Shaking", quantity: 3 },
          { id: 2, name: "PC", description: "Maintaining Data", quantity: 2 },
        ],
        survey: [
          { id: 1, question: "Project Status", response: "On track", date: "2023-05-01" }
        ],
        expenditure: [
          { id: 1, item: "Lab equipment", amount: 1500, date: "2023-04-15", category: "Equipment" }
        ],
        researchNotes: [
          { id: 1, title: "Initial Findings", content: "Preliminary results look promising", date: "2023-05-10" }
        ],
        actions: [
          { id: 1, task: "Order supplies", assignedTo: "Team A", dueDate: "2023-05-20", status: "Pending" }
        ],
        documents: [
          { id: 1, name: "Project Proposal", type: "PDF", uploadDate: "2023-01-15" }
        ]
      },
    },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const [selectedTab, setSelectedTab] = useState("equipment");

  const handleSelectProject = (id) => setSelectedProjectId(id);

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      name: `New Project ${projects.length + 1}`,
      details: { 
        equipment: [], 
        survey: [], 
        expenditure: [], 
        researchNotes: [],
        actions: [],
        documents: []
      },
    };
    setProjects([...projects, newProject]);
    setSelectedProjectId(newProject.id);
  };

  const handleStartRenamingProject = (id, name) => {
    setEditingProjectId(id);
    setEditedProjectName(name);
  };

  const handleRenameInputChange = (e) => setEditedProjectName(e.target.value);

  const handleRenameProject = (id) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, name: editedProjectName } : p
    );
    setProjects(updated);
    setEditingProjectId(null);
    setEditedProjectName("");
  };

  const openConfirmModal = (id) => {
    setProjectIdToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeleteProject = () => {
    const updated = projects.filter((p) => p.id !== projectIdToDelete);
    setProjects(updated);
    if (selectedProjectId === projectIdToDelete && updated.length > 0) {
      setSelectedProjectId(updated[0].id);
    } else if (updated.length === 0) {
      setSelectedProjectId(null);
    }
    setShowConfirmModal(false);
    setProjectIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setProjectIdToDelete(null);
  };

  const handleEquipmentChange = (updatedEquipment) => {
    setMyString(updatedEquipment);
    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              details: {
                ...project.details,
                equipment: updatedEquipment,
              },
            }
          : project
      )
    );
  };

  const handleSurveyChange = (updatedSurvey) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              details: {
                ...project.details,
                survey: updatedSurvey,
              },
            }
          : project
      )
    );
  };

  const handleExpenditureChange = (updatedExpenditure) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              details: {
                ...project.details,
                expenditure: updatedExpenditure,
              },
            }
          : project
      )
    );
  };

  const handleResearchNotesChange = (updatedNotes) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              details: {
                ...project.details,
                researchNotes: updatedNotes,
              },
            }
          : project
      )
    );
  };

  const handleActionsChange = (updatedActions) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              details: {
                ...project.details,
                actions: updatedActions,
              },
            }
          : project
      )
    );
  };

  const handleDocumentsChange = (updatedDocuments) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              details: {
                ...project.details,
                documents: updatedDocuments,
              },
            }
          : project
      )
    );
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="flex h-screen bg-gray-400 relative">
      <Sidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={handleSelectProject}
        onAddProject={handleAddProject}
        onStartRename={handleStartRenamingProject}
        onRenameInputChange={handleRenameInputChange}
        onRenameSubmit={handleRenameProject}
        onRequestDelete={openConfirmModal}
        editingProjectId={editingProjectId}
        editedProjectName={editedProjectName}
      />

      <div className="flex-1 ml-8 p-3 overflow-y-auto">
        {selectedProject ? (
          <>
            <HeaderTabs 
              selectedTab={selectedTab}
              onTabChange={handleTabChange}
            />
            
            {selectedTab === "equipment" && (
              <EquipmentTable
                data={selectedProject.details.equipment}
                onChange={handleEquipmentChange}
              />
            )}
            
            {selectedTab === "survey" && (
              <SurveyTable
                data={selectedProject.details.survey}
                onChange={handleSurveyChange}
              />
            )}
            
            {selectedTab === "expenditure" && (
              <Expenditure
                data={selectedProject.details.expenditure}
                onChange={handleExpenditureChange}
              />
            )}
            
            {selectedTab === "researchNotes" && (
              <ResearchNotes
                data={selectedProject.details.researchNotes}
                onChange={handleResearchNotesChange}
              />
            )}
            
            {selectedTab === "actions" && (
              <Actions
                data={selectedProject.details.actions}
                onChange={handleActionsChange}
              />
            )}
            
            {selectedTab === "documents" && (
              <Documents
                data={selectedProject.details.documents}
                onChange={handleDocumentsChange}
              />
            )}
          </>
        ) : (
          <div className="text-gray-500 text-center mt-20 text-xl">
            No project selected. Please add or select a project.
          </div>
        )}
      </div>

      {showConfirmModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Delete Project?</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to delete this project?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={handleDeleteProject}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;