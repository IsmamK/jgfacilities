import {React,useState,useEffect} from 'react';

// Mock JSON data for the Location component


const Location = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [locationData,setLocationData] = useState({
    title: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    workingHours: "",
    mapSrc: "",
    bgColor: "", // Default background color
    textColor: "", // Default text color
  })

  useEffect(()=>{
    fetch(`${apiUrl}/home/location/`)
    .then(res=>res.json())
    .then(data=>setLocationData(data))
  },[])

  return (
    <div className='relative' style={{ backgroundColor: locationData.bgColor, color: locationData.textColor }}>
      {/* Divider */}
      <img src="" className='absolute top-0 w-full'  />

      {/* Location Section */}
      <div className='max-w-7xl mx-auto px-6 py-24 '>
        <h1 className='text-6xl font-extrabold text-center mb-16 leading-tight'>{locationData.title}</h1>
        
        <div className='grid gap-12 md:grid-cols-2 items-start'>
          
          {/* Left: Location Info */}
          <div className='space-y-8'>
            <h2 className='text-3xl font-semibold'>{locationData.subtitle}</h2>
            <p className='text-lg leading-relaxed'>
              {locationData.description}
            </p>
            <div className='space-y-4'>
              <p className='text-xl'>
                <strong>Address:</strong> {locationData.address}
              </p>
              <p className='text-xl'>
                <strong>Phone:</strong> {locationData.phone}
              </p>
              <p className='text-xl'>
                <strong>Email:</strong> {locationData.email}
              </p>
              <p className='text-xl'>
                <strong>Working Hours:</strong> {locationData.workingHours}
              </p>
            </div>
          </div>

          {/* Right: Google Maps Embed */}
          <div className='relative h-96'>
            <iframe
              src={locationData.mapSrc} // Use map source from the data
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title="Our Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
