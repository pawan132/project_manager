import React, { useState } from "react";
import { FaPlus, FaTrash, FaPen, FaCheck } from "react-icons/fa";

export const Actions = ({ data, onChange }) => {
  const [editId, setEditId] = useState(null);
  const [newAction, setNewAction] = useState({ 
    task: "", 
    assignedTo: "", 
    dueDate: "",
    status: "Pending"
  });
  const [editAction, setEditAction] = useState({});

  const handleAdd = () => {
    if (!newAction.task.trim()) return;
    const newItem = {
      id: Date.now(),
      ...newAction,
      dueDate: newAction.dueDate || new Date().toISOString().split('T')[0]
    };
    onChange([...data, newItem]);
    setNewAction({ task: "", assignedTo: "", dueDate: "", status: "Pending" });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditAction(item);
  };

  const handleSave = () => {
    const updated = data.map((item) => (item.id === editId ? editAction : item));
    onChange(updated);
    setEditId(null);
    setEditAction({});
  };

  const handleDelete = (id) => {
    onChange(data.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Actions</h3>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Task</th>
            <th className="border px-4 py-2">Assigned To</th>
            <th className="border px-4 py-2">Due Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>
            editId === item.id ? (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  <input
                    value={editAction.task}
                    onChange={(e) => setEditAction({ ...editAction, task: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    value={editAction.assignedTo}
                    onChange={(e) => setEditAction({ ...editAction, assignedTo: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    value={editAction.dueDate}
                    onChange={(e) => setEditAction({ ...editAction, dueDate: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <select
                    value={editAction.status}
                    onChange={(e) => setEditAction({ ...editAction, status: e.target.value })}
                    className="w-full p-1 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
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
                <td className="border px-4 py-2">{item.task}</td>
                <td className="border px-4 py-2">{item.assignedTo}</td>
                <td className="border px-4 py-2">{item.dueDate}</td>
                <td className="border px-4 py-2">{item.status}</td>
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
                value={newAction.task}
                onChange={(e) => setNewAction({ ...newAction, task: e.target.value })}
                className="w-full p-1 border rounded"
                placeholder="Task"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                value={newAction.assignedTo}
                onChange={(e) => setNewAction({ ...newAction, assignedTo: e.target.value })}
                className="w-full p-1 border rounded"
                placeholder="Assigned To"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="date"
                value={newAction.dueDate}
                onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                className="w-full p-1 border rounded"
              />
            </td>
            <td className="border px-4 py-2">
              <select
                value={newAction.status}
                onChange={(e) => setNewAction({ ...newAction, status: e.target.value })}
                className="w-full p-1 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
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