import React, { useState } from "react";
import { FaPlus, FaTrash, FaPen, FaCheck } from "react-icons/fa";

export const ResearchNotes = ({ data, onChange }) => {
  const [editId, setEditId] = useState(null);
  const [newNote, setNewNote] = useState({ 
    title: "", 
    content: "", 
    date: "" 
  });
  const [editNote, setEditNote] = useState({});

  const handleAdd = () => {
    if (!newNote.title.trim()) return;
    const newItem = {
      id: Date.now(),
      ...newNote,
      date: newNote.date || new Date().toISOString().split('T')[0]
    };
    onChange([...data, newItem]);
    setNewNote({ title: "", content: "", date: "" });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditNote(item);
  };

  const handleSave = () => {
    const updated = data.map((item) => (item.id === editId ? editNote : item));
    onChange(updated);
    setEditId(null);
    setEditNote({});
  };

  const handleDelete = (id) => {
    onChange(data.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Research Notes</h3>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Content</th>
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
                    value={editNote.title}
                    onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <textarea
                    value={editNote.content}
                    onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                    className="w-full p-1 border rounded"
                    rows="3"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    value={editNote.date}
                    onChange={(e) => setEditNote({ ...editNote, date: e.target.value })}
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
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2">{item.content}</td>
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
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full p-1 border rounded"
                placeholder="Title"
              />
            </td>
            <td className="border px-4 py-2">
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="w-full p-1 border rounded"
                placeholder="Content"
                rows="3"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="date"
                value={newNote.date}
                onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
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