import { useState } from 'react';
import { dividers } from '../config/dividerConfig';

const useDividers = (initialDivider = 'triangle', initialColor = 'black') => {
  const [currentDivider, setCurrentDivider] = useState(initialDivider);
  const [isBlack, setIsBlack] = useState(initialColor === 'black');

  const getDivider = () => {
    const color = isBlack ? 'black' : 'white';
    return dividers[currentDivider][color];
  };

  // Toggle between black and white
  const toggleColor = () => {
    setIsBlack((prev) => !prev);
  };

  return { getDivider, setCurrentDivider, toggleColor };
};

export default useDividers;
