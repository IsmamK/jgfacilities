import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Import social icons

const Footer = () => {

  const apiUrl = import.meta.env.VITE_API_URL; // Adjust as needed
  const [data, setData] = useState({"socials":[]});
  const [servicesData,setServicesData] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const res = await fetch(`${apiUrl}/get-service-slugs/`);
            const data = await res.json();
            setServicesData(data);  // Update state with fetched data
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);  // Set loading to false once data is fetched
        }
    };

    fetchServices();
}, []);

  useEffect(() => {
    fetch(`${apiUrl}/layout/footer/`) // Replace with actual path or API endpoint
      .then((res) => res.json())
      .then((data) => {setData(data)})
      .catch((error) => console.error("Error loading navbar configuration:", error));
  }, []);



  

  return (
    <>
    <footer className=" font-bold p-5 shadow-xl " style={{ backgroundColor: data.bgColor, color: data.textColor }}>
      
      <div className='footer flex flex-col lg:flex-row gap-5 lg:gap-10 lg:items-center '>
       {/* Social media links section */}
      
       <div className="social-icons flex lg:flex-col gap-4 justify-center mt-4 mx-auto lg:ml-20">
  {data.socials.map((social) => (
    <a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon p-2 rounded-full h-20 w-20 "
    >
      <img
        src={social.icon}
        className="h-16 w-16 p-2 rounded-full object-cover " // Ensure images are contained and circular
        alt={social.name} // It's a good practice to add alt text for accessibility
      />
    </a>
  ))}
</div>

      
      <nav className='lg:mx-auto text-xs flex flex-col '>
        <div>
        <h6 className="font-extrabold text-xl">Company</h6>
        </div>
        <div className='flex lg:flex-col gap-4'>
        <a href="/" className="link link-hover" style={{ color: data.textColor }}>Homepage</a>
        <a href="/projects" className="link link-hover" style={{ color: data.textColor }}> Our Projects</a>
        <a href="/gallery" className="link link-hover" style={{ color: data.textColor }}>Gallery of Stunning Images</a>
        <a href="/contact" className="link link-hover" style={{ color: data.textColor }}>Contact Us </a>
        
        </div>
      </nav>

   
      
      <nav className='lg:mx-auto text-xs flex flex-col'> 
      <div>
        <h6 className="font-extrabold text-xl">
          <a href ="/about">About</a>
          </h6>
        </div>
        <div className='flex lg:flex-col gap-4'>
        <a href="/about/company-profile"  className="link link-hover" style={{ color: data.textColor }}>Company Profile</a>
        <a href="/about/message" className="link link-hover" style={{ color: data.textColor }}>Chairman's Message</a>
        <a href="/about/story" className="link link-hover" style={{ color: data.textColor }}>Mission, Vision and Story</a>
        <a href="/about/team"   className="link link-hover" style={{ color: data.textColor }}>Team</a>
        </div>
      </nav>

      <nav className='lg:mx-auto text-xs flex flex-col'>
        <div>
        <h6 className="font-extrabold text-xl">Services</h6>
        </div>
        <div className='flex lg:flex-col gap-4'>
        {servicesData.map((service, index) => (
          <a
            key={index}
            href={`/services/${service.slug}`}
            className="link link-hover"
            style={{ color: data.textColor }}
          >
            {service.title}
          </a>
          
        ))}
        </div>
      </nav>
      </div>
   
      <div className="copyright text-center mt-4 text-xs">
        <p>&copy; {data.copyText}</p>
      </div>
      
    </footer>
    
   

      </>
  );
};

export default Footer;
