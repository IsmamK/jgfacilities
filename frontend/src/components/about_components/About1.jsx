import React from 'react';

const About1 = ({ about1 }) => {
  
  if (!about1) return null; // Prevent rendering if component data is not available

  return (
    <div style={{ backgroundColor: about1.bgColor, color: about1.textColor }}>
      <section className="py-24 relative">
        <div className=" max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className=" justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div className=" justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              {about1.image1 && (
                <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                  <img className="rounded-xl object-cover" src={about1.image1} alt="About Us" />
                </div>
              )}
              {about1.image2 && (
                <img className="sm:ml-0 ml-auto rounded-xl object-cover" src={about1.image2} alt="About Us" />
              )}
            </div>
            <div className=" flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className=" flex-col justify-center items-start gap-8 flex">
                <div className=" flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    {about1.title}
                  </h2>
                  <p className="text-base font-normal leading-relaxed lg:text-start text-center">
                    {about1.description}
                  </p>
                </div>
              </div>
              <a href={about1.buttonLink} className="sm:w-fit  px-3.5 py-2  ransition-all duration-700 ease-in-out rounded-lg shadow-lg justify-center items-center flex" style={{ backgroundColor: about1.textColor, color: about1.bgColor }}>
                <span className="px-1.5 text-white text-sm font-medium leading-6">{about1.buttonLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About1;
