import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const About2Modal = ({ isOpen, onClose }) => {
  const [aboutData, setAboutData] = useState({
    title: "The Tale of Our Achievement Story",
    description: "Our achievement story is a testament to teamwork and perseverance. Together, we've overcome challenges, celebrated victories, and created a narrative of progress and success.",
    stats: [
      { title: "33+ Years", description: "Influencing Digital Landscapes Together" },
      { title: "125+ Projects", description: "Excellence Achieved Through Success" },
      { title: "26+ Awards", description: "Our Dedication to Innovation Wins Understanding" },
      { title: "99% Happy Clients", description: "Mirrors our Focus on Client Satisfaction." },
    ],
    buttonLabel: "Read More",
    imageUrl: '', // Image file for the about image
    bgColor: '#FFFFFF',
    textColor: '#333333',
  });

  const [defaultImage, setDefaultImage] = useState('');

  useEffect(() => {
    const fetchAboutData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${apiUrl}/about/about2`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAboutData((prevData) => ({
          ...prevData,
          ...data,
          imageUrl: null, // Reset imageUrl for file uploads
        }));
        setDefaultImage(data.imageUrl); // Set the default image URL
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isOpen) {
      fetchAboutData();
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setAboutData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...aboutData.stats];
    updatedStats[index][field] = value;

    setAboutData((prevData) => ({
      ...prevData,
      stats: updatedStats,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAboutData((prevData) => ({
        ...prevData,
        imageUrl: file,
      }));
    }
  };

  const handleSave = async () => {
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Convert to Base64
      });
    };

    try {
      let imageBase64 = defaultImage; // Use default image URL if no new file

      // Convert image to Base64 if a new file is uploaded
      if (aboutData.imageUrl) {
        imageBase64 = await convertToBase64(aboutData.imageUrl);
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      const jsonData = {
        ...aboutData,
        imageUrl: imageBase64 || defaultImage, // Use Base64 or default URL
      };

      console.log("Payload to send:", jsonData);

      const response = await fetch(`${apiUrl}/about/about2/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Saved data:', result);
      onClose(); // Close modal after saving
      window.location.reload(); // Refresh the page
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
        <h3 className="font-bold text-lg mb-4">About Our Achievement Story</h3>

        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={aboutData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <label className="block mr-2">Background Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={aboutData.bgColor}
            onChange={(color) => handleInputChange('bgColor', color)}
          />
          <input
            type="text"
            value={aboutData.bgColor}
            onChange={(e) => handleInputChange('bgColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        <label className="block mr-2">Text Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={aboutData.textColor}
            onChange={(color) => handleInputChange('textColor', color)}
          />
          <input
            type="text"
            value={aboutData.textColor}
            onChange={(e) => handleInputChange('textColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            value={aboutData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <h4 className="font-semibold mb-2">Statistics:</h4>
        {aboutData.stats.map((stat, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-1">Statistic {index + 1} Title:</label>
            <input
              type="text"
              value={stat.title}
              onChange={(e) => handleStatChange(index, 'title', e.target.value)}
              className="input input-bordered w-full mb-1"
            />
            <label className="block mb-1">Description:</label>
            <input
              type="text"
              value={stat.description}
              onChange={(e) => handleStatChange(index, 'description', e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        ))}

        <div className="mb-4 grid grid-cols-2 gap-4">
          <label className="block mb-1">Button Label:</label>
          <input
            type="text"
            value={aboutData.buttonLabel}
            onChange={(e) => handleInputChange('buttonLabel', e.target.value)}
            className="input input-bordered w-full"
          />
          <label className="block mb-1">Button Link:</label>
          <input
            type="text"
            value={aboutData.buttonLink}
            onChange={(e) => handleInputChange('buttonLink', e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Image:</label>
          {aboutData.imageUrl && <img src={URL.createObjectURL(aboutData.imageUrl)} alt="Selected Image" className="w-40 h-40 object-cover mb-2" />}
          {defaultImage && !aboutData.imageUrl && (
            <img src={defaultImage} alt="Default Image" className="w-40 h-40 object-cover mb-2" />
          )}
          <input
            type="file"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default About2Modal;
