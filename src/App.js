
import React from 'react';
import Sidebar from './components/Sidebar';
import HeaderTabs from './components/EquipmentTable';
import EquipmentTable from './components/HeaderTabs';

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="w-3/4 bg-white rounded-xl shadow-md m-6 overflow-hidden">
        <div className="p-4 text-2xl font-semibold">CPP Project</div>
        <HeaderTabs />
        <EquipmentTable />
      </div>
    </div>
  );
}

export default App;

