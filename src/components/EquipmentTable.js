import React, { useState } from "react";
import { FaPlus, FaTrash, FaPen, FaCheck } from "react-icons/fa";

export const EquipmentTable = ({ data, onChange }) => {
  const [editId, setEditId] = useState(null);
  const [newEquipment, setNewEquipment] = useState({ name: "", description: "", quantity: "" });
  const [editEquipment, setEditEquipment] = useState({});

  console.log(data);
  const handleAdd = () => {
    if (!newEquipment.name.trim()) return;
    const newItem = {
      id: Date.now(),
      ...newEquipment,
      quantity: parseInt(newEquipment.quantity) || 0,
    };
    onChange([...data, newItem]);
    setNewEquipment({ name: "", description: "", quantity: "" });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditEquipment(item);
  };

  const handleSave = () => {
  console.log(data);
    const updated = data.map((item) => (item.id === editId ? editEquipment : item));
    onChange(updated);
    setEditId(null);
    setEditEquipment({});
  };

  const handleDelete = (id) => {
    onChange(data.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Equipment</h3>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(data) &&
          data.map((item)  =>
            editId === item.id ? (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  <input
                    value={editEquipment.name}
                    onChange={(e) => setEditEquipment({ ...editEquipment, name: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    value={editEquipment.description}
                    onChange={(e) =>
                      setEditEquipment({ ...editEquipment, description: e.target.value })
                    }
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={editEquipment.quantity}
                    onChange={(e) =>
                      setEditEquipment({ ...editEquipment, quantity: parseInt(e.target.value) })
                    }
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <FaCheck
                    onClick={handleSave}
                    className="cursor-pointer text-green-600 hover:text-green-800"
                  />
                </td>
              </tr>
            ) : (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <FaPen
                    onClick={() => handleEdit(item)}
                    className="inline text-blue-500 hover:text-blue-700 cursor-pointer"
                  />
                  <FaTrash
                    onClick={() => handleDelete(item.id)}
                    className="inline text-red-500 hover:text-red-700 cursor-pointer"
                  />
                </td>
              </tr>
            )
          )}
          {/* Add New Row */}
          <tr>
            <td className="border px-4 py-2">
              <input
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                className="w-full p-1 border rounded"
                placeholder="Name"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                value={newEquipment.description}
                onChange={(e) =>
                  setNewEquipment({ ...newEquipment, description: e.target.value })
                }
                className="w-full p-1 border rounded"
                placeholder="Description"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="number"
                value={newEquipment.quantity}
                onChange={(e) => setNewEquipment({ ...newEquipment, quantity: e.target.value })}
                className="w-full p-1 border rounded"
                placeholder="Qty"
              />
            </td>
            <td className="border px-4 py-2 text-center">
              <FaPlus
                onClick={handleAdd}
                className="text-green-600 hover:text-green-800 cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
