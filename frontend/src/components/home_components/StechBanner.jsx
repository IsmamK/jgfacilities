import React from 'react'
const StechBanner = () => {
  return (
<div 
  className="bg-white" 
 >

  <div class="w-full">
  <div 
  className="relative flex flex-col items-center p-4 sm:p-8 lg:flex-row lg:justify-between bg-repeat" 
  style={{ backgroundImage: `url('movingdots.avif')` }}
>
  {/* Overlay Background Color */}
  <div className="absolute inset-0 bg-[#4077a3] opacity-85 z-10"></div>

  <div className="relative z-20 mb-4 sm:mb-8 lg:mb-0 mx-20">
    <h2 className="text-center text-xl font-extrabold text-white sm:text-2xl lg:text-left lg:text-4xl">
      A Concern of <span className="text-yellow-200">Stech Group</span>
    </h2>
  </div>

  <div className="flex flex-col items-center lg:items-end"></div>
</div>

  </div>
</div>
  )
}

export default StechBanner
