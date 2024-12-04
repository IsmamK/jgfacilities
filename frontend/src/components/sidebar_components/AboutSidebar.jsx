import React from 'react';
import { FaInfoCircle, FaUsers, FaQuestionCircle, FaBuilding,FaAddressCard } from 'react-icons/fa';

const AboutSidebar = ({individual} ) => {
  return (
    <div className=" lg:block fixed top-64 -right-20 h-full text-white w-64 z-20">
      <div className="flex flex-col items-center pt-8 space-y-6 pl-4">
        {/* About Us */}
        <a
          href={individual?'/about/company-profile':'/about#about1'}
          className="group flex items-center justify-center space-x-4 p-2 lg:p-4 w-10 h-10 lg:w-12 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20 hover:py-10"
        >
          <FaBuilding className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">About Us</span>
        </a>

        <a
           href={individual?'/about/message':"/about#message"}
          className="group flex items-center justify-center space-x-4 p-2 lg:p-4 w-10 h-10 lg:w-12 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20 hover:py-10"
        >
          <FaAddressCard className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Chairman's Message</span>
        </a>

        {/* Who We Are */}
        <a
          href={individual?'/about/story':'/about#about2'}
          className="group flex items-center justify-center space-x-4 p-2 lg:p-4 w-10 h-10 lg:w-12 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20 hover:py-10"
        >
          <FaInfoCircle className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Mission, Vision & Story</span>
        </a>

        {/* Our Team */}
        <a
          href={individual?'/about/team':'/about#team'}
          className="group flex items-center justify-center space-x-4 p-2 lg:p-4 w-10 h-10 lg:w-12 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20 hover:py-10"
        >
          <FaUsers className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Our Team</span>
        </a>

      
      </div>
    </div>
  );
};

export default AboutSidebar;
