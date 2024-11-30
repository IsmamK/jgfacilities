import React, { useState, useEffect } from 'react';

const CarouselModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  // Initial state with predefined images
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch the data from the API
    const fetchImages = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/carousel`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data); // Update the images state
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [apiUrl]);

  // Helper function to convert file to Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // Resolve with Base64 string
      reader.onerror = (error) => reject(error); // Reject on error
      reader.readAsDataURL(file); // Read file as Data URL (Base64)
    });
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    try {
      // Convert each file to Base64
      const base64Images = await Promise.all(files.map(fileToBase64));
      setImages((prevImages) => [...prevImages, ...base64Images]);
    } catch (error) {
      console.error('Error converting files to Base64:', error);
    }
  };

  // Handle removing an image
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Prepare the data to be sent to the server
      const response = await fetch(`${apiUrl}/home/carousel/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images }), // Send the Base64 images array
      });

      if (!response.ok) {
        throw new Error('Failed to update images');
      }

      const result = await response.json();
      alert('Updated Carousel Images:', result);
      window.location.reload()

      
    } catch (error) {
      console.error('Error updating images:', error);
    }

    onClose(); // Close modal after saving
    // window.location.reload()
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-2xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

        <h3 className="font-bold text-lg mb-4">Edit Carousel Images</h3>

        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            className="input input-bordered w-full mb-1"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Carousel Image ${index + 1}`} className="w-full h-auto rounded-md" />
              <button
                className="btn btn-circle btn-error absolute top-2 right-2"
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </dialog>
  );
};

export default CarouselModal;
