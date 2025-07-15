import React, { useEffect,useState,useRef } from "react";
import { Sidebar } from "../components/Sidebar";
import Header from "../components/Header";
import AddBanner from "../common/AddBanner";
import useOnClickOutside from "../hooks/useOnClickOutside";
import API from '../api/axios';

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

  

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/projects/get-project');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, []);


const handleSaveProject = async () => {
  if (!projectName.trim()) {
    alert("Project name is required.");
    return;
  }

  try {
    const res = await API.post('/projects', { name: projectName });

    console.log("Project created:", res.data);
    // Optionally: setProjects(prev => [...prev, res.data.project]);

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Something went wrong");
  }

  setProjectName("");
  setShowModal(false);
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

         <div className="p-6">
      
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border">Name (Username)</th>
              <th className="px-4 py-2 border">Project Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No projects found
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{project.username}</td>
                  <td className="px-4 py-2 border">{project.projectName}</td>
                  <td className="px-4 py-2 border">{project.email}</td>
                  <td className="px-4 py-2 border">{new Date(project.date).toLocaleString()}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Details
                    </button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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