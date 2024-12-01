import React, { useEffect, useState } from "react";
const Hero = () => {
  // State to hold the hero data
  const [heroData, setHeroData] = useState({
    title: "",
    bgColor: "",
    textColor: "",
    description: "",
    image1: "",
    image2: "",
    altText1: "",
    altText2: "",
    contactLink: "",
    contactText: "",
    ctaLink: "",
    ctaText: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  
  // Fetch data from the API
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/hero`);
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);

  // Return a loading indicator if data is not yet fetched
  if (!heroData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center text-center p-8 md:p-16 lg:p-24"
      style={{
        backgroundColor: heroData.bgColor,
        color: heroData.textColor,
      }}
    >
      

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-12">
        {/* Left Section: Text */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start gap-6 animate-on-scroll slide-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            {heroData.title}
          </h1>
          <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            {heroData.description}
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href={heroData.contactLink}
              className="px-6 py-3 text-lg font-medium rounded-md shadow-lg transition-transform transform hover:scale-105"
              style={{
                backgroundColor: heroData.textColor,
                color: heroData.bgColor,
              }}
            >
              {heroData.contactText}
            </a>
            <a
              href={heroData.ctaLink}
              className="px-6 py-3 text-lg font-medium rounded-md shadow-lg border border-current transition-transform transform hover:scale-105"
              style={{
                color: heroData.textColor,
              }}
            >
              {heroData.ctaText}
            </a>
          </div>
        </div>

        {/* Right Section: Images */}
        <div className="lg:w-1/2 relative flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-6">
          <div className="animate-on-scroll slide-up relative w-60 h-60 lg:w-72 lg:h-72 md:w-96 md:h-96 overflow-hidden rounded-xl shadow-xl transform hover:rotate-1 hover:scale-105 transition-transform">
            <img
              src={heroData.image1}
              alt={heroData.altText1}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="animate-on-scroll slide-down relative w-60 h-60 md:w-80 md:h-80 overflow-hidden rounded-xl shadow-xl transform hover:-rotate-1 hover:scale-105 transition-transform -mt-8">
            <img
              src={heroData.image2}
              alt={heroData.altText2}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
