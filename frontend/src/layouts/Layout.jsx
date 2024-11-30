import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout_components/Navbar';
import Footer from '../components/layout_components/Footer';
import LanguageSelector from '../components/LanguageSelector';

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

const Layout = () => {
  const colorIndexRef = useRef({ layerWave: 1, 
    triangle: 0,
    book:1,
    curve:1,
    arrow:1,
    split:1,
    tilt:1,
  }); // Ref to maintain color index for each shape

  // Dynamically load available shapes based on what's in the dividers object
  const availableShapes = Object.keys(dividers);

  // Function to get the divider based on shape and automatically alternate colors
  const getDivider = (shape) => {
    if (!dividers[shape]) {
      console.error(`Shape ${shape} not found in dividers!`);
      return null;
    }

    const currentIndex = colorIndexRef.current[shape] % 2; // 0 for black, 1 for white
    const color = currentIndex === 0 ? 'black' : 'white';
    colorIndexRef.current[shape] += 1; // Update index for next call

    return dividers[shape][color];
  };

  return (
    <>
    
      <Navbar />
      {/* <LanguageSelector /> */}
      <Outlet context={{ getDivider, availableShapes }} />
      <Footer divider={getDivider('triangle')} bgColor={'black'} textColor={'white'}/>
    </>
  );
};

export default Layout;
