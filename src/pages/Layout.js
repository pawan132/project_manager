import React, { useState,useRef } from "react";
import { Sidebar } from "../components/Sidebar";
import Header from "../components/Header";
import AddBanner from "../common/AddBanner";
import useOnClickOutside from "../hooks/useOnClickOutside";


const Layout = () => {
 

 
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const [selectedTab, setSelectedTab] = useState("equipment");
  const [searchName,setSearchName] = useState("");
    const [searchProject,setSearchProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleAdd = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveProject = () => {
    if (projectName.trim()) {
      setProjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: projectName,
          details: {
            equipment: [],
            survey: [],
            expenditure: [],
            researchNotes: [],
            actions: [],
            documents: [],
          },
        },
      ]);
      setProjectName("");
      setShowModal(false);
    }
  };

  const modalRef = useRef(null);
  useOnClickOutside(modalRef, handleCloseModal); // close if clicking outside
  
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
           {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded-md w-96 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Add Project</h2>

              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
   </>
)
};

export default Layout;