import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

const Contact1Modal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    header: "",
    subHeader: "",
    buttonText: "",
    buttonLink: "",
    email: "",
    phone: "",
    bgColor: "",
    textColor: "",
    locations: [],
  });

  useEffect(() => {
    // Fetch data from the API
    fetch(`${apiUrl}/contact/contact1/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  const handleBgColorChange = (color) => {
    setFormData((prevData) => ({
      ...prevData,
      bgColor: color,
    }));
  };

  const handleTextColorChange = (color) => {
    setFormData((prevData) => ({
      ...prevData,
      textColor: color,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (index, field, value) => {
    const updatedLocations = [...formData.locations];
    updatedLocations[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      locations: updatedLocations,
    }));
  };

  const handleAddLocation = () => {
    setFormData((prevData) => ({
      ...prevData,
      locations: [
        ...prevData.locations,
        { country: "", address: "", imgSrc: "" },
      ],
    }));
  };

  const handleRemoveLocation = (index) => {
    const updatedLocations = formData.locations.filter(
      (_, locIndex) => locIndex !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      locations: updatedLocations,
    }));
  };

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedLocations = [...formData.locations];
      updatedLocations[index].imgSrc = reader.result;
      setFormData((prevData) => ({
        ...prevData,
        locations: updatedLocations,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert formData to the required format
    const updatedFormData = {
      ...formData,
      locations: formData.locations.map((location) => ({
        ...location,
        imgSrc: location.imgSrc.split(",")[1] || location.imgSrc, // Strip base64 prefix if necessary
      })),
    };

    // Send PATCH request
    fetch(`${apiUrl}/contact/contact1/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated Data:", data);
        onClose();
        window.location.reload()
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white p-8 rounded shadow-lg max-w-xl w-full max-h-screen overflow-y-auto relative my-8 mx-4">
        <h2 className="text-2xl mb-4">Edit Contact Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold">Header</label>
            <input
              type="text"
              name="header"
              value={formData.header}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">SubHeader</label>
            <textarea
              name="subHeader"
              value={formData.subHeader}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Phone Number</label>
            <input
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Button Text</label>
            <input
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            ></input>
          </div>

            <div className="mb-4">
            <label className="block font-bold">Button Link</label>
            <input
              name="buttonLink"
              value={formData.buttonLink}
              onChange={handleChange}
              className="border p-2 rounded-lg"
            ></input>
          </div>
        
          {/* Background and Text Color Pickers */}
          <div className="mb-4">
            <label className="block font-bold">Background Color</label>
            <div className="hex flex items-center">
              <HexColorPicker
                color={formData.bgColor}
                onChange={handleBgColorChange}
                className="mr-4"
              />
              <input
                type="text"
                name="bgColor"
                value={formData.bgColor}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-bold">Text Color</label>
            <div className="hex flex items-center">
              <HexColorPicker
                color={formData.textColor}
                onChange={handleTextColorChange}
                className="mr-4"
              />
              <input
                type="text"
                name="textColor"
                value={formData.textColor}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
            </div>
          </div>
          {/* Tabulated Locations */}
          <h3 className="text-xl mb-2">Locations</h3>
          {formData.locations.map((location, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <div className="flex justify-between mb-2">
                <h4 className="font-bold">Location {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => handleRemoveLocation(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              <div className="mb-2">
                <label className="block font-bold">Country</label>
                <input
                  type="text"
                  value={location.country}
                  onChange={(e) =>
                    handleLocationChange(index, "country", e.target.value)
                  }
                  className="border p-2 rounded-lg"
                />
              </div>
              <div className="mb-2">
                <label className="block font-bold">Address</label>
                <input
                  type="text"
                  value={location.address}
                  onChange={(e) =>
                    handleLocationChange(index, "address", e.target.value)
                  }
                  className="border p-2 rounded-lg"
                />
              </div>
              <div className="mb-2">
                <label className="block font-bold">Image Source</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                  className="border p-2 rounded-lg"
                />
                {location.imgSrc && (
                  <img
                    src={location.imgSrc}
                    alt={`Location ${index + 1}`}
                    className="mt-2 max-h-32 object-cover"
                  />
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLocation}
            className="bg-blue-500 text-white p-2 rounded mb-4"
          >
            Add Location
          </button>
          {/* Save and Cancel Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 p-2 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact1Modal;
