import React, { useState, useRef } from "react";
import { FaPlus, FaTrash, FaPen, FaCheck, FaUpload, FaDownload, FaEye, FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFileAlt } from "react-icons/fa";

export const Documents = ({ data, onChange }) => {
  const [editId, setEditId] = useState(null);
  const [newDocument, setNewDocument] = useState({ 
    name: "", 
    type: "", 
    uploadDate: "",
    file: null,
    description: "",
    category: "General"
  });
  const [editDocument, setEditDocument] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [previewType, setPreviewType] = useState("");
  const fileInputRef = useRef(null);

  const handleAdd = () => {
    if (!newDocument.name.trim() || !newDocument.file) return;
    
    const newItem = {
      id: Date.now(),
      name: newDocument.name,
      type: newDocument.type || getFileType(newDocument.file.name),
      uploadDate: new Date().toISOString().split('T')[0],
      file: newDocument.file,
      description: newDocument.description,
      category: newDocument.category,
      size: (newDocument.file.size / 1024).toFixed(2) + " KB"
    };
    
    onChange([...data, newItem]);
    setNewDocument({ 
      name: "", 
      type: "", 
      uploadDate: "", 
      file: null, 
      description: "",
      category: "General"
    });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditDocument({...item});
  };

  const handleSave = () => {
    const updated = data.map((item) => 
      item.id === editId ? {...editDocument} : item
    );
    onChange(updated);
    setEditId(null);
    setEditDocument({});
  };

  const handleDelete = (id) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDocument({
        ...newDocument,
        name: file.name,
        type: getFileType(file.name),
        file: file
      });
    }
  };

  const getFileType = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    if (['pdf'].includes(extension)) return 'PDF';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'Image';
    if (['doc', 'docx'].includes(extension)) return 'Word';
    if (['xls', 'xlsx'].includes(extension)) return 'Excel';
    return 'Other';
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'PDF': return <FaFilePdf className="text-red-500" />;
      case 'Image': return <FaFileImage className="text-green-500" />;
      case 'Word': return <FaFileWord className="text-blue-500" />;
      case 'Excel': return <FaFileExcel className="text-green-600" />;
      default: return <FaFileAlt className="text-gray-500" />;
    }
  };

  const handleDownload = (file, name) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = name || file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePreview = (file, type) => {
    if (type === 'PDF' || type === 'Image') {
      const url = URL.createObjectURL(file);
      setPreviewFile(url);
      setPreviewType(type);
    } else {
      alert('Preview not available for this file type. Please download the file.');
    }
  };

  const closePreview = () => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile);
      setPreviewFile(null);
    }
  };

  return (
    <div className="document-manager">
      <h3 className="text-xl font-semibold mb-4">Documents</h3>
      
      {/* Document Categories */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={newDocument.category}
          onChange={(e) => setNewDocument({...newDocument, category: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="General">General</option>
          <option value="Equipment">Equipment</option>
          <option value="Expenditure">Expenditure</option>
          <option value="Research">Research</option>
          <option value="Contracts">Contracts</option>
        </select>
      </div>
      
      {/* File Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document</label>
        <div className="flex items-center">
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            <FaUpload className="inline mr-1" /> Select File
          </button>
          <span className="text-sm text-gray-600">
            {newDocument.file ? newDocument.file.name : "No file selected"}
          </span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      
      {/* Document Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
          <input
            type="text"
            value={newDocument.name}
            onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Document name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={newDocument.description}
            onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Description"
          />
        </div>
      </div>
      
      <button
        onClick={handleAdd}
        disabled={!newDocument.file}
        className={`flex items-center px-4 py-2 rounded mb-6 ${
          newDocument.file 
            ? "bg-green-500 hover:bg-green-600 text-white" 
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <FaPlus className="mr-2" /> Add Document
      </button>
      
      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Size</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) =>
              editId === item.id ? (
                <tr key={item.id}>
                  <td className="border px-4 py-2 text-center">
                    {getFileIcon(item.type)}
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      value={editDocument.name}
                      onChange={(e) => setEditDocument({...editDocument, name: e.target.value})}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      value={editDocument.category}
                      onChange={(e) => setEditDocument({...editDocument, category: e.target.value})}
                      className="w-full p-1 border rounded"
                    >
                      <option value="General">General</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Expenditure">Expenditure</option>
                      <option value="Research">Research</option>
                      <option value="Contracts">Contracts</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      value={editDocument.description}
                      onChange={(e) => setEditDocument({...editDocument, description: e.target.value})}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{item.size}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="date"
                      value={editDocument.uploadDate}
                      onChange={(e) => setEditDocument({...editDocument, uploadDate: e.target.value})}
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <FaCheck
                      onClick={handleSave}
                      className="inline text-green-600 hover:text-green-800 cursor-pointer"
                    />
                  </td>
                </tr>
              ) : (
                <tr key={item.id}>
                  <td className="border px-4 py-2 text-center">
                    {getFileIcon(item.type)}
                  </td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2">{item.size}</td>
                  <td className="border px-4 py-2">{item.uploadDate}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <FaEye
                      onClick={() => handlePreview(item.file, item.type)}
                      className="inline text-blue-500 hover:text-blue-700 cursor-pointer"
                      title="Preview"
                    />
                    <FaDownload
                      onClick={() => handleDownload(item.file, item.name)}
                      className="inline text-green-500 hover:text-green-700 cursor-pointer"
                      title="Download"
                    />
                    <FaPen
                      onClick={() => handleEdit(item)}
                      className="inline text-yellow-500 hover:text-yellow-700 cursor-pointer"
                      title="Edit"
                    />
                    <FaTrash
                      onClick={() => handleDelete(item.id)}
                      className="inline text-red-500 hover:text-red-700 cursor-pointer"
                      title="Delete"
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold">Document Preview</h3>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              {previewType === 'PDF' ? (
                <iframe 
                  src={previewFile} 
                  className="w-full h-96" 
                  title="PDF Preview"
                />
              ) : (
                <img 
                  src={previewFile} 
                  alt="Preview" 
                  className="max-w-full h-auto mx-auto"
                />
              )}
            </div>
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = previewFile;
                  a.download = `preview.${previewType === 'PDF' ? 'pdf' : 'jpg'}`;
                  a.click();
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
              >
                <FaDownload className="mr-2" /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};