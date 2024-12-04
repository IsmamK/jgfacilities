import React, { useEffect, useState } from 'react';
import StechBanner from '../components/home_components/StechBanner';

const API_URL = import.meta.env.VITE_API_URL;

const Gallery = () => {
  const [gallery, setGallery] = useState({
    title: "Our Gallery",
    subtitle: "Stunning collection of images",
    items: Array(12).fill({
      image: "",
      subtitle: "",
      title: "",
      description: "",
    }),
  });

  useEffect(() => {
    fetch(`${API_URL}/gallery`)
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
      });
  }, []);

  return (
    <section
      className="body-font"
      style={{ backgroundColor: gallery.bgColor, color: gallery.textColor }}
    >
      <StechBanner />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
            {gallery.title}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {gallery.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.items.map((item, index) => (
            <div
              key={index}
              className="relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: gallery.imageBgColor,
                color: gallery.imageTextColor,
              }}
            >
              <img
                alt="gallery"
                className="w-full h-64 object-cover object-center"
                src={item.image}
                loading='lazy'
              />
              <div
                className="absolute inset-0 bg-gray-800  border-4 border-gray-200ç bg-opacity-75 opacity-0 hover:opacity-100 flex flex-col justify-center items-center p-6 transition-opacity"
                style={{
                  backgroundColor: gallery.imageBgColor,
                }}
              >
                <h2 className="text-sm font-semibold tracking-widest mb-2">
                  {item.subtitle}
                </h2>
                <h1 className="text-lg font-extrabold mb-3">{item.title}</h1>
                <p className="text-center">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <StechBanner />
    </section>
  );
};

export default Gallery;
