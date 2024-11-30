import React, { useState,useEffect } from 'react';
import { HexColorPicker } from "react-colorful"; // Ensure you have react-colorful installed for color picking

const HeroModal = ({ isOpen, onClose }) => {
  // Static data for the hero component
  const apiUrl = import.meta.env.VITE_API_URL;

  const [heroData, setHeroData] = useState({
    "title": "",
    "bgColor":"",
    "textColor":"",
    "description": "",
    "divider": "",
    "image1": "",
    "image2": "",
    "altText1": "",
    "altText2": "",
    "contactLink": "",
    "contactText": "",
    "ctaLink": "",
    "ctaText": "",

  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/hero`); // Replace with your API endpoint
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to convert file to Base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  // Handle file input changes
  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const base64Image = await toBase64(files[0]);
      setHeroData((prevData) => ({
        ...prevData,
        [name]: base64Image,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Prepare data to patch
      const dataToPatch = {
        ...heroData,
      };

      // Send PATCH request to the API
      const response = await fetch(`${apiUrl}/home/hero/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPatch),
      });

      if (!response.ok) {
        throw new Error('Failed to update hero data');
        
      }

      console.log('Updated Hero Data:', dataToPatch);
      alert("Hero Updated Successfully")
      window.location.reload()
      onClose(); // Close modal after saving
    } catch (error) {
      console.error("Error updating hero data:", error);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-2xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

        <h3 className="font-bold text-lg mb-4">Edit Hero Section</h3>

        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={heroData.title}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={heroData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full mb-2"
            rows={3}
          />
        </div>
        <div className="mb-4 grid grid-cols-2 border-b border-gray-300">
          <label className="block mb-1">Button 1 Text:</label>
          <input
            type="text"
            name="contactText"
            value={heroData.contactText}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
          />
        <label className="block mb-1">Button 1 Link:</label>
          <input
            type="text"
            name="contactLink"
            value={heroData.contactLink}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 ">
          <label className="block mb-1">Button 2 Text:</label>
          <input
            type="text"
            name="ctaText"
            value={heroData.ctaText}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
          />
        <label className="block mb-1">Button 2 Link:</label>
          <input
            type="text"
            name="ctaLink"
            value={heroData.ctaLink}
            onChange={handleChange}
            className="input input-bordered w-full mb-2"
          />
        </div>

        

        <div className="mb-4">
          <label className="block mb-1">Upload Image 1:</label>
          <input
            type="file"
            name="image1"
            accept="image/*"
            onChange={handleFileChange}
            className="input input-bordered w-full mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Upload Image 2:</label>
          <input
            type="file"
            name="image2"
            accept="image/*"
            onChange={handleFileChange}
            className="input input-bordered w-full mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Background Color:</label>
          <div className="flex items-center mb-2">
            <div className="hex">
              <HexColorPicker
                color={heroData.bgColor}
                onChange={(color) => setHeroData((prevData) => ({ ...prevData, bgColor: color }))}
                className="w-24 h-24" // Set the dimensions for the color picker
              />
            </div>
            <input
              type="text"
              name="bgColor"
              value={heroData.bgColor}
              onChange={handleChange}
              className="input input-bordered w-24 ml-2" // Small input for hex code
              placeholder="#ffffff" // Placeholder for hex code
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Text Color:</label>
          <div className="flex items-center mb-2">
            <div className="hex">
              <HexColorPicker
                color={heroData.textColor}
                onChange={(color) => setHeroData((prevData) => ({ ...prevData, textColor: color }))}
                className="w-24 h-24" // Set the dimensions for the color picker
              />
            </div>
            <input
              type="text"
              name="textColor"
              value={heroData.textColor}
              onChange={handleChange}
              className="input input-bordered w-24 ml-2" // Small input for hex code
              placeholder="#333333" // Placeholder for hex code
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </dialog>
  );
};

export default HeroModal;
