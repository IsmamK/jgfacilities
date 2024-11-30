import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import axios from 'axios';

const WhyUsModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [data, setData] = useState(null); // Set initial data as null for conditional rendering
  const [loading, setLoading] = useState(false); // Loading state for both fetching and saving data
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/home/why-us/`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...data.features];
    newFeatures[index][field] = value;
    setData({ ...data, features: newFeatures });
  };

  const addNewFeature = () => {
    const newFeature = {
      iconUrl: '',
      title: '',
      description: '',
    };
    setData({ ...data, features: [...data.features, newFeature] });
  };

  const removeFeature = (index) => {
    const newFeatures = data.features.filter((_, i) => i !== index);
    setData({ ...data, features: newFeatures });
  };

  // Convert image to base64
  const handleIconUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        handleFeatureChange(index, 'iconUrl', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!data.title || !data.subtitle || !data.features.every(f => f.title && f.description)) {
      alert("Please fill all the required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.patch(`${apiUrl}/home/why-us/`, data);
      alert('Data successfully updated');
      window.location.reload()
      onClose();
    } catch (error) {
      console.error('Error updating data:', error);
      setError("Error updating the data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return <p>Loading...</p>; // Show loading only if data is null (initial fetch)
  }

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-5xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

        <h3 className="font-bold text-lg mb-2">Why Choose Us Configuration</h3>

        {data ? (
          <>
            <div className="mb-4">
              <input
                type="text"
                value={data.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="input input-bordered w-full"
                placeholder="Section Title"
              />
              <input
                type="text"
                value={data.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                className="input input-bordered w-full mt-2"
                placeholder="Subtitle"
              />
            </div>

            <div className="flex mb-4">
              <div className="mr-4">
                <label>Background Color</label>
                <HexColorPicker
                  color={data.bgColor}
                  onChange={(color) => handleInputChange('bgColor', color)}
                />
                <input
                  type="text"
                  value={data.bgColor}
                  onChange={(e) => handleInputChange('bgColor', e.target.value)}
                  className="input input-bordered mt-2 w-full"
                  placeholder="#000000"
                />
              </div>
              <div>
                <label>Text Color</label>
                <HexColorPicker
                  color={data.textColor}
                  onChange={(color) => handleInputChange('textColor', color)}
                />
                <input
                  type="text"
                  value={data.textColor}
                  onChange={(e) => handleInputChange('textColor', e.target.value)}
                  className="input input-bordered mt-2 w-full"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <input
              type="text"
              value={data.divider}
              onChange={(e) => handleInputChange('divider', e.target.value)}
              className="input input-bordered w-full mb-4"
              placeholder="Divider Image URL"
            />

            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-2 border">Icon Upload</th>
                  <th className="px-2 py-2 border">Title</th>
                  <th className="px-2 py-2 border">Description</th>
                  <th className="px-2 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.features.map((feature, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-2 py-2 border">
                      <input
                        type="file"
                        onChange={(e) => handleIconUpload(index, e)}
                        className="input input-bordered w-full"
                      />
                    </td>
                    <td className="px-2 py-2 border">
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Feature Title"
                      />
                    </td>
                    <td className="px-2 py-2 border">
                      <input
                        type="text"
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Feature Description"
                      />
                    </td>
                    <td className="px-2 py-2 border text-center">
                      <button
                        onClick={() => removeFeature(index)}
                        className="btn btn-sm btn-error"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button className="btn btn-primary" onClick={addNewFeature}>Add New Feature</button>
              <button className="btn btn-success" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-500 mt-2">{error}</p>
        )}
      </div>
    </dialog>
  );
};

export default WhyUsModal;
