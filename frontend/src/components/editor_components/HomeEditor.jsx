import React, { useState } from 'react';
import Home from '../../pages/Home';
import CarouselModal from './editor_modals/home_modals/CarouselModal';
import HeroModal from './editor_modals/home_modals/HeroModal';
import CardsModal from './editor_modals/home_modals/CardsModal';
import ServicesModal from './editor_modals/home_modals/ServicesModal';
import StatisticsModal from './editor_modals/home_modals/StatisticsModal';
import GridCardsModal from './editor_modals/home_modals/GridCardsModal';
import WhyUsModal from './editor_modals/home_modals/WhyUsModal';
import OurClientsModal from './editor_modals/home_modals/OurClientsModal';
import NewsModal from './editor_modals/home_modals/NewsModal';
import ContactModal from './editor_modals/home_modals/ContactModal';
import LocationModal from './editor_modals/home_modals/LocationModal';
import FeaturedVideoModal from './editor_modals/home_modals/FeaturedVideoModal';
import AssociatesModal from './editor_modals/home_modals/AssociatesModal';

const HomeEditor = ({ getDivider, availableShapes }) => {
  const [isCarouselOpen, setCarouselOpen] = useState(false);
  const [isHeroOpen, setHeroOpen] = useState(false);
  const [isCardsOpen, setCardsOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
  const [isStatisticsOpen, setStatisticsOpen] = useState(false);
  const [isGridCardsOpen, setGridCardsOpen] = useState(false);
  const [isWhyUsOpen, setWhyUsOpen] = useState(false);
  const [isOurClientsOpen, setOurClientsOpen] = useState(false);
  const [isAssociatesOpen, setAssociatesOpen] = useState(false);
  const [isNewsOpen, setNewsOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [isFeaturedVideoOpen, setFeaturedVideoOpen] = useState(false);

  return (
    <div className='flex gap-40 items-start justify-between p-20 w-[1300px]'>
      {/* Buttons Section */}
      <div className='grid grid-cols-2 gap-28 font-bold text-center'>
        <button className="btn btn-primary w-20 m-2" onClick={() => setCarouselOpen(true)}>Carousel</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setHeroOpen(true)}>Hero</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setCardsOpen(true)}>Cards</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setServicesOpen(true)}>Services</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setStatisticsOpen(true)}>Statistics</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setGridCardsOpen(true)}>Grid Cards</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setWhyUsOpen(true)}>Why Us</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setOurClientsOpen(true)}>Our Clients</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setAssociatesOpen(true)}>Associates</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setNewsOpen(true)}>News</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setContactOpen(true)}>Contact</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setLocationOpen(true)}>Location</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setFeaturedVideoOpen(true)}>Featured Video</button>
      </div>

      {/* Mockup Browser Section */}
      <div className="mockup-browser bg-white border-8 border-black p-2 h-[1000px] overflow-y-scroll">
        <div>
          <div className="mockup-browser-toolbar m-10">
            <div className="input">https://sample-website.com</div>
          </div>
          <div className='overflow-scroll'>
            <Home context={{ getDivider, availableShapes }} />
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <CarouselModal isOpen={isCarouselOpen} onClose={() => setCarouselOpen(false)} />
      <HeroModal isOpen={isHeroOpen} onClose={() => setHeroOpen(false)} />
      <CardsModal isOpen={isCardsOpen} onClose={() => setCardsOpen(false)} />
      <ServicesModal isOpen={isServicesOpen} onClose={() => setServicesOpen(false)} />
      <StatisticsModal isOpen={isStatisticsOpen} onClose={() => setStatisticsOpen(false)} />
      <GridCardsModal isOpen={isGridCardsOpen} onClose={() => setGridCardsOpen(false)} />
      <WhyUsModal isOpen={isWhyUsOpen} onClose={() => setWhyUsOpen(false)} />
      <OurClientsModal isOpen={isOurClientsOpen} onClose={() => setOurClientsOpen(false)} />
      <AssociatesModal isOpen={isAssociatesOpen} onClose={() => setAssociatesOpen(false)} />
      <NewsModal isOpen={isNewsOpen} onClose={() => setNewsOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />
      <LocationModal isOpen={isLocationOpen} onClose={() => setLocationOpen(false)} />
      <FeaturedVideoModal isOpen={isFeaturedVideoOpen} onClose={() => setFeaturedVideoOpen(false)} />
    </div>
  );
};

export default HomeEditor;
