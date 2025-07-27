import { useState } from 'react';
import API from '../api/axios';

function ProjectModal({ onClose, onAdd }) {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = async () => {
    await API.post('/projects', { name: projectName });
    setProjectName('');
    onAdd();
    onClose();
  };

  return (
    <div style={{ backgroundColor: '#eee', padding: '20px' }}>
      <h3>Add Project</h3>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default ProjectModal;
