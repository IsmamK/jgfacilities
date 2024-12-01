import React, { useState, useEffect } from 'react';

const Statistics = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    heading: '',
    subtitle: '',
    bgColor: '',
    textColor: '',
    stats: [],
    numbersBgColor: '',
    numbersTextColor: '',
  });

    
  useEffect(() => {
    // Mock JSON data
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/statistics`); // Replace with your API endpoint
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching  data:", error);
      }
    };


    // Simulating an API call
    fetchData()
  }, []);

  return (
    <div
      className='relative py-16'
      style={{ backgroundColor: data.bgColor, color: data.textColor }}
    >
      <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          {/* Text - start */}
          <div className="mb-8 md:mb-12">
            <h2 className="mb-4 text-center text-4xl font-bold" style={{ color: data.textColor }}>
              {data.heading}
            </h2>
            <p className="mx-auto max-w-screen-md text-center md:text-lg" style={{ color: data.textColor }}>
              {data.subtitle}
            </p>
          </div>
          {/* Text - end */}

          <div
            className="grid grid-cols-2 gap-6 rounded-lg p-6 md:grid-cols-4 md:gap-8 md:p-8 animate-on-scroll fade-in"
            style={{ backgroundColor: data.numbersBgColor }}
          >
            {/* Dynamically generated stats */}
            {data.stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center ">
                <div
                  className="text-xl font-bold sm:text-2xl md:text-3xl"
                  style={{ color: data.numbersTextColor }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm sm:text-base"
                  style={{ color: data.numbersTextColor }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
