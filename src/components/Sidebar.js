import React from "react";
import { FaTrash, FaPen, FaPlus, FaCheck } from "react-icons/fa";

export const Sidebar = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onAddProject,
  onStartRename,
  onRenameInputChange,
  onRenameSubmit,
  onRequestDelete,
  editingProjectId,
  editedProjectName,
}) => {
  return (
    <div className="bg-slate-500 text-white border-r p-6 w-64">
      <h2 className="text-xl font-semibold mb-4">Project Data Management</h2>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={`mb-2 flex items-center justify-between group p-2 rounded ${
              selectedProjectId === project.id ? "bg-blue-100 text-black" : "hover:bg-blue-50"
            }`}
          >
            {editingProjectId === project.id ? (
              <input
                value={editedProjectName}
                onChange={onRenameInputChange}
                onBlur={() => onRenameSubmit(project.id)}
                onKeyDown={(e) => e.key === "Enter" && onRenameSubmit(project.id)}
                autoFocus
                className="border px-2 py-1 w-full mr-2 rounded text-sm text-black"
              />
            ) : (
              <span
                className="cursor-pointer flex-1"
                onClick={() => onSelectProject(project.id)}
              >
                {project.name}
              </span>
            )}
            <div className="flex gap-2 ml-2">
              {editingProjectId === project.id ? (
                <FaCheck
                  className="text-green-500 hover:text-green-700 cursor-pointer"
                  onClick={() => onRenameSubmit(project.id)}
                />
              ) : (
                <FaPen
                  className="text-gray-300 hover:text-blue-300 cursor-pointer"
                  onClick={() => onStartRename(project.id, project.name)}
                />
              )}
              <FaTrash
                className="text-red-300 hover:text-red-500 cursor-pointer"
                onClick={() => onRequestDelete(project.id)}
              />
            </div>
          </li>
        ))}
        <button
          className="mt-4 text-white hover:underline cursor-pointer flex items-center gap-2"
          onClick={onAddProject}
        >
          <FaPlus /> Add Project
        </button>
      </ul>
    </div>
  );
};
