// components/ActionsPanel.js
import React from "react";

const ActionsPanel = ({ selectedProject }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Actions for {selectedProject.name}</h2>
      {/* List or CRUD for actions like tasks, pending items, etc. */}
      <p>Action items will go here...</p>
    </div>
  );
};

export default ActionsPanel;
