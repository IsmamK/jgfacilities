import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WhyUs = () => {
  const [whyUsData, setWhyUsData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch data from the API
    axios.get(`${apiUrl}/home/why-us`)
      .then(response => {
        setWhyUsData(response.data); // Assume response.data has the necessary structure
      })
      .catch(error => {
        console.error("Error fetching Why Us data:", error);
      });
  }, []);

  // Early return if data hasn't loaded yet
  if (!whyUsData) {
    return <p>Loading...</p>;
  }

  const { title, subtitle, bgColor, textColor, divider, features } = whyUsData;

  return (
    <div
      className="relative"
      style={{ backgroundColor: bgColor, color: textColor }}
    >

      <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* Section title and subtitle */}
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-4xl font-bold md:mb-6 lg:text-7xl">{title}</h2>
            <p className="mx-auto max-w-screen-md text-center md:text-lg">{subtitle}</p>
          </div>

          {/* Features grid */}
          <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3 xl:gap-16">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center animate-on-scroll rotate-in">
                <div className="mb-2 flex h-12 w-12 items-center justify-center sm:mb-4 md:h-14 md:w-14 relative">
                  <img src={feature.iconUrl} alt={`${feature.title} icon`} className="h-full w-full object-contain  "  loading="lazy"/>
                  {/* <div class="absolute inset-0 bg-black opacity-50"></div> */}
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold md:text-xl">{feature.title}</h3>
                <p className="mb-2 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
