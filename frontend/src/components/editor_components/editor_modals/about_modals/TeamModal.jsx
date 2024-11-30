import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const API_URL = import.meta.env.VITE_API_URL; // Base URL from .env

const TeamModal = ({ isOpen, onClose }) => {
  const [team, setTeam] = useState({
    bgColor: '', // Default white color
    textColor: '', 
    teamInfo: { headings: { title: '', subheading: '' }, members: [] },
  });

  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/about/team`);
        const data = await response.json();

        if (data) {
          setTeam(data); // Directly set the team data, including teamInfo
        } else {
          console.error('Fetched data does not contain valid team info:', data);
        }
      } catch (error) {
        console.error('Error fetching team info:', error);
      }
    };

    if (isOpen) {
      fetchTeamInfo();
    }
  }, [isOpen]);

  const handleInputChange = (index, field, value) => {
    const updatedMembers = [...team.teamInfo.members];
    updatedMembers[index][field] = value;
    setTeam({ ...team, teamInfo: { ...team.teamInfo, members: updatedMembers } });
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedMembers = [...team.teamInfo.members];
      updatedMembers[index].imageUrl = reader.result;
      setTeam({ ...team, teamInfo: { ...team.teamInfo, members: updatedMembers } });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleHeadingsChange = (field, value) => {
    setTeam({ ...team, teamInfo: { ...team.teamInfo, headings: { ...team.teamInfo.headings, [field]: value } } });
  };

  const handleColorChange = (field, color) => {
    // Only update if the color is a valid hex
    
      setTeam({ ...team, [field]: color });
    
  };

  const handleNewMemberChange = (field, value) => {
    setNewMember({ ...newMember, [field]: value });
  };

  const addNewMember = () => {
    setTeam((prevState) => ({
      ...prevState,
      teamInfo: {
        ...prevState.teamInfo,
        members: [...prevState.teamInfo.members, newMember],
      },
    }));
    setNewMember({ name: '', position: '', imageUrl: '' }); // Reset new member fields
  };

  const removeMember = (index) => {
    const updatedMembers = [...team.teamInfo.members];
    updatedMembers.splice(index, 1);
    setTeam({ ...team, teamInfo: { ...team.teamInfo, members: updatedMembers } });
  };

  const handleSave = async () => {
    console.log(JSON.stringify(team)); // Log the entire team object

    try {
      const { bgColor, textColor, teamInfo } = team; // Destructure team details
      const response = await fetch(`${API_URL}/about/team/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bgColor, textColor, teamInfo }),
      });

      if (!response.ok) {
        throw new Error('Failed to save team info');
      }

      onClose(); // Close the modal on successful save
      window.location.reload();
    } catch (error) {
      console.error('Error saving team info:', error);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-2xl relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        <h3 className="font-bold text-lg mb-4">Team Members</h3>

        <div className="mb-4">
          <label className="block">Title:</label>
          <input
            type="text"
            value={team.teamInfo.headings.title}
            onChange={(e) => handleHeadingsChange('title', e.target.value)}
            className="input input-bordered w-full"
          />
          <label className="block mt-2">Subheading:</label>
          <input
            type="text"
            value={team.teamInfo.headings.subheading}
            onChange={(e) => handleHeadingsChange('subheading', e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block">Background Color:</label>
          <div className='hex flex items-center'>
            <HexColorPicker
              color={team.bgColor}
              onChange={(color) => handleColorChange('bgColor', color)}
            />
            <input
              type="text"
              value={team.bgColor}
              onChange={(e) => handleColorChange('bgColor', e.target.value)}
              className="input input-bordered w-1/2 ml-5 mt-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block">Text Color:</label>
          <div className='hex flex items-center'>
            <HexColorPicker
              color={team.textColor}
              onChange={(color) => handleColorChange('textColor', color)}
            />
            <input
              type="text"
              value={team.textColor}
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="input input-bordered w-1/2 ml-5 mt-2"
            />
          </div>
        </div>

        {team.teamInfo.members.length > 0 ? (
          <table className="table w-full mb-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {team.teamInfo.members.map((member, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      className="input input-bordered w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={member.position}
                      onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                      className="input input-bordered w-full"
                    />
                  </td>
                  <td>
                    {member.imageUrl && (
                      <img src={member.imageUrl} alt="Team Member" className="h-40 w-full mb-2" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                      className="input input-bordered w-full mb-2"
                    />
                  </td>
                  <td>
                    <button className="btn btn-error" onClick={() => removeMember(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No team members found.</p>
        )}

        {/* New Member Form */}
        <div className="mb-4">
          <h4 className="font-bold mt-4">Add New Member</h4>
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => handleNewMemberChange('name', e.target.value)}
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            placeholder="Position"
            value={newMember.position}
            onChange={(e) => handleNewMemberChange('position', e.target.value)}
            className="input input-bordered w-full mb-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setNewMember((prev) => ({ ...prev, imageUrl: reader.result }));
              };
              if (file) reader.readAsDataURL(file);
            }}
            className="input input-bordered w-full mb-2"
          />
          <button className="btn" onClick={addNewMember}>Add Member</button>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </dialog>
  );
};

export default TeamModal;
