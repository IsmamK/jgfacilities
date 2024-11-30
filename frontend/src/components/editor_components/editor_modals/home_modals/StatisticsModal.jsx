import React, { useState,useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import axios from 'axios';

const StatisticsModal = ({ isOpen, onClose}) => {
  const apiUrl = import.meta.env.VITE_API_URL;


  const [statisticsData, setStatisticsData] = useState({
    heading: '',
    subtitle: '',
    bgColor: '',
    textColor: '',
    stats: [],
    numbersBgColor: '',
    numbersTextColor: '',
  });

  useEffect(() => {
    // Mock JSON data
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/statistics`); // Replace with your API endpoint
        const data = await response.json();
        setStatisticsData(data);
      } catch (error) {
        console.error("Error fetching  data:", error);
      }
    };


    // Simulating an API call
    fetchData()
  }, []);

  // Handle changes for simple fields
  const handleChange = (field, value) => {
    setStatisticsData({ ...statisticsData, [field]: value });
  };

  // Handle changes for statistics array
  const handleStatChange = (index, field, value) => {
    const updatedStats = [...statisticsData.stats];
    updatedStats[index][field] = value;
    setStatisticsData({ ...statisticsData, stats: updatedStats });
  };

  // Add a new statistic entry
  const handleAddStat = () => {
    const newStat = { value: "", label: "" };
    setStatisticsData((prevData) => ({
      ...prevData,
      stats: [...prevData.stats, newStat],
    }));
  };

  // Handle form submission and send patch request
  const handleSubmit = async () => {
    try {
      await axios.patch(`${apiUrl}/home/statistics/`, statisticsData);
      alert('Statistics data updated successfully!');
      window.location.reload()
      onClose(); // Close modal after saving
    } catch (error) {
      console.error('Error updating statistics data:', error);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-7xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

        <h3 className="font-bold text-lg mb-4">Edit Statistics Section</h3>

        {/* Editable Heading */}
        <div className="mb-4">
          <label className="block mb-1">Heading:</label>
          <input
            type="text"
            value={statisticsData.heading}
            onChange={(e) => handleChange('heading', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter heading"
          />
        </div>

        {/* Editable Subtitle */}
        <div className="mb-4">
          <label className="block mb-1">Subtitle:</label>
          <textarea
            value={statisticsData.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Enter subtitle"
          />
        </div>

        {/* Background Color Picker */}
        <div className="mb-4">
          <label className="block mb-1">Background Color:</label>
          <div className="flex items-center">
            <HexColorPicker
              color={statisticsData.bgColor}
              onChange={(color) => handleChange('bgColor', color)}
              className="w-20 h-20"
            />
            <input
              type="text"
              value={statisticsData.bgColor}
              onChange={(e) => handleChange('bgColor', e.target.value)}
              className="input input-bordered w-32 ml-2"
              placeholder="Hex Code"
            />
          </div>
        </div>

        {/* Text Color Picker */}
        <div className="mb-4">
          <label className="block mb-1">Text Color:</label>
          <div className="flex items-center">
            <HexColorPicker
              color={statisticsData.textColor}
              onChange={(color) => handleChange('textColor', color)}
              className="w-20 h-20"
            />
            <input
              type="text"
              value={statisticsData.textColor}
              onChange={(e) => handleChange('textColor', e.target.value)}
              className="input input-bordered w-32 ml-2"
              placeholder="Hex Code"
            />
          </div>
        </div>

        {/* Numbers Background Color Picker */}
        <div className="mb-4">
          <label className="block mb-1">Numbers Background Color:</label>
          <div className="flex items-center">
            <HexColorPicker
              color={statisticsData.numbersBgColor}
              onChange={(color) => handleChange('numbersBgColor', color)}
              className="w-20 h-20"
            />
            <input
              type="text"
              value={statisticsData.numbersBgColor}
              onChange={(e) => handleChange('numbersBgColor', e.target.value)}
              className="input input-bordered w-32 ml-2"
              placeholder="Hex Code"
            />
          </div>
        </div>

        {/* Numbers Text Color Picker */}
        <div className="mb-4">
          <label className="block mb-1">Numbers Text Color:</label>
          <div className="flex items-center">
            <HexColorPicker
              color={statisticsData.numbersTextColor}
              onChange={(color) => handleChange('numbersTextColor', color)}
              className="w-20 h-20"
            />
            <input
              type="text"
              value={statisticsData.numbersTextColor}
              onChange={(e) => handleChange('numbersTextColor', e.target.value)}
              className="input input-bordered w-32 ml-2"
              placeholder="Hex Code"
            />
          </div>
        </div>

        {/* Statistics List */}
        <table className="table w-full">
          <thead>
            <tr>
              <th>Value</th>
              <th>Label</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {statisticsData.stats.map((stat, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter value"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter label"
                  />
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => {
                    const updatedStats = [...statisticsData.stats];
                    updatedStats.splice(index, 1); // Remove statistic
                    setStatisticsData({ ...statisticsData, stats: updatedStats });
                  }}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-4">
          <button className="btn btn-secondary" onClick={handleAddStat}>Add Statistic</button>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </dialog>
  );
};

export default StatisticsModal;
