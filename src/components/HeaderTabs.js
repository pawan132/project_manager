import React from 'react';
import { FaTools, FaClipboardList, FaDollarSign, FaStickyNote } from 'react-icons/fa';

const HeaderTabs = () => {
  return (
    <div className="flex space-x-6 p-4 border-b">
      <button className="flex items-center space-x-2 text-blue-600 border-b-2 border-blue-600 pb-1">
        <FaTools /> <span>Equipment</span>
      </button>
      <button className="flex items-center space-x-2 text-gray-600">
        <FaClipboardList /> <span>Survey</span>
      </button>
      <button className="flex items-center space-x-2 text-gray-600">
        <FaDollarSign /> <span>Expenditure</span>
      </button>
      <button className="flex items-center space-x-2 text-gray-600">
        <FaStickyNote /> <span>Research Notes</span>
      </button>
    </div>
  );
};

export default HeaderTabs;
