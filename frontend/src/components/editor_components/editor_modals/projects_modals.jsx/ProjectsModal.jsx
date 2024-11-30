import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ProjectsModal = ({ isOpen, onClose }) => {
  const API_URL = import.meta.env.VITE_API_URL; // Get API URL from environment variables
  const [projectData, setProjectData] = useState({
    title: '',
    subheading: '',
    bgColor: 'white',
    textColor: 'black',
    items: [],
  });
  const [newProjectColor, setNewProjectColor] = useState('#ffffff'); // Default background color
  const [newTextColor, setNewTextColor] = useState('#000000'); // Default text color

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`${API_URL}/projects/`); // Fetch projects data
      const data = await response.json();
      setProjectData(data);
      setNewProjectColor(data.bgColor); // Set color from fetched data
      setNewTextColor(data.textColor); // Set text color from fetched data
    };

    if (isOpen) {
      fetchProjects(); // Fetch projects when modal is open
    }
  }, [isOpen, API_URL]);

  const handleProjectChange = (field, value) => {
    setProjectData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleItemChange = (id, field, value) => {
    setProjectData((prevData) => ({
      ...prevData,
      items: prevData.items.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const handleImageUpload = async (id, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProjectData((prevData) => ({
        ...prevData,
        items: prevData.items.map((proj) =>
          proj.id === id ? { ...proj, imageUrl: reader.result } : proj
        ),
      }));
    };

    if (file) {
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const handleSaveAll = async () => {
    const response = await fetch(`${API_URL}/projects/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        title: projectData.title,
        subheading: projectData.subheading,
        bgColor: newProjectColor, // Send the selected background color
        textColor: newTextColor, // Send the selected text color
        items: projectData.items,
      }),
    });

    if (response.ok) {
      await response.json();
      onClose(); // Close modal after saving
      window.location.reload()
    } else {
      console.error('Error updating projects:', await response.text());
    }
  };

  const handleAdd = () => {
    const newProject = {
      id: projectData.items.length + 1,
      title: 'New Project',
      description: 'New project description goes here.',
      imageUrl: 'https://via.placeholder.com/150',
      link: '#', // Set default link
    };
    setProjectData((prevData) => ({
      ...prevData,
      items: [...prevData.items, newProject],
    }));
  };

  const handleRemove = (id) => {
    setProjectData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((proj) => proj.id !== id),
    }));
  };

  return (
    <dialog id="projects_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-5xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Projects</h3>

        {/* Input fields for title and subheading */}
       
        <div className="mb-4">
          
        <label className="label">
        <span className="label-text">Title</span>
        </label>
            <input
              type="text"
              value={projectData.title}
              onChange={(e) => handleProjectChange('title', e.target.value)}
              className="input input-bordered"
              placeholder="Project Title"
            />
      
          <label className="label">
            <span className="label-text">Subheading</span>
            </label>
            <input
              type="text"
              value={projectData.subheading}
              onChange={(e) => handleProjectChange('subheading', e.target.value)}
              className="input input-bordered  text-wrap"
              placeholder="Project Subheading"
            />
         
        </div>

                {/* HEX Color Picker for background and text color */}
                <label className="label">
            <span className="label-text">Background Color</span>
            </label>
                <div className="flex hex items-center mt-4">
         
            <HexColorPicker color={newProjectColor} onChange={setNewProjectColor} />
            <input 
              type="text" 
              value={newProjectColor} 
              onChange={(e) => setNewProjectColor(e.target.value)}
              className="input input-bordered ml-2 w-24"

            />
      
        </div>

        <label className="label">
            <span className="label-text">Text Color</span>
            </label>
        <div className="flex hex items-center mt-4">
      
            <HexColorPicker color={newTextColor} onChange={setNewTextColor} />
            <input 
              type="text" 
              value={newTextColor} 
              onChange={(e) => setNewTextColor(e.target.value)}
              className="input input-bordered ml-2 w-24" 
            />
         
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 w-1/4">Image</th>
              <th className="border p-2 w-1/4">Title</th>
              <th className="border p-2 w-1/2">Description</th>
              <th className="border p-2 w-1/4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectData.items.map((project) => (
              <tr key={project.id}>
                <td className="border p-2 text-center">
                  <img src={project.imageUrl} alt={project.title} className="w-40 h-40 object-cover mb-2" />
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(project.id, e)}
                    className="file-input file-input-bordered w-full"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleItemChange(project.id, 'title', e.target.value)}
                    className="input input-bordered w-full"
                  />
                </td>
                <td className="border p-2 text-center">
                  <textarea
                    value={project.description}
                    onChange={(e) => handleItemChange(project.id, 'description', e.target.value)}
                    className="textarea textarea-bordered w-full"
                  />
                </td>
              
                <td className="border p-2 text-center">
                  <button className="btn btn-outline btn-error" onClick={() => handleRemove(project.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button className="btn btn-accent" onClick={handleAdd}>Add New Project</button>
          <button className="btn btn-primary" onClick={handleSaveAll}>Save All</button>
        </div>


      </div>
    </dialog>
  );
};

export default ProjectsModal;
