import React, { useEffect, useState } from 'react';
import About1 from '../components/about_components/About1';
import About2 from '../components/about_components/About2';
import Team from '../components/about_components/Team';
import FAQ from '../components/about_components/FAQ';
import AboutSidebar from '../components/sidebar_components/AboutSidebar';
import StechBanner from '../components/home_components/StechBanner';
import Message from '../components/about_components/Message';
import { useLocation } from 'react-router-dom';

const About = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [about1, setAbout1] = useState(null);
  const [about2, setAbout2] = useState(null);
  const [team, setTeam] = useState(null);
  const [faq, setFaq] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const hash = location.hash
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state
        const [data1, data2, teamData, faqData,messageData] = await Promise.all([
          fetch(`${apiUrl}/about/about1`).then(res => res.json()),
          fetch(`${apiUrl}/about/about2`).then(res => res.json()),
          fetch(`${apiUrl}/about/team`).then(res => res.json()),
          fetch(`${apiUrl}/about/faq`).then(res => res.json()),
          fetch(`${apiUrl}/about/message`).then(res => res.json()),

        ]);

        setAbout1(data1);
        setAbout2(data2);
        setTeam(teamData);
        setFaq(faqData);
        setMessage(messageData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false); // Reset loading state
        if (hash) {
          // Delay the scroll to ensure the DOM is fully rendered
          
            // alert(hash)
            // alert(`document.querySelector(${hash})`)
            const element = document.querySelector(hash);
            // alert(element)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              
            }
      }
        
      }
    };

    fetchData();
  }, []);



  if (loading) return <div>Loading...</div>; // Loading feedback
  if (error) return <div>{error}</div>; // Error feedback


  

  return (

    <>  
        <AboutSidebar/>
        
        <StechBanner/>
      <div id="about1" >
           <About1  about1={about1} />
      </div>

      <div id="message" >
           <Message message={message}/>
      </div>

      <div id="about2" >
         <About2  about2={about2} />
      </div>

      <div id="team" >
         <Team  team={team} />
      </div>

      <div id="faq" >
         <FAQ  faq={faq} />
      </div>
      

      </>
  );
};

export default About;