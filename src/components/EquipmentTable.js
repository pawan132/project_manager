import React from 'react';
import { FaPen } from 'react-icons/fa';

const equipmentList = [
  { name: 'Microscope', description: 'Optical instrument', quantity: 5 },
  { name: 'GPS Device', description: 'Navigation device', quantity: 8 },
  { name: 'Tractor', description: 'Agricultural vehicle', quantity: 2 },
];

const EquipmentTable = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Equipment</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.description}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2 text-blue-600 cursor-pointer">
                <FaPen />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
