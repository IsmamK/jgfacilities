import React, { useState, useRef  } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/layout_components/AdminNavbar';
import AdminSidebar from '../components/layout_components/AdminSideBar';
// import AdminContentLayout from './HomeEditor';


const dividers = {
    'layerWave': { black: "dividers/layerWaves-black.svg", white: 'dividers/layerWaves-white.svg' },
    'triangle': { black: 'dividers/triangle-black.svg', white: 'dividers/triangle-white.svg' },
    'book': { black: 'dividers/book-black.svg', white: 'dividers/book-white.svg' },
    'curve': { black: 'dividers/curve-black.svg', white: 'dividers/curve-white.svg' },
    'arrow': { black: 'dividers/arrow-black.svg', white: 'dividers/arrow-white.svg' },
    'split': { black: 'dividers/split-black.svg', white: 'dividers/split-white.svg' },
    'tilt': { black: 'dividers/tilt-black.svg', white: 'dividers/tilt-white.svg' },
  
  
  
  
    // Add more shapes as needed
  };

  const AdminLayout = () => {
    const colorIndexRef = useRef({
      layerWave: 1,
      triangle: 0,
      book: 1,
      curve: 1,
      arrow: 1,
      split: 1,
      tilt: 1,
    });
  
    const availableShapes = Object.keys(dividers);
  
    const getDivider = (shape) => {
      if (!dividers[shape]) {
        console.error(`Shape ${shape} not found in dividers!`);
        return null;
      }
      const currentIndex = colorIndexRef.current[shape] % 2; // 0 for black, 1 for white
      const color = currentIndex === 0 ? 'black' : 'white';
      colorIndexRef.current[shape] += 1;
      return dividers[shape][color];
    };
  
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const handleSidebarToggle = () => {
      setIsSidebarOpen((prevState) => !prevState);
    };
  
    return (
      <div className='flex min-h-screen m-0 dark:bg-black'>
        <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />
        <div className='flex-grow dark:bg-black'>
          <AdminNavbar toggleSidebar={handleSidebarToggle} />
          <Outlet context={{ getDivider, availableShapes }} />
          </div>
      </div>
    );
  };
  
  export default AdminLayout;

