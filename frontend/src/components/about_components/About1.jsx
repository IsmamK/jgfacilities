import React, { useState, useEffect } from 'react';
import AboutSidebar from '../sidebar_components/AboutSidebar';

const About1 = ({from_about}) => {
  const [about1, setAbout1] = useState({
    "title": "",
    "description": "",
    "image1": "",
    "image2": "",
    "buttonLabel": "",
    "buttonLink": "",
    "bgColor": "",
    "textColor": ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!about1) return null; // Prevent rendering if component data is not available

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [data1] = await Promise.all([
          fetch(`${apiUrl}/about/about1`).then(res => res.json()),
        ]);

        setAbout1(data1);
        console.log(data1);  // Change alert to console.log for better debugging
      
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
    <div style={{ backgroundColor: about1.bgColor, color: about1.textColor }}>
      {!from_about && (
        <AboutSidebar individual = {true} />
      )

      }
      <section className="py-24 relative">
        <div className=" max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className=" justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div className=" justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              {about1.image1 && (
                <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                  <img className="rounded-xl object-cover" src={about1.image1} alt="About Us" loading="lazy" />
                </div>
              )}
              {about1.image2 && (
                <img className="sm:ml-0 ml-auto rounded-xl object-cover" src={about1.image2} alt="About Us" loading="lazy"/>
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
              <a href={about1.buttonLink} className="sm:w-fit px-3.5 py-2 transition-all duration-700 ease-in-out rounded-lg shadow-lg justify-center items-center flex" style={{ backgroundColor: about1.textColor, color: about1.bgColor }}>
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
