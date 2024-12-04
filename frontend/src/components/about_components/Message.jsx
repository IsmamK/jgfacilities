import React, { useState, useEffect } from 'react';
import AboutSidebar from '../sidebar_components/AboutSidebar';

const Message = ({from_about}) => {
  const [data, setData] = useState({
    "heading": "",
    "subheading": "",
    "description": "",
    "image": "",
    "bgColor": "",
    "textColor": ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [messageData] = await Promise.all([
      
          fetch(`${apiUrl}/about/message`).then(res => res.json()),
        ]);

      
        setData(messageData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

 
  



  if (loading) return <span className="loading loading-dots loading-lg"></span>
  if (error) return <div>{error}</div>;


  return (
    <div style={{ backgroundColor: data.bgColor,color: data.textColor  }} className="py-24 sm:py-8 lg:py-12">
        {!from_about && (
        <AboutSidebar individual = {true}/>
      )

      }
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div>
            <div className=" w-full overflow-hidden rounded-lg  shadow-lg md:h-auto">
              <img
                src={data.image}
                alt="Image"
                className="h-full w-full object-fit object-center"
                 loading="lazy"
              />
            </div>
          </div>

          <div className="md:pt-8">
            <p
              className="text-center font-i md:text-left"
            >
              <i>
              {data.subheading}
              </i>
            </p>

            <h1
              className="mb-4 text-center text-3xl md:mb-6 md:text-left font-extrabold"
            >
              {data.heading}
            </h1>

            <p className="mb-6 sm:text-lg md:mb-8" >
              {data.description}
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
