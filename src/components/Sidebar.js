import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-white shadow h-full p-4">
      <ul className="space-y-4 text-lg font-medium text-gray-700">
        <li className="text-blue-600 font-bold">CPP Project</li>
        <li>Wheat Project</li>
        <li>Soil Project</li>
      </ul>
    </div>
  );
};

export default Sidebar;
