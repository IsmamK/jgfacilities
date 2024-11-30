import React, { useState,useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const NewsModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    "title":"",
    "subtitle":"",
    "news":[ ]

});

useEffect(()=>{
  fetch(`${apiUrl}/home/news`)
  .then(res=>res.json())
  .then(data=>setData(data))
 
},[])

  const [newArticle, setNewArticle] = useState({ title: '', description: '', action: '', image: '' });

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleColorChange = (colorField, value) => {
    setData({
      ...data,
      [colorField]: value
    });
  };

  const handleArticleChange = (index, field, value) => {
    const updatedNews = [...data.news];
    updatedNews[index][field] = value;
    setData({ ...data, news: updatedNews });
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleArticleChange(index, 'image', reader.result); // Get only the base64 data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddArticle = () => {
    const updatedData = { ...data, news: [...data.news, newArticle] };
    setData(updatedData);
    setNewArticle({ title: '', description: '', action: '', image: '' });
  };

  const handleRemoveArticle = (index) => {
    const updatedNews = data.news.filter((_, i) => i !== index);
    setData({ ...data, news: updatedNews });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/home/news/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert('News updated successfully!');
        window.location.reload()

      } else {
        alert('Failed to update news.');
      }
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Error updating news.');
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-4xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        
        <h3 className="font-bold text-lg mb-4">Manage News Section</h3>

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

        <div className="mb-4">
          <label className="block mb-1">Subtitle</label>
          <textarea
            value={data.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Subtitle"
          />
        </div>

        {/* Color Pickers */}
        <div className="mb-4">
          <label className="block mb-2">Background Color</label>
          <div className="flex hex items-center">
            <HexColorPicker
              color={data.bgColor}
              onChange={(color) => handleColorChange('bgColor', color)}
              className="w-10 h-10"
            />
            <input
              type="text"
              value={data.bgColor}
              onChange={(e) => handleColorChange('bgColor', e.target.value)}
              className="input input-bordered w-20 ml-2"
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Text Color</label>
          <div className="flex hex items-center">
            <HexColorPicker
              color={data.textColor}
              onChange={(color) => handleColorChange('textColor', color)}
              className="w-10 h-10"
            />
            <input
              type="text"
              value={data.textColor}
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="input input-bordered w-20 ml-2"
              placeholder="#ffffff"
            />
          </div>
        </div>

        {/* Articles Table */}
        <h4 className="font-bold text-lg mb-2">Articles</h4>
        <table className="table w-full mb-4">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.news.map((article, index) => (
              <tr key={index}>
                <td>
                  <img src={article.image} alt="Article Image" className="h-24 w-24 object-cover mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="file-input file-input-bordered w-full"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={article.title}
                    onChange={(e) => handleArticleChange(index, 'title', e.target.value)}
                    className="input input-bordered w-full"
                  />
                </td>
                <td>
                  <textarea
                    value={article.description}
                    onChange={(e) => handleArticleChange(index, 'description', e.target.value)}
                    className="textarea textarea-bordered w-full"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={article.action}
                    onChange={(e) => handleArticleChange(index, 'action', e.target.value)}
                    className="input input-bordered w-full"
                  />
                </td>
                <td>
                  <button onClick={() => handleRemoveArticle(index)} className="btn btn-error">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Article */}
        <h4 className="font-bold text-lg mb-2">Add New Article</h4>
        <div className="mb-4">
          <input
            type="text"
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            className="input input-bordered w-full mb-2"
            placeholder="Article Title"
          />
          <textarea
            value={newArticle.description}
            onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
            className="textarea textarea-bordered w-full mb-2"
            placeholder="Summary"
          />
          <input
            type="text"
            value={newArticle.action}
            onChange={(e) => setNewArticle({ ...newArticle, action: e.target.value })}
            className="input input-bordered w-full mb-2"
            placeholder="Action"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(-1, e)} // -1 for new article
            className="file-input file-input-bordered w-full mb-2"
          />
          <button onClick={handleAddArticle} className="btn btn-primary w-full">Add Article</button>
        </div>

        {/* Submit Button */}
        <div className="modal-action">
          <button onClick={handleSubmit} className="btn btn-success">Save Changes</button>
        </div>
      </div>
    </dialog>
  );
};

export default NewsModal;
