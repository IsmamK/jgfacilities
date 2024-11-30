import React, { useState, useEffect } from 'react';

const Services = () => {
  const [data, setData] = useState({
    bgColor: '',
    textColor: '',
    cardBgColor: '',
    cardTextColor: '',
    iconColor: '',
    title: '',
    description: '',
    services: []
  }
  );

  // Single content object containing text and styles
  const apiUrl = import.meta.env.VITE_API_URL;

  
  useEffect(() => {
    // Mock JSON data
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/services`); // Replace with your API endpoint
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching  data:", error);
      }
    };


    // Simulating an API call
    fetchData()
  }, []);
 

  if (!data) return <div>Loading...</div>; // Loading state

  return (
    <div className="relative " >
      <img src={data.divider || ''} className="absolute top-0 z-100"  />

      <div className={`py-6 sm:py-8 lg:py-12`} 
       style={{ backgroundColor: data.bgColor,color:data.textColor}}      

      >
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* Text - start */}
          <div className="mb-10 md:mb-16">
            <h2 className={`mb-4 text-center text-4xl font-bold md:mb-6 lg:text-7xl`}>
              {data.title}
            </h2>
            <p className={`mx-auto max-w-screen-md text-center md:text-lg`}>
              {data.description}
            </p>
          </div>
          {/* Text - end */}

          <div className="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
            {data.services.map((service, index) => (
              <div
                key={index}
                className={`flex divide-x rounded-lg border animate-on-scroll jelly`}
            style={{ backgroundColor: data.cardBgColor,color:data.cardTextColor }}      
              >
                <div className={`flex items-center p-2 md:p-4`} style={{color:data.iconColor}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className={`mb-2 text-lg font-semibold md:text-xl `}>
                    {service.title}
                  </h3>
                  <p className={``}>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
