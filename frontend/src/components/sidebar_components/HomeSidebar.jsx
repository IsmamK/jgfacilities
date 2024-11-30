import React from 'react';
import { FaHome, FaToolbox, FaInfoCircle, FaUserFriends, FaNewspaper, FaMapMarkerAlt, FaPhoneAlt, FaChartBar } from 'react-icons/fa';

const HomeSidebar = () => {
  return (
    <div className="hidden lg:block fixed top-50 -right-20 h-full text-white w-64 z-20">
      <div className="flex flex-col items-center pt-8 space-y-6 pl-4">
        {/* Home */}
        <a
          href="#hero"
          className="group flex items-center justify-center space-x-4 p-4 w-16 h-16 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20"
        >
          <FaHome className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Home</span>
        </a>

        {/* Services */}
        <a
          href="#services"
          className="group flex items-center justify-center space-x-4 p-4 w-16 h-16 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20"
        >
          <FaToolbox className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Services</span>
        </a>

        {/* Why Us */}
        <a
          href="#why-us"
          className="group flex items-center justify-center space-x-4 p-4 w-16 h-16 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20"
        >
          <FaInfoCircle className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Why Us</span>
        </a>

        {/* Clients */}
        <a
          href="#our-clients"
          className="group flex items-center justify-center space-x-4 p-4 w-16 h-16 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20"
        >
          <FaUserFriends className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Clients</span>
        </a>

        {/* News */}
        <a
          href="#news"
          className="group flex items-center justify-center space-x-4 p-4 w-16 h-16 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20"
        >
          <FaNewspaper className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">News</span>
        </a>

        {/* Contact */}
        <a
          href="#contact"
          className="group flex items-center justify-center space-x-4 p-4 w-16 h-16 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20"
        >
          <FaPhoneAlt className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Contact</span>
        </a>

        {/* Statistics */}
        <a
          href="#statistics"
          className="group flex items-center justify-center space-x-4 p-4 w-16 h-16 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20"
        >
          <FaChartBar className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Statistics</span>
        </a>

        {/* Location */}
        <a
          href="#location"
          className="group flex items-center justify-center space-x-4 p-4 w-16 h-16 bg-gray-800 rounded-full transition-all duration-300 ease-in-out transform hover:w-48 hover:rounded-lg hover:bg-gray-700 hover:pr-20"
        >
          <FaMapMarkerAlt className="text-xl group-hover:mr-4 transition-all duration-300" />
          <span className="hidden group-hover:inline text-sm">Location</span>
        </a>
      </div>
    </div>
  );
};

export default HomeSidebar;
