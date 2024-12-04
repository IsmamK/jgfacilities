import React, { useEffect, useState } from 'react';
import Slider from 'react-infinite-logo-slider';
import axios from 'axios';

const OurClients = () => {
  const [clientsData, setClientsData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/home/our-clients`);
        setClientsData(response.data); // Assuming the response data matches the expected format
      } catch (error) {
        console.error('Error fetching clients data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  // If the data is still loading, return a loading state
  if (!clientsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative" style={{ backgroundColor: clientsData.bgColor, color: clientsData.textColor }}>
      
      <div className="overflow-hidden py-20">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl lg:text-7xl  font-bold mb-6 mt-10 text-center">{clientsData.title}</h2>
        </div>

        {/* Logo Slider Container */}
        <div className="w-3/4 mx-auto mt-20 border-x-4 "   style={{ borderLeft: `4px solid ${clientsData.textColor}`, borderRight: `4px solid ${clientsData.textColor}` }}>
          <Slider
            width="100px"
            duration={10}
            pauseOnHover={true}
           
          >
            {clientsData.clients.map((client, index) => (
              <div key={index} className="mx-2">
                <Slider.Slide>
                  <a href={client.link} target="_blank" rel="noopener noreferrer">
                    <img src={client.logo} alt={`Client ${index}`} className="w-24 h-16"  loading="lazy"/>
                  </a>
                </Slider.Slide>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OurClients;
