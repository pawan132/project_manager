import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import Header from "../components/Header";
import AddBanner from "../common/AddBanner";



const Layout = () => {
  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const [selectedTab, setSelectedTab] = useState("equipment");
  const [searchName,setSearchName] = useState("");
    const [searchProject,setSearchProject] = useState("");


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

 const handleAdd =() =>{
      console.log('Add button clicked');
   }
  return (
   <>
   <Header/>
   <div className="w-full min-h-screen bg-gray-200 p-4">
      <AddBanner title={"IARI Projects"} clickHandler={handleAdd} />

      <div className="grid grid-cols-3 gap-5 mt-5">
        <input
          name="searchByName"
          type="text"
          placeholder="Search by name..."
          onChange={(e) => setSearchName(e.target.value)}
          value={searchName}
       
          className="px-4 py-2 mb-4 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
         <input
          name="searchByProject"
          type="text"
          placeholder="Search by project..."
          onChange={(e) => setSearchProject(e.target.value)}
          value={searchProject}
       
          className="px-4 py-2 mb-4 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        </div>
        </div>
   </>
)
};

export default Layout;