import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import About1 from '../components/about_components/About1';
import About2 from '../components/about_components/About2';
import Team from '../components/about_components/Team';
import FAQ from '../components/about_components/FAQ';
import AboutSidebar from '../components/sidebar_components/AboutSidebar';
import StechBanner from '../components/home_components/StechBanner';
import Message from '../components/about_components/Message';

const About = () => {



  return (
    <>
      <AboutSidebar individual={false}/>
      <StechBanner />
      <div id="about1">
        <About1 from_about={true} />
      </div>
      <div id="message"  >
        <Message from_about={true} />
      </div>
      <div id="about2"  >
        <About2  from_about={true}/>
      </div>
      <div id="team"  >
        <Team  from_about={true}/>
      </div>
     
    </>
  );
};

export default About;
