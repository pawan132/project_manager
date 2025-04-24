import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { HeaderTabs } from "../components/HeaderTabs";
import { EquipmentTable } from "../components/EquipmentTable";

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
        survey: [],
        expenditure: [],
        researchNotes: [],
      },
    },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  const handleSelectProject = (id) => setSelectedProjectId(id);

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      name: `New Project ${projects.length + 1}`,
      details: { equipment: [], survey: [], expenditure: [], researchNotes: [] },
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

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="flex h-screen relative">
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

      <div className="flex-1 p-6 overflow-y-auto">
        {selectedProject ? (
          <>
            <HeaderTabs selectedProject={selectedProject} onChange={handleEquipmentChange} />
            <EquipmentTable
              data={selectedProject.details.equipment}
              onChange={handleEquipmentChange}
            />
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