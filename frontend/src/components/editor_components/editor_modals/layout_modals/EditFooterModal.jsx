// EditFooterModal.jsx
import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const EditFooterModal = ({ isOpen, onClose, footerData, setFooterData }) => {
  const apiUrl = import.meta.env.VITE_API_URL; // Adjust as needed
  const [newFooterData, setNewFooterData] = useState({
    bgColor: footerData?.bgColor || '#000000',
    textColor: footerData?.textColor || '#FFFFFF'
  });

  // Fetch footer data on mount if necessary
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(`${apiUrl}/layout/footer/`);
        const data = await response.json();
        setNewFooterData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    if (isOpen) fetchFooterData();
  }, [isOpen, apiUrl]);

  // Handle save and patch request
  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/layout/footer/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFooterData),
      });

      if (response.ok) {
        setFooterData(newFooterData); // Update parent component's footer data
        onClose(); // Close the modal
      } else {
        console.error("Error updating footer data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving footer data:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Footer</h2>
        
        {/* Background Color Picker */}
        <div className="mb-4">
          <label htmlFor="bgColor" className="block">Background Color</label>
          <div className="hex flex items-center">
            <HexColorPicker
              color={newFooterData.bgColor}
              onChange={(color) => setNewFooterData({ ...newFooterData, bgColor: color })}
            />
            <input
              type="text"
              id="bgColor"
              className="border p-2 ml-2 w-20"
              value={newFooterData.bgColor}
              onChange={(e) => setNewFooterData({ ...newFooterData, bgColor: e.target.value })}
            />
          </div>
        </div>

        {/* Text Color Picker */}
        <div className="mb-4">
          <label htmlFor="textColor" className="block">Text Color</label>
          <div className="hex flex items-center">
            <HexColorPicker
              color={newFooterData.textColor}
              onChange={(color) => setNewFooterData({ ...newFooterData, textColor: color })}
            />
            <input
              type="text"
              id="textColor"
              className="border p-2 ml-2 w-20"
              value={newFooterData.textColor}
              onChange={(e) => setNewFooterData({ ...newFooterData, textColor: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditFooterModal;
