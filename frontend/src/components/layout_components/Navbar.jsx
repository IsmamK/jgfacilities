import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { servicesData } from '../../servicesData.js';

const Navbar = () => {
  const [navbarData, setNavbarData] = useState({
    logo: '',
    logo2: "",
    bgColor: '#ffffff', // Default background
    textColor: '#000000', // Default text
    buttonBgColor: '#007BFF',
    buttonTextColor: '#ffffff',
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null); // Track which submenu is open
  const apiUrl = import.meta.env.VITE_API_URL;
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
    fetch(`${apiUrl}/layout/navbar/`)
      .then((res) => res.json())
      .then((data) => setNavbarData(data))
      .catch((error) => console.error('Error loading navbar configuration:', error));
  }, []);

  const routes = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about',
      subItems:[
        {
          label:"About Us",
          path:"/about"

        },
        {
          label:"Company Profile",
          path:"/about/company-profile"

        },
        {
          label:"Chairman's Message",
          path:"/about/message"

        },
        {
          label:"Mission,Vision and story",
          path:"/about/story"

        },
        {
          label:"Team",
          path:"/about/team"

        },
      ]
     },
     {
      label: 'Services',
      path: '/services',
      subItems: servicesData.map((service) => ({
        label: service.title,
        path: `/services/${service.slug}`,
      })),
    },
    { label: 'Projects', path: '/projects' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
    
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSubMenu = (index) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  return (
    <nav
      className="sticky top-0 z-50 shadow-lg font-extrabold"
      style={{ backgroundColor: navbarData.bgColor, color: navbarData.textColor }}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="w-40 h-24 flex items-center justify-center">
            <img
              src={`data:image/png;base64,${navbarData.logo}`}
              alt="Logo"
              className="object-center object-contain"
             
            />
          </div>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="lg:hidden text-3xl"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        {/* Navbar Links */}
        <div
          className={`absolute lg:static top-16 right-2 w-1/2 lg:w-auto bg-white rounded-xl lg:bg-transparent shadow-md lg:shadow-none transition-all duration-300 ${
            isMenuOpen ? 'block' : 'hidden'
          } lg:flex items-center`}
        >
          <ul className="flex flex-col lg:flex-row gap-10 lg:gap-20 p-4 lg:p-0 lg:text-2xl">
            {routes.map((route, index) => (
              <li key={index} className="relative group">
                {route.subItems ? (
                  <>
                    <div
                      className="cursor-pointer hover:text-yellow-600 flex items-center lg:hover:text-yellow-600"
                      onClick={() => toggleSubMenu(index)}
                    >
                      <div onMouseEnter={() => toggleSubMenu(index)}>
                        {route.label}
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                    <ul
                      className={`absolute left-0 top-8 bg-white shadow-md rounded-md p-2 w-48 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 z-10 ${
                        openSubMenuIndex === index ? 'block' : 'hidden'
                      }`}
                      onMouseLeave={() => toggleSubMenu(index)}
                    >
                      {route.subItems.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="py-1 px-2 hover:bg-gray-100 rounded"
                        >
                          <a
                            href={subItem.path}
                            style={{ color: navbarData.textColor }}
                          >
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={route.path}
                    className="hover:text-blue-600"
                    style={{ color: navbarData.textColor }}
                  >
                    {route.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <a target ="_blank" href="https://stechgroupbd.com/" className="hidden lg:flex items-center">
          <div className="w-40 h-24 flex items-center justify-center">
            <img
              src={`data:image/png;base64,${navbarData.logo2}`}
              alt="Logo"
              className="object-center object-contain"
            />
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
