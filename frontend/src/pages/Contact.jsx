import React from 'react'
import Contact1 from '../components/contact_components/Contact1'
import Contact2 from '../components/contact_components/Contact2'
import StechBanner from '../components/home_components/StechBanner'

const Contact = () => {
  return (
    <div>
    <Contact1 bgColor = "white" textColor="black"/>
    <StechBanner/>
    <Contact2 bgColor = "white" textColor="black"/>
    
</div>
  )
}

export default Contact
