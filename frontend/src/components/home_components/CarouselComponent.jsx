import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useScrollAnimation from '../../useScrollAnimation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Optional, if you want icons for the buttons

const CarouselComponent = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [images, setImages] = useState([]);
  const sliderRef = useRef(null); // Create a reference to the slider

  useScrollAnimation();

  useEffect(() => {
    // Fetch the data from the API
    const fetchImages = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/carousel`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data); // Update the images state
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  // Settings for React Slick
  const settings = {
    dots: true, // Show dots below the carousel
    dotsClass: "slick-dots slick-thumb",
    fade: true,
    infinite: true, // Loop the carousel
    speed: 500, // Transition speed
    autoplay: true, // Enable auto-slide
    autoplaySpeed: 3000, // Interval between auto-slides (in ms)
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    pauseOnHover: true,
  };

  return (
    <div className="slider-container h-48 lg:h-[450px] items-center overflow-hidden relative">
      {/* Custom Previous Button */}
      <button 
        className="absolute left-[30%] bottom-4 z-10 transform -translate-x-1/2 bg-white p-2 rounded-full"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <FaArrowLeft color="#333" className='text-xl lg:text-3xl '/>
      </button>

      {/* Custom Next Button */}
      <button 
        className="absolute right-[30%] bottom-4 z-10 transform -translate-x-1/2 bg-white p-2 rounded-full"
        onClick={() => sliderRef.current.slickNext()}
      >
        <FaArrowRight className='text-xl lg:text-3xl' color="#333" />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {/* Map over the images array to create img elements */}
        {images.map((src, index) => (
          <div key={index}>
            <img 
              src={src} 
              alt={`Carousel image ${index + 1}`} 
              className="object-center h-48 lg:h-[450px] w-full" 
              loading="lazy" 
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
