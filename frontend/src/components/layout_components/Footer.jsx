import React, { useEffect, useState } from 'react';
import { servicesData } from '../../servicesData';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Import social icons

const Footer = () => {

  const apiUrl = import.meta.env.VITE_API_URL; // Adjust as needed
  const [data, setData] = useState({"socials":[]});
  
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
      className="social-icon p-2 rounded-full h-20 w-20"
    >
      <img
        src={social.icon}
        className="h-16 w-16 p-2 rounded-full object-cover" // Ensure images are contained and circular
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
        <Link to="/" className="link link-hover" style={{ color: data.textColor }}>Homepage</Link>
        <Link to="/projects" className="link link-hover" style={{ color: data.textColor }}> Our Projects</Link>
        <Link to="/gallery" className="link link-hover" style={{ color: data.textColor }}>Gallery of Stunning Images</Link>
        <Link to="/contact" className="link link-hover" style={{ color: data.textColor }}>Contact Us </Link>
        
        </div>
      </nav>

   
      
      <nav className='lg:mx-auto text-xs flex flex-col'> 
      <div>
        <h6 className="font-extrabold text-xl">About</h6>
        </div>
        <div className='flex lg:flex-col gap-4'>
        <Link to="/about#about1" className="link link-hover" style={{ color: data.textColor }}>Company Profile</Link>
        <Link to="/about#message" className="link link-hover" style={{ color: data.textColor }}>Chairman's Message</Link>
        <Link to="/about#about2" className="link link-hover" style={{ color: data.textColor }}>Mission, Vision and Story</Link>
        <Link to="/about#team" className="link link-hover" style={{ color: data.textColor }}>Team</Link>
        </div>
      </nav>

      <nav className='lg:mx-auto text-xs flex flex-col'>
        <div>
        <h6 className="font-extrabold text-xl">Services</h6>
        </div>
        <div className='flex lg:flex-col gap-4'>
        {servicesData.map((service, index) => (
          <Link
            key={index}
            to={`/services/${service.slug}`}
            className="link link-hover"
            style={{ color: data.textColor }}
          >
            {service.title}
          </Link>
          
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
