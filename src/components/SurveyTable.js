import React, { useState } from "react";
import { FaPlus, FaTrash, FaPen, FaCheck } from "react-icons/fa";

export const SurveyTable = ({ data, onChange }) => {
  const [editId, setEditId] = useState(null);
  const [newSurvey, setNewSurvey] = useState({ 
    question: "", 
    response: "", 
    date: "" 
  });
  const [editSurvey, setEditSurvey] = useState({});

  const handleAdd = () => {
    if (!newSurvey.question.trim()) return;
    const newItem = {
      id: Date.now(),
      ...newSurvey,
      date: newSurvey.date || new Date().toISOString().split('T')[0]
    };
    onChange([...data, newItem]);
    setNewSurvey({ question: "", response: "", date: "" });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditSurvey(item);
  };

  const handleSave = () => {
    const updated = data.map((item) => (item.id === editId ? editSurvey : item));
    onChange(updated);
    setEditId(null);
    setEditSurvey({});
  };

  const handleDelete = (id) => {
    onChange(data.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Survey Data</h3>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Question</th>
            <th className="border px-4 py-2">Response</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>
            editId === item.id ? (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  <input
                    value={editSurvey.question}
                    onChange={(e) => setEditSurvey({ ...editSurvey, question: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    value={editSurvey.response}
                    onChange={(e) => setEditSurvey({ ...editSurvey, response: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    value={editSurvey.date}
                    onChange={(e) => setEditSurvey({ ...editSurvey, date: e.target.value })}
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
                <td className="border px-4 py-2">{item.question}</td>
                <td className="border px-4 py-2">{item.response}</td>
                <td className="border px-4 py-2">{item.date}</td>
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
                value={newSurvey.question}
                onChange={(e) => setNewSurvey({ ...newSurvey, question: e.target.value })}
                className="w-full p-1 border rounded"
                placeholder="Question"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                value={newSurvey.response}
                onChange={(e) => setNewSurvey({ ...newSurvey, response: e.target.value })}
                className="w-full p-1 border rounded"
                placeholder="Response"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="date"
                value={newSurvey.date}
                onChange={(e) => setNewSurvey({ ...newSurvey, date: e.target.value })}
                className="w-full p-1 border rounded"
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