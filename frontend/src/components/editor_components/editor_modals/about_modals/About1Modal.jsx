import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const About1Modal = ({ isOpen, onClose }) => {
  const [aboutData, setAboutData] = useState({
    title: '',
    description: '',
    image1: null, // New image file for Image 1
    image2: null, // New image file for Image 2
    buttonLabel: '',
    buttonLink: '',
    bgColor: '#FFFFFF',
    textColor: '#333333',
  });

  const [defaultImages, setDefaultImages] = useState({
    image1Url: '', // Default URL for Image 1
    image2Url: '', // Default URL for Image 2
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${apiUrl}/about/about1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAboutData((prevData) => ({
          ...prevData,
          ...data,
          image1: null, // Reset to null for file uploads
          image2: null, // Reset to null for file uploads
        }));
        setDefaultImages({
          image1Url: data.image1, // Set the default image URL from API data
          image2Url: data.image2, // Set the default image URL from API data
        });
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

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setAboutData((prevData) => ({
        ...prevData,
        [field]: file,
      }));
    }
  };

  const handleSave = async () => {
    // Function to convert image file to Base64
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Convert to Base64
      });
    };

    try {
      let image1Base64 = defaultImages.image1Url; // Use default URL initially
      let image2Base64 = defaultImages.image2Url; // Use default URL initially

      // Convert images to Base64 if new files exist
      if (aboutData.image1) {
        image1Base64 = await convertToBase64(aboutData.image1);
      }
      if (aboutData.image2) {
        image2Base64 = await convertToBase64(aboutData.image2);
      }

      // Construct the JSON data
      const jsonData = {
        ...aboutData,
        image1: image1Base64,
        image2: image2Base64,
      };

      const apiUrl = import.meta.env.VITE_API_URL;

      // Send JSON data
      const response = await fetch(`${apiUrl}/about/about1/`, {
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
      window.location.reload()
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
        <h3 className="font-bold text-lg mb-4">About Us</h3>

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
            onChange={(e) => handleInpuChange('bgColor', e.target.value)}
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

        <div className="mb-4 grid  grid-cols-2 gap-4">
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
          <label className="block mb-1">Image 1:</label>
          {aboutData.image1 ? (
            <img
              src={URL.createObjectURL(aboutData.image1)}
              alt="Image 1"
              className="w-40 h-40 object-cover mb-2"
            />
          ) : (
            defaultImages.image1Url && (
              <img
                src={defaultImages.image1Url}
                alt="Default Image 1"
                className="w-40 h-40 object-cover mb-2"
              />
            )
          )}
          <input
            type="file"
            onChange={(e) => handleImageChange(e, 'image1')}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Image 2:</label>
          {aboutData.image2 ? (
            <img
              src={URL.createObjectURL(aboutData.image2)}
              alt="Image 2"
              className="w-40 h-40 object-cover mb-2"
            />
          ) : (
            defaultImages.image2Url && (
              <img
                src={defaultImages.image2Url}
                alt="Default Image 2"
                className="w-40 h-40 object-cover mb-2"
              />
            )
          )}
          <input
            type="file"
            onChange={(e) => handleImageChange(e, 'image2')}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Other form fields for button label, button link, background color, text color */}
        {/* ... */}

        <div className="flex justify-end mt-4">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default About1Modal;
