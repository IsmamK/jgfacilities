import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselComponent = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [images, setImages] = useState([]);

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
    speed: 1000, // Transition speed
    autoplay: true, // Enable auto-slide
    autoplaySpeed: 1000, // Interval between auto-slides (in ms)
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    pauseOnHover: true,

    
  };

  return (
    <div className="slider-container h-48 lg:h-[450px] items-center overflow-hidden">
      <Slider {...settings}>
        {/* Map over the images array to create img elements */}
        {images.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Carousel image ${index + 1}`} className=" object-center  h-48 lg:h-[450px] w-full " />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
