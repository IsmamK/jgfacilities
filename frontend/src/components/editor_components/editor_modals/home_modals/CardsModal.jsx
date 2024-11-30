import React, { useState,useEffect } from 'react';
import { HexColorPicker } from 'react-colorful'; // Ensure you have react-colorful installed for color picking

const CardsModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [heroData, setHeroData] = useState({
    divider: "", // Replace with your divider image
    bgColor: "black", // Background color for the hero
    textColor: "white", // Text color for the hero
    heading: "What you need is what you get",
    overlayColor: "rgba(0, 0, 0, 0.8)", // Default overlay color with fixed opacity
    overlayTextColor: "white", // Default overlay text color
    cards: [
      {
        imageSrc: 'pholder1.png', // Replace with actual image paths
        title: 'Card 1',
        additionalDetails: 'This is a detail about Card 1. This is way more involved and much more detail to help with everything and clearance.',
      },
      {
        imageSrc: 'pholder2.png', // Replace with actual image paths
        title: 'Card 2',
        additionalDetails: 'This is a detail about Card 2. This is way more involved and much more detail to help with everything and clearance.',
      },
      {
        imageSrc: 'pholder3.png', // Replace with actual image paths
        title: 'Card 3',
        additionalDetails: 'This is a detail about Card 3. This is way more involved and much more detail to help with everything and clearance.',
      },
    ]
  });

  useEffect(() => {
    // Mock JSON data
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/cards/`); // Replace with your API endpoint
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };


    // Simulating an API call
    fetchData()
  }, []);

  // Handle input changes for cards
  const handleCardChange = (index, field, value) => {
    const newCards = [...heroData.cards];
    newCards[index][field] = value;
    setHeroData((prevData) => ({
      ...prevData,
      cards: newCards,
    }));
  };

  // Handle image upload
  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleCardChange(index, 'imageSrc', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new card
  const addCard = () => {
    setHeroData((prevData) => ({
      ...prevData,
      cards: [
        ...prevData.cards,
        {
          imageSrc: '', // Default empty
          title: '',
          additionalDetails: '',
        },
      ],
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Convert heroData to JSON string
      const payload = JSON.stringify(heroData);

      // Make the PATCH request
      const response = await fetch(`${apiUrl}/home/cards/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });

      if (response.ok) {
        alert('Updated Hero Data successfully!');
        window.location.reload()
        onClose(); // Close modal after saving
      } else {
        console.error('Failed to update Hero Data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Calculate overlay color with fixed opacity
  const overlayColorWithOpacity = (color) => {
    const rgba = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d\.]+)?\)/);
    if (rgba) {
      return `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, 0.8)`;
    }
    return color; // Return original color if not a valid rgba
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-2xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

        <h3 className="font-bold text-lg mb-4">Edit Cards Section</h3>

        <div className="mb-4">
          <label className="block mb-1">Heading:</label>
          <input
            type="text"
            value={heroData.heading}
            onChange={(e) => setHeroData({ ...heroData, heading: e.target.value })}
            className="input input-bordered w-full mb-2"
          />
        </div>

        {/* Background Color Picker */}
        <div className="mb-4">
          <label className="block mb-1">Background Color:</label>
          <div className="flex items-center hex">
            <HexColorPicker
              color={heroData.bgColor}
              onChange={(color) => setHeroData((prevData) => ({ ...prevData, bgColor: color }))}
              className="w-20 h-20" // Adjusted size
            />
            <input
              type="text"
              value={heroData.bgColor}
              onChange={(e) => setHeroData((prevData) => ({ ...prevData, bgColor: e.target.value }))}
              className="input input-bordered w-24 ml-2" // Adjusted size
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Main Text Color Picker */}
        <div className="mb-4">
          <label className="block mb-1">Text Color:</label>
          <div className="flex items-center hex">
            <HexColorPicker
              color={heroData.textColor}
              onChange={(color) => setHeroData((prevData) => ({ ...prevData, textColor: color }))}
              className="w-20 h-20" // Adjusted size
            />
            <input
              type="text"
              value={heroData.textColor}
              onChange={(e) => setHeroData((prevData) => ({ ...prevData, textColor: e.target.value }))}
              className="input input-bordered w-24 ml-2" // Adjusted size
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        {/* Overlay Color Picker */}
        <div className="mb-4">
          <label className="block mb-1">Overlay Color:</label>
          <div className="flex items-center hex">
            <HexColorPicker
              color={heroData.overlayColor}
              onChange={(color) => setHeroData((prevData) => ({
                ...prevData,
                overlayColor: overlayColorWithOpacity(color) // Update with fixed opacity
              }))}
              className="w-20 h-20" // Adjusted size
            />
            <input
              type="text"
              value={heroData.overlayColor}
              onChange={(e) => setHeroData((prevData) => ({
                ...prevData,
                overlayColor: overlayColorWithOpacity(e.target.value) // Ensure valid RGBA
              }))}
              className="input input-bordered w-24 ml-2" // Adjusted size
              placeholder="rgba(0, 0, 0, 0.8)"
            />
            <div
              className="w-24 h-10 ml-2"
              style={{ backgroundColor: overlayColorWithOpacity(heroData.overlayColor) }}
            ></div>
          </div>
        </div>

        {/* Overlay Text Color Picker */}
        <div className="mb-4">
          <label className="block mb-1">Overlay Text Color:</label>
          <div className="flex items-center hex">
            <HexColorPicker
              color={heroData.overlayTextColor}
              onChange={(color) => setHeroData((prevData) => ({ ...prevData, overlayTextColor: color }))}
              className="w-20 h-20" // Adjusted size
            />
            <input
              type="text"
              value={heroData.overlayTextColor}
              onChange={(e) => setHeroData((prevData) => ({ ...prevData, overlayTextColor: e.target.value }))}
              className="input input-bordered w-24 ml-2" // Adjusted size
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        {/* Cards Table */}
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {heroData.cards.map((card, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="input input-bordered w-full"
                  />
                  {card.imageSrc && (
                    <img src={card.imageSrc} alt="Card" className="mt-2 w-24 h-24 object-cover" />
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter card title"
                  />
                </td>
                <td>
                  <textarea
                    value={card.additionalDetails}
                    onChange={(e) => handleCardChange(index, 'additionalDetails', e.target.value)}
                    className="textarea textarea-bordered w-full"
                    rows={2}
                    placeholder="Enter additional details"
                  />
                </td>
                <td>
                  <button className="btn btn-error" onClick={() => handleCardChange(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-4" onClick={addCard}>Add Card</button>

        <div className="modal-action">
          <button className="btn" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </dialog>
  );
};

export default CardsModal;
