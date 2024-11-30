import React, { useEffect, useState } from 'react'

const Footer = ({}) => {

  const apiUrl = import.meta.env.VITE_API_URL; // Adjust as needed
  const [data,setData] = useState({})
  useEffect(() => {
    fetch(`${apiUrl}/layout/footer/`) // Replace with actual path or API endpoint
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error loading navbar configuration:", error));
  }, []);

  return (

    <footer className="footer  font-bold p-5 shadow-xl flex gap-10" style={{ backgroundColor: data.bgColor, color: data.textColor }}>
  <nav className='mx-auto text-xs'>
    <h6 className="font-extrabold  md:text-lg">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav className='mx-auto text-xs'>
    <h6 className=" font-extrabold  md:text-lg ">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav className='mx-auto text-xs'> 
    <h6 className=" font-extrabold  md:text-lg">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
  )
}

export default Footer
