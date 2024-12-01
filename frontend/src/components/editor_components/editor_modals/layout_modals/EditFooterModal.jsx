import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const EditFooterModal = ({ isOpen, onClose, footerData, setFooterData }) => {
  const apiUrl = import.meta.env.VITE_API_URL; // Adjust as needed
  const [newFooterData, setNewFooterData] = useState({
    bgColor: footerData?.bgColor || '#000000',
    textColor: footerData?.textColor || '#FFFFFF',
    copyText: footerData?.copyText || '2024 Blockchain Technologies Ltd. All Rights Reserved.',
    socials: footerData?.socials || []
  });

  // Fetch footer data on mount if necessary
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(`${apiUrl}/layout/footer/`);
        const data = await response.json();
        setNewFooterData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    if (isOpen) fetchFooterData();
  }, [isOpen, apiUrl]);

  // Convert image to Base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle save and patch request
  const handleSave = async () => {
    try {
      const updatedFooterData = { ...newFooterData };

      // Convert icons to base64 if uploaded
      const updatedSocials = await Promise.all(
        updatedFooterData.socials.map(async (social) => {
          if (social.icon && typeof social.icon === 'object') {
            const base64Icon = await convertImageToBase64(social.icon);
            return { ...social, icon: base64Icon };
          }
          return social;
        })
      );

      updatedFooterData.socials = updatedSocials;

      const response = await fetch(`${apiUrl}/layout/footer/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFooterData),
      });

      if (response.ok) {
        setFooterData(updatedFooterData); // Update parent component's footer data
        onClose(); // Close the modal
      } else {
        console.error("Error updating footer data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving footer data:", error);
    }
  };

  const handleSocialChange = (index, field, value) => {
    const updatedSocials = [...newFooterData.socials];
    updatedSocials[index] = { ...updatedSocials[index], [field]: value };
    setNewFooterData({ ...newFooterData, socials: updatedSocials });
  };

  // Handle icon upload
  const handleIconUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      handleSocialChange(index, 'icon', file);
    }
  };

  // Remove social media entry
  const handleRemoveSocial = (index) => {
    const updatedSocials = newFooterData.socials.filter((_, i) => i !== index);
    setNewFooterData({ ...newFooterData, socials: updatedSocials });
  };

  // Add a new social media entry
  const handleAddSocial = () => {
    const updatedSocials = [...newFooterData.socials, { link: '', icon: null }];
    setNewFooterData({ ...newFooterData, socials: updatedSocials });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Footer</h2>

        {/* Background Color Picker */}
        <div className="mb-4">
          <label htmlFor="bgColor" className="block">Background Color</label>
          <div className="hex flex items-center">
            <HexColorPicker
              color={newFooterData.bgColor}
              onChange={(color) => setNewFooterData({ ...newFooterData, bgColor: color })}
            />
            <input
              type="text"
              id="bgColor"
              className="border p-2 ml-2 w-20"
              value={newFooterData.bgColor}
              onChange={(e) => setNewFooterData({ ...newFooterData, bgColor: e.target.value })}
            />
          </div>
        </div>

        {/* Text Color Picker */}
        <div className="mb-4">
          <label htmlFor="textColor" className="block">Text Color</label>
          <div className="hex flex items-center">
            <HexColorPicker
              color={newFooterData.textColor}
              onChange={(color) => setNewFooterData({ ...newFooterData, textColor: color })}
            />
            <input
              type="text"
              id="textColor"
              className="border p-2 ml-2 w-20"
              value={newFooterData.textColor}
              onChange={(e) => setNewFooterData({ ...newFooterData, textColor: e.target.value })}
            />
          </div>
        </div>

        {/* Footer Copy Text */}
        <div className="mb-4">
          <label htmlFor="copyText" className="block">Footer Text</label>
          <textarea
            id="copyText"
            className="border p-2 w-full"
            value={newFooterData.copyText}
            onChange={(e) => setNewFooterData({ ...newFooterData, copyText: e.target.value })}
          />
        </div>

        {/* Socials Input */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Social Media Links</h3>
          {newFooterData.socials.map((social, index) => (
            <div key={index} className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="border p-2 w-2/3"
                  placeholder="Social Link"
                  value={social.link}
                  onChange={(e) => handleSocialChange(index, 'link', e.target.value)}
                />
                <input
                  type="file"
                  className="border p-2"
                  accept="image/*"
                  onChange={(e) => handleIconUpload(index, e)}
                />
                {social.icon && typeof social.icon === 'object' && (
                  <div>
                    <img
                      src={URL.createObjectURL(social.icon)}
                      alt="Icon Preview"
                      className="w-8 h-8"
                    />
                  </div>
                )}
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveSocial(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 mt-2"
            onClick={handleAddSocial}
          >
            Add Social Media Link
          </button>
        </div>

        <div className="flex justify-between">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditFooterModal;
