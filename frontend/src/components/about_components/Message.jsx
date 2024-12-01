import React, { useState, useEffect } from 'react';

const Message = ({message}) => {
  const [data, setData] = useState({
    heading: "",
    subheading: "",
    description: "",
    image: "",
    bgColor: "",
    textColor: "",
  
  });

  useEffect(() => {
    if (message) {
      setData(message);
    }
  }, [message]);

  return (
    <div style={{ backgroundColor: data.bgColor,color: data.textColor  }} className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div>
            <div className="h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
              <img
                src={data.image}
                alt="Image"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="md:pt-8">
            <p
              className="text-center font-bold md:text-left"
            >
              {data.subheading}
            </p>

            <h1
              className="mb-4 text-center sm:text-3xl md:mb-6 md:text-left"
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
