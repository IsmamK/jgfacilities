import React, { useEffect, useState } from 'react';
import About1 from '../components/about_components/About1';
import About2 from '../components/about_components/About2';
import Team from '../components/about_components/Team';
import FAQ from '../components/about_components/FAQ';
import AboutSidebar from '../components/sidebar_components/AboutSidebar';
import StechBanner from '../components/home_components/StechBanner';

const About = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [about1, setAbout1] = useState(null);
  const [about2, setAbout2] = useState(null);
  const [team, setTeam] = useState(null);
  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state
        const [data1, data2, teamData, faqData] = await Promise.all([
          fetch(`${apiUrl}/about/about1`).then(res => res.json()),
          fetch(`${apiUrl}/about/about2`).then(res => res.json()),
          fetch(`${apiUrl}/about/team`).then(res => res.json()),
          fetch(`${apiUrl}/about/faq`).then(res => res.json()),
        ]);

        setAbout1(data1);
        setAbout2(data2);
        setTeam(teamData);
        setFaq(faqData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) return <div>Loading...</div>; // Loading feedback
  if (error) return <div>{error}</div>; // Error feedback

  return (

    <>  
        <AboutSidebar/>
        
        <StechBanner/>
      <div id="about1" >
           <About1 bgColor="white" textColor="black" about1={about1} />
      </div>

      <div id="about2" >
         <About2 bgColor="black" textColor="white" about2={about2} />
      </div>

      <div id="team" >
         <Team bgColor="white" textColor="black" team={team} />
      </div>

      <div id="faq" >
         <FAQ bgColor="black" textColor="white" faq={faq} />
      </div>
      

      </>
  );
};

export default About;