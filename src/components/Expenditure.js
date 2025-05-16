import React, { useState } from "react";
import { FaPlus, FaTrash, FaPen, FaCheck } from "react-icons/fa";

export const Expenditure = ({ data, onChange }) => {
  const [editId, setEditId] = useState(null);
  const [newExpense, setNewExpense] = useState({ 
    item: "", 
    amount: "", 
    date: "",
    category: ""
  });
  const [editExpense, setEditExpense] = useState({});

  const handleAdd = () => {
    if (!newExpense.item.trim()) return;
    const newItem = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount) || 0,
      date: newExpense.date || new Date().toISOString().split('T')[0]
    };
    onChange([...data, newItem]);
    setNewExpense({ item: "", amount: "", date: "", category: "" });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditExpense(item);
  };

  const handleSave = () => {
    const updated = data.map((item) => (item.id === editId ? editExpense : item));
    onChange(updated);
    setEditId(null);
    setEditExpense({});
  };

  const handleDelete = (id) => {
    onChange(data.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Expenditure</h3>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2">Amount ($)</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>
            editId === item.id ? (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  <input
                    value={editExpense.item}
                    onChange={(e) => setEditExpense({ ...editExpense, item: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={editExpense.amount}
                    onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    value={editExpense.date}
                    onChange={(e) => setEditExpense({ ...editExpense, date: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <select
                    value={editExpense.category}
                    onChange={(e) => setEditExpense({ ...editExpense, category: e.target.value })}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Materials">Materials</option>
                    <option value="Travel">Travel</option>
                    <option value="Personnel">Personnel</option>
                    <option value="Other">Other</option>
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
                <td className="border px-4 py-2">{item.item}</td>
                <td className="border px-4 py-2">${item.amount.toFixed(2)}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.category}</td>
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
                value={newExpense.item}
                onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
                className="w-full p-1 border rounded"
                placeholder="Item"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="w-full p-1 border rounded"
                placeholder="Amount"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                className="w-full p-1 border rounded"
              />
            </td>
            <td className="border px-4 py-2">
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="w-full p-1 border rounded"
              >
                <option value="">Select</option>
                <option value="Equipment">Equipment</option>
                <option value="Materials">Materials</option>
                <option value="Travel">Travel</option>
                <option value="Personnel">Personnel</option>
                <option value="Other">Other</option>
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