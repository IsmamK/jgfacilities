import React, { useState } from 'react';
import CarouselComponent from '../components/home_components/CarouselComponent';
import Cards from '../components/home_components/Cards';
import Services from '../components/home_components/Services';
import GridCards from '../components/home_components/GridCards';
import WhyUs from '../components/home_components/WhyUs';
import OurClients from '../components/home_components/OurClients';
import News from '../components/home_components/News';
import Contact from '../components/home_components/Contact';
import Statistics from '../components/home_components/Statistics';
import Location from '../components/home_components/Location';
import Hero from '../components/home_components/Hero';
import FeaturedVideo from '../components/home_components/FeaturedVideo';
import { useOutletContext } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import StechBanner from '../components/home_components/StechBanner';
import HomeSidebar from '../components/sidebar_components/HomeSidebar';

const Home = () => {
  // const { getDivider, availableShapes } = useOutletContext(); // Fetch shapes dynamically
  // const [currentShape, setCurrentShape] = useState('None'); // Default shape

  // const handleShapeChange = (event) => {
  //   setCurrentShape(event.target.value); // Update shape based on selection
  // };

  
  return (
    <>
      <HomeSidebar />
    
      <div id="carousel">
        <CarouselComponent />
      </div>

      <div id="stech-banner">
        <StechBanner />
      </div>

      <div id="hero">
        <Hero />
      </div>

      <div id="cards">
        <Cards />
      </div>

      <div id="services">
        <Services />
      </div>

      <div id="statistics">
        <Statistics />
      </div>

      <div id="grid-cards">
        <GridCards />
      </div>

      <div id="why-us">
        <WhyUs />
      </div>

      <div id="our-clients">
        <OurClients />
      </div>

      <div id="news">
        <News />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <div id="location">
        <Location />
      </div>

      {/* <div id="featured-video">
        <FeaturedVideo />
      </div> */}
    </>
  );
};

export default Home;
