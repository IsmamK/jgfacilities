import React, { useState,useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/bundle'

import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,Mousewheel, EffectCube } from 'swiper/modules';
import { useSwiper } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const News = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

  const [data,setData] = useState({
    "title":"",
    "subtitle":"",
    "news":[ ]

})

  useEffect(()=>{
    fetch(`${apiUrl}/home/news`)
    .then(res=>res.json())
    .then(data=>setData(data))
   
  },[])
  const swiper = useSwiper();
  return (
    <div style={{backgroundColor:data.bgColor,color:data.textColor}}>
    <section class="py-24 w-10/12 mx-auto" >
 
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col lg:flex-row items-center ">
            
                <div class="w-full flex flex-col items-center  ">
                    <div class="block lg:text-left text-center  animate-on-scroll slide-left">
                    <h2 class="text-5xl font-bold  leading-[3.25rem] mb-5 md:text-8xl">{data.title}</h2>
                    <p class="mb-10  max-lg:max-w-xl max-lg:mx-auto">{data.subtitle}</p>
                    <a href="javascript:;" class="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto flex justify-center  font-semibold transition-all duration-300 hover:bg-gray-100 items-center gap-2">Swipe <FontAwesomeIcon icon={faArrowRight} /></a>
                  </div>
                     {/* <!-- Slider controls --> */}
                     <div className='flex flex-col items-center '>
                   
                  </div>
                </div>




                <div class="w-full lg:w-1/2 relative animate-on-scroll slide-up">
                    {/* <!--Slider wrapper--> */}
                
                
                    <Swiper
                  // install Swiper modules
                  modules={[Navigation, Pagination, Scrollbar, A11y,Mousewheel]}
                  spaceBetween={20}
                  slidesPerView={2}
                  
                  navigation
                  mousewheel
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
                >
                    {data.news.map((news)=> (
                                    <SwiperSlide >
                                    <div class="swiper-slide  max-lg:max-w-xl group" >
                            <div class="flex items-center mb-9">
                                <img src={news.image}  class="rounded-2xl w-full object-cover"/>
                            </div>
                            <h3 class="text-xl  font-medium leading-8 mb-4 ">
                            {news.title}
                                </h3>
                            <p class=" leading-6 transition-all duration-500 mb-8">
                                {news.description}
                            </p>
                            <a href="javascript:;" class="cursor-pointer flex items-center gap-2 text-lg font-semibold">
                            {news.action} <FontAwesomeIcon icon={faArrowRight} />
                            </a>
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
