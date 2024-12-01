import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { FaTachometerAlt, FaWarehouse, FaTruck, FaStore, FaFileInvoice, FaChartPie, FaUserShield, FaTimes , FaBox} from 'react-icons/fa'; // Import icons
import { useAuth } from '../../context/AuthContext';
const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth(); 

  return (
    <div
      className={`z-10 dark:text-white fixed dark:bg-blue-800 lg:relative lg:translate-x-0 flex flex-col p-10 dark:border-black border-r border-gray-50 min-h-screen bg-white transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } overflow-y-auto`} // Added `overflow-y-auto` here
    > 

      {/* Close button for smaller screens */}
      <div className="lg:hidden mb-4 relative -left-4 -top-4">
        <button onClick={toggleSidebar} className="btn btn-ghost">
          Close
          <FaTimes className="text-xl" />
        </button>
      </div>
  
      <h1 className='font-extrabold text-lg md:text-4xl mb-10 pb-10 border-b border-gray-300 '>Dynamic Website Editor</h1>
      <ul className='flex flex-col gap-8 text-xs md:text-sm mb-3'>
        <li>

          <NavLink
            to="layouts" // Update this to your dashboard route
            className={({ isActive }) =>
              `flex items-center rounded-lg font-bold p-2 ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white'}`
            }
          >
            <FaTachometerAlt className='mr-2' /> Layouts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="home" // Update this to your warehouse route
            className={({ isActive }) =>
              `flex items-center rounded-lg font-bold p-2 ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white'}`
            }
          >
            <FaWarehouse className='mr-2' /> Home 
          </NavLink>
        </li>
        <li>
          <NavLink
            to="about" // Update this to your products route
            className={({ isActive }) =>
              `flex items-center rounded-lg font-bold p-2 ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white'}`
            }
          >
            <FaBox className='mr-2' /> About 
          </NavLink>
        </li>

        <li>
          <NavLink
            to="services" // Update this to your products route
            className={({ isActive }) =>
              `flex items-center rounded-lg font-bold p-2 ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white'}`
            }
          >
            <FaBox className='mr-2' /> Services 
          </NavLink>
        </li>


        <li>
          <NavLink
            to="projects" // Update this to your stores route
            className={({ isActive }) =>
              `flex items-center rounded-lg font-bold p-2 ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white'}`
            }
          >
            <FaStore className='mr-2' /> Projects
          </NavLink>
        </li>

        <li>
          <NavLink
            to="gallery" // Update this to your delivery route
            className={({ isActive }) =>
              `flex items-center rounded-lg font-bold p-2 ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white'}`
            }
          >
            <FaTruck className='mr-2' /> Gallery
          </NavLink>
        </li>
        <li>
          <NavLink
            to="contact" // Update this to your invoices route
            className={({ isActive }) =>
              `flex items-center rounded-lg font-bold p-2 ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white'}`
            }
          >
            <FaFileInvoice className='mr-2' /> Contact
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/" // Update this to your products route
            className={({ isActive }) =>
              `flex items-center rounded-lg font-bold p-2 ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white'}`
            }
          >
            <FaBox className='mr-2' /> Visit Live Website 
          </NavLink>
        </li>

        <li>
          <NavLink
            to="create-admin" // Update this to your products route
            className={({ isActive }) =>
              `flex items-center rounded-lg font-bold p-2 ${isActive ? 'bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white'}`
            }
          >
            <FaBox className='mr-2' /> Create Admin
          </NavLink>
        </li>
       
      </ul>
      <div className="flex mt-20 justify-between items-center border-t border-gray-300 pt-8">
        <button className="btn btn-md dark:bg-warning text-black btn-warning" onClick={logout}>Log Out</button>
        
      </div>
    </div>
  );
};

export default AdminSidebar;
