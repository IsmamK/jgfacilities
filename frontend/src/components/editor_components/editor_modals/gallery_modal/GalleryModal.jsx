import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const GalleryModal = ({ isOpen, onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL; // Base URL from .env

  const [galleryData, setGalleryData] = useState({
    title: "",
    subtitle: "",
    bgColor: "",
    textColor: "",
    imageBgColor: "",
    imageTextColor: "",
    items: []
  });

  useEffect(() => {
    fetch(`${API_URL}/gallery`)
      .then(res => res.json())
      .then(data => {
        setGalleryData(data);
      });
  }, [API_URL]);

  // Handler for updating simple string fields (title, subtitle)
  const handleFieldChange = (field, value) => {
    setGalleryData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Handler for updating color fields
  const handleColorChange = (field, value) => {
    setGalleryData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Handler for updating individual image items
  const handleInputChange = (index, field, value) => {
    const updatedItems = [...galleryData.items];
    updatedItems[index][field] = value;
    setGalleryData({ ...galleryData, items: updatedItems });
  };

  // Handler for image uploads
  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedItems = [...galleryData.items];
      updatedItems[index].image = imageUrl;
      setGalleryData({ ...galleryData, items: updatedItems });
    }
  };

  // Convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Add a new image item
  const addNewImage = () => {
    setGalleryData({
      ...galleryData,
      items: [
        ...galleryData.items,
        { image: null, subtitle: "", title: "", description: "" }
      ]
    });
  };

  // Remove an image item
  const handleRemoveImage = (index) => {
    setGalleryData({
      ...galleryData,
      items: galleryData.items.filter((_, i) => i !== index)
    });
  };

  // Save handler with PATCH request
  const handleSave = async () => {
    const updatedItems = await Promise.all(
      galleryData.items.map(async (item) => {
        if (item.image) {
          const response = await fetch(item.image);
          const blob = await response.blob();
          const base64String = await convertToBase64(blob);
          return { ...item, image: base64String }; // Replace image URL with Base64 string
        }
        return item;
      })
    );

    const dataToSend = {
      ...galleryData,
      items: updatedItems,
    };

    try {
      const response = await fetch(`${API_URL}/gallery/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to update gallery data');
      }

      console.log("Gallery Data Saved:", dataToSend);
      onClose();
      window.location.reload()
    } catch (error) {
      console.error("Error saving gallery data:", error);
    }
  };

  return (
    <dialog id="gallery_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-5xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Edit Gallery</h3>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={galleryData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="input input-bordered w-full mb-1"
          />
        </div>

        {/* Subtitle Input */}
        <div className="mb-4">
          <label className="block mb-1">Subtitle:</label>
          <textarea
            value={galleryData.subtitle}
            onChange={(e) => handleFieldChange('subtitle', e.target.value)}
            className="textarea textarea-bordered w-full mb-1"
            rows={3}
          />
        </div>

        {/* Background Color Picker */}
        <label className="block mr-2">Background Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={galleryData.bgColor}
            onChange={(color) => handleColorChange('bgColor', color)}
          />
          <input
            type="text"
            value={galleryData.bgColor}
            onChange={(e) => handleColorChange('bgColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        {/* Text Color Picker */}
        <label className="block mr-2">Text Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={galleryData.textColor}
            onChange={(color) => handleColorChange('textColor', color)}
          />
          <input
            type="text"
            value={galleryData.textColor}
            onChange={(e) => handleColorChange('textColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        {/* Image Background Color Picker */}
        <label className="block mr-2">Image Background Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={galleryData.imageBgColor}
            onChange={(color) => handleColorChange('imageBgColor', color)}
          />
          <input
            type="text"
            value={galleryData.imageBgColor}
            onChange={(e) => handleColorChange('imageBgColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        {/* Image Text Color Picker */}
        <label className="block mr-2">Image Text Color:</label>
        <div className="mb-4 hex flex items-center">
          <HexColorPicker
            color={galleryData.imageTextColor}
            onChange={(color) => handleColorChange('imageTextColor', color)}
          />
          <input
            type="text"
            value={galleryData.imageTextColor}
            onChange={(e) => handleColorChange('imageTextColor', e.target.value)}
            className="input input-bordered w-20 ml-2"
          />
        </div>

        {/* Image Items Table */}
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th className="border p-2 w-1/5">Image</th>
              <th className="border p-2 w-1/5">Subtitle</th>
              <th className="border p-2 w-1/5">Title</th>
              <th className="border p-2 w-1/5">Description</th>
              <th className="border p-2 w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {galleryData.items.map((item, index) => (
              <tr key={index}>
                <td className="border p-2 text-center align-middle">
                  {item.image ? (
                    <div>
                      <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mb-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="btn btn-sm btn-outline w-full"
                      />
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      className="input border border-gray-300 rounded p-2"
                    />
                  )}
                </td>
                <td className="border p-2 align-middle">
                  <input
                    type="text"
                    value={item.subtitle}
                    onChange={(e) => handleInputChange(index, 'subtitle', e.target.value)}
                    className="input input-bordered w-full"
                  />
                </td>
                <td className="border p-2 align-middle">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    className="input input-bordered w-full"
                  />
                </td>
                <td className="border p-2 align-middle">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="input input-bordered w-full"
                  />
                </td>
                <td className="border p-2 align-middle">
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    <div className='flex  justify-between'>
        <button onClick={addNewImage} className="btn btn-primary mt-4"> + Add Image</button>
        <button onClick={handleSave} className="btn btn-success mt-4 text-white">Save Changes</button>
        </div>
      </div>
    </dialog>
  );
};

export default GalleryModal;
