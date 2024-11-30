import React, { useState,useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const OurClientsModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL; // API URL




  const [data, setData] = useState({
    title: "",
    bgColor: "",
    textColor: "",
    clients: [

    ]
  });

  useEffect(()=> {

    // Simulated fetched data
    fetch(`${apiUrl}/home/our-clients`)
    .then(res=>res.json())
    .then(data=>  setData(data))
  
  },[])
  

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleClientChange = (index, field, value) => {
    const updatedClients = [...data.clients];
    updatedClients[index][field] = value;
    setData({ ...data, clients: updatedClients });
  };

  const handleLogoUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Directly set the base64 encoded image
        handleClientChange(index, 'logo', reader.result);
      };
      reader.readAsDataURL(file); // Convert the image to base64
    }
  };

  const removeClient = (index) => {
    const updatedClients = data.clients.filter((_, i) => i !== index);
    setData({ ...data, clients: updatedClients });
  };

  const addNewClient = () => {
    const newClient = {
      logo: '',
      link: ''
    };
    setData({ ...data, clients: [...data.clients, newClient] });
  };

  const handleSubmit = async () => {
    // Create the payload with the data to be sent to the API
    const payload = {
      title: data.title,
      bgColor: data.bgColor,
      textColor: data.textColor,
      clients: data.clients.map(client => ({
        logo: client.logo, // Base64 encoded image
        link: client.link
      }))
    };

    try {
      // Send the request to the API
      const response = await fetch(`${apiUrl}/home/our-clients/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Data saved successfully');
        window.location.reload()
        onClose(); // Close the modal after successful submission
      } else {
        console.error('Error saving data');
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-5xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

        <h3 className="font-bold text-lg mb-2">Logo Cloud</h3>

        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Title"
          />
        </div>

        <div className="mb-4 ">
          <label className="block mb-1 mr-2">Background Color</label>
          <div className="hex flex items-center">
            <HexColorPicker
              color={data.bgColor}
              onChange={(color) => handleInputChange('bgColor', color)}
              className="w-12 h-12"
            />
            <input
              type="text"
              value={data.bgColor}
              onChange={(e) => handleInputChange('bgColor', e.target.value)}
              className="input input-bordered w-20 ml-2"
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 mr-2">Text Color</label>
          <div className="hex flex items-center">
            <HexColorPicker
              color={data.textColor}
              onChange={(color) => handleInputChange('textColor', color)}
              className="w-12 h-12"
            />
            <input
              type="text"
              value={data.textColor}
              onChange={(e) => handleInputChange('textColor', e.target.value)}
              className="input input-bordered w-20 ml-2"
              placeholder="#000000"
            />
          </div>
        </div>

        <table className="table-auto w-full border border-gray-300 overflow-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2 border">Logo</th>
              <th className="px-2 py-2 border">Link</th>
              <th className="px-2 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client, index) => (
              <tr key={index} className="border-t">
                <td className="px-2 py-2 border text-center">
                  <img
                    src={client.logo}
                    alt="Client Logo"
                    className="h-16 w-16 object-contain mb-2"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(index, e)}
                    className="file-input file-input-bordered w-full"
                  />
                </td>
                <td className="px-2 py-2 border text-center">
                  <input
                    type="text"
                    value={client.link}
                    onChange={(e) => handleClientChange(index, 'link', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Client Link"
                  />
                </td>
                <td className="px-2 py-2 border text-center">
                  <button
                    onClick={() => removeClient(index)}
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
          <button className="btn btn-primary" onClick={addNewClient}>Add New Client</button>
          <button className="btn btn-success" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </dialog>
  );
};

export default OurClientsModal;
