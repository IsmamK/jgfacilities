import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const EditNavbarModal = ({ isOpen, onClose, setNavbarData }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [newNavbarData, setNewNavbarData] = useState({
    logo: '', 
    logo2:"",
    bgColor: '#ffffff',
    textColor: '#000000',
    buttonBgColor: '#007bff',
    buttonTextColor: '#ffffff',
    navbarLinks: [
      { label: 'Home', path: '/home' },
      { label: 'About Us', path: '/about' },
      { label: 'Our Services', path: '/services' },
      { label: 'Projects', path: '/projects' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Contact Us', path: '/contact' },
    ],
  });

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewNavbarData({ ...newNavbarData, [key]: reader.result }); // Dynamic key
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file');
    }
  };
  

  useEffect(() => {
    if (isOpen) {
      fetch(`${apiUrl}/layout/navbar/`)
        .then((response) => response.json())
        .then((data) => setNewNavbarData(data))
        .catch((error) => console.error('Error fetching navbar data:', error));
    }
  }, [isOpen, apiUrl]);

  const handleSave = async () => {
    try {
      const updatedData = {
        ...newNavbarData,
        logo: newNavbarData.logo.split(',')[1], // Encode base64
        logo2: newNavbarData.logo2?.split(',')[1], // Optional encoding
      };
  
      const response = await fetch(`${apiUrl}/layout/navbar/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        const updatedNavbar = await response.json();
        setNavbarData(updatedNavbar);
        onClose();
      } else {
        console.error('Failed to update navbar data');
      }
    } catch (error) {
      console.error('Error updating navbar data:', error);
    }
  };
  
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...newNavbarData.navbarLinks];
    updatedLinks[index][field] = value;
    setNewNavbarData({ ...newNavbarData, navbarLinks: updatedLinks });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Navbar</h2>

        {/* Logo Upload */}
        <div className="mb-6">
          <label className="block text-sm">Upload Navbar Logo (Image File)</label>
          <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'logo')} // For secondary logo
          className="border p-2 w-full mt-2 text-sm"
        />

          {newNavbarData.logo && (
            <div className="mt-4 flex justify-center">
                    <img
                    src={`data:image/png;base64,${newNavbarData.logo}`}
                    alt="Navbar Logo"
                    className="w-32 h-32 object-contain"
/>
            </div>
          )}
        </div>

          {/* Logo Upload */}
          <div className="mb-6">
          <label className="block text-sm">Upload Navbar Secondary Logo (Image File)</label>
          <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, 'logo2')} // For secondary logo
        className="border p-2 w-full mt-2 text-sm"
      />

          {newNavbarData.logo2 && (
            <div className="mt-4 flex justify-center">
                    <img
                    src={`data:image/png;base64,${newNavbarData.logo2}`}
                    alt="Navbar Logo 2"
                    className="w-32 h-32 object-contain"
/>
            </div>
          )}
        </div>

        {/* Color Pickers */}
        <div className="mb-6">
          <label className="block text-sm">Background Color</label>
          <div className="hex flex items-center">
            <HexColorPicker
              color={newNavbarData.bgColor}
              onChange={(color) => setNewNavbarData({ ...newNavbarData, bgColor: color })}
            />
            <input
              type="text"
              value={newNavbarData.bgColor}
              onChange={(e) => setNewNavbarData({ ...newNavbarData, bgColor: e.target.value })}
              className="border p-2 w-20 ml-4 text-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm">Text Color</label>
          <div className="hex flex items-center">
            <HexColorPicker
              color={newNavbarData.textColor}
              onChange={(color) => setNewNavbarData({ ...newNavbarData, textColor: color })}
            />
            <input
              type="text"
              value={newNavbarData.textColor}
              onChange={(e) => setNewNavbarData({ ...newNavbarData, textColor: e.target.value })}
              className="border p-2 w-20 ml-4 text-sm"
            />
          </div>
        </div>

        {/* Navbar Links Management */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Manage Navbar Links</h3>
          {newNavbarData.navbarLinks.map((link, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                value={link.label}
                onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                className="border p-2 w-full text-sm mr-4"
                placeholder="Link Label"
              />
              <input
                type="text"
                value={link.path}
                onChange={(e) => handleLinkChange(index, 'path', e.target.value)}
                className="border p-2 w-full text-sm"
                placeholder="Link Path"
              />
            </div>
          ))}
        </div>

        {/* Save and Close */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNavbarModal;
