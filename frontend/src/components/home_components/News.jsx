import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/bundle';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const News = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    title: '',
    subtitle: '',
    news: [],
  });

  const [expandedIndexes, setExpandedIndexes] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/home/news`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div style={{ backgroundColor: data.bgColor, color: data.textColor }}>
      <section className="py-24 w-full sm:w-10/12 mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full flex flex-col items-center text-center lg:text-left">
              <h2 className="text-3xl sm:text-5xl font-bold leading-[3rem] sm:leading-[3.25rem] mb-5 md:text-7xl">{data.title}</h2>
              <p className="mb-6 max-w-xl mx-auto">{data.subtitle}</p>
              <a
                href="javascript:;"
                className="mb-10 cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto flex justify-center font-semibold transition-all duration-300 hover:bg-gray-100 items-center gap-2"
              >
                Swipe  <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
                spaceBetween={20}
                slidesPerView={1} // Default 1 slide per view for mobile
                navigation
                mousewheel
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                  // When the screen width is 768px or larger, show 3 slides per view
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
              >
                {data.news.map((news, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-slide group relative">
                      <div className="flex items-center mb-6">
                        <img
                          src={news.image}
                          className="rounded-2xl w-full object-cover h-64 sm:h-auto"
                          alt="news"
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-medium leading-8 mb-4">{news.title}</h3>
                      <p
                        className={`leading-6 transition-all duration-500 mb-4 ${
                          expandedIndexes.includes(index) ? '' : 'line-clamp-3'
                        }`}
                      >
                        {news.description}
                      </p>
                      <button
                        onClick={() => toggleExpand(index)}
                        className="cursor-pointer flex items-center gap-2 text-sm sm:text-lg font-semibold "
                      >
                        {expandedIndexes.includes(index) ? 'Show Less' : 'Read More'}
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
