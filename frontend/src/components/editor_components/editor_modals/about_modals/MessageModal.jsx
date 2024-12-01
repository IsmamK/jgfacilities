import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const MessageModal = ({ isOpen, onClose }) => {
  const [messageData, setMessageData] = useState({
    heading: "",
    subheading: "",
    description: "",
    image: "",
    bgColor: "",
    textColor: "",
  });

  useEffect(() => {
    const fetchMessageData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${apiUrl}/about/message`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessageData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isOpen) {
      fetchMessageData();
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setMessageData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMessageData((prevData) => ({
          ...prevData,
          image: reader.result, // Store Base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      // Send updated data to API
      const response = await fetch(`${apiUrl}/about/message/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Saved data:', result);
      onClose(); // Close modal after saving
    //   window.location.reload(); // Reload page to reflect changes
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-lg relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Edit Message</h3>

        {/* Heading */}
        <div className="mb-4">
          <label className="block mb-1">Heading:</label>
          <input
            type="text"
            value={messageData.heading}
            onChange={(e) => handleInputChange('heading', e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Subheading */}
        <div className="mb-4">
          <label className="block mb-1">Subheading:</label>
          <input
            type="text"
            value={messageData.subheading}
            onChange={(e) => handleInputChange('subheading', e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            value={messageData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Background Color */}
        <label className="block mb-1">Background Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={messageData.bgColor}
            onChange={(color) => handleInputChange('bgColor', color)}
          />
          <input
            type="text"
            value={messageData.bgColor}
            onChange={(e) => handleInputChange('bgColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        {/* Text Color */}
        <label className="block mb-1">Text Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={messageData.textColor}
            onChange={(color) => handleInputChange('textColor', color)}
          />
          <input
            type="text"
            value={messageData.textColor}
            onChange={(e) => handleInputChange('textColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block mb-1">Image:</label>
          {messageData.image && (
            <img
              src={messageData.image}
              alt="Preview"
              className="w-40 h-40 object-cover mb-2"
            />
          )}
          <input
            type="file"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default MessageModal;
