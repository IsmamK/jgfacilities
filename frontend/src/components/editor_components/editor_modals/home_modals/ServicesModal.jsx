import React, { useState,useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const ServicesModal = ({ isOpen, onClose }) => {


  const apiUrl = import.meta.env.VITE_API_URL;
  
  const [servicesData, setServicesData] = useState({
    bgColor: '',
    textColor: '',
    cardBgColor: '',
    cardTextColor: '',
    iconColor: '',
    title: '',
    description: '',
    services: []
  });

    
  useEffect(() => {
    // Mock JSON data
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/services`); // Replace with your API endpoint
        const data = await response.json();
        setServicesData(data);
      } catch (error) {
        console.error("Error fetching  data:", error);
      }
    };


    // Simulating an API call
    fetchData()
  }, []);
 
  const [newService, setNewService] = useState({ title: "", description: "" });

  const handleTitleChange = (e) => {
    setServicesData({ ...servicesData, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setServicesData({ ...servicesData, description: e.target.value });
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...servicesData.services];
    updatedServices[index][field] = value;
    setServicesData({ ...servicesData, services: updatedServices });
  };

  const handleNewServiceChange = (field, value) => {
    setNewService({ ...newService, [field]: value });
  };

  const handleAddService = () => {
    if (newService.title && newService.description) {
      setServicesData({
        ...servicesData,
        services: [...servicesData.services, newService],
      });
      setNewService({ title: "", description: "" });
    }
  };

  const handleColorChange = (field, color) => {
    setServicesData({ ...servicesData, [field]: color });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/home/services/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(servicesData),
      });

      if (response.ok) {
        alert('Services updated successfully!');
        window.location.reload()
        onClose();
      } else {
        console.error('Failed to update services');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-2xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        <h3 className="font-bold text-lg mb-4">Edit Services Section</h3>

        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={servicesData.title}
            onChange={handleTitleChange}
            className="input input-bordered w-full mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            value={servicesData.description}
            onChange={handleDescriptionChange}
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        {/* Color Pickers with Inputs */}
        {[
          { label: "Background Color", field: "bgColor" },
          { label: "Text Color", field: "textColor" },
          { label: "Card Background Color", field: "cardBgColor" },
          { label: "Card Text Color", field: "cardTextColor" },
          { label: "Icon Color", field: "iconColor" },
        ].map(({ label, field }) => (
          <div key={field} className="mb-4">
            <label className="block mb-1">{label}:</label>
            <div className="flex items-center">
              <HexColorPicker
                color={servicesData[field]}
                onChange={(color) => handleColorChange(field, color)}
                className="w-20 h-20 mr-2"
              />
              <input
                type="text"
                value={servicesData[field]}
                onChange={(e) => handleColorChange(field, e.target.value)}
                className="input input-bordered w-32"
              />
            </div>
          </div>
        ))}

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Add New Service</h4>
          <input
            type="text"
            value={newService.title}
            onChange={(e) => handleNewServiceChange('title', e.target.value)}
            className="input input-bordered w-full mb-2"
            placeholder="Enter service title"
          />
          <textarea
            value={newService.description}
            onChange={(e) => handleNewServiceChange('description', e.target.value)}
            className="textarea textarea-bordered w-full mb-2"
            rows={2}
            placeholder="Enter service description"
          />
          <button className="btn btn-primary" onClick={handleAddService}>Add Service</button>
        </div>

        <table className="table w-full">
          <thead>
            <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {servicesData.services.map((service, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter service title"
                  />
                </td>
                <td>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                    className="textarea textarea-bordered w-full"
                    rows={2}
                    placeholder="Enter service description"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      const updatedServices = [...servicesData.services];
                      updatedServices.splice(index, 1);
                      setServicesData({ ...servicesData, services: updatedServices });
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <button className="btn btn-success w-full" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ServicesModal;
