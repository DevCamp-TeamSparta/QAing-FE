import React from 'react'
import Image from 'next/image'
import FF7 from '/public/images/FF7.jpg'

function index() {
  return (
    <div className="relative group">
      <div className="w-[440px] h-[337px] rounded-[22px] group-hover border border-gray-500 bg-gray-300 z-10 overflow-hidden">
        <Image src={FF7} alt="FF7" className="w-full h-full object-cover" />
      </div>
      <div className="w-[440px] h-[337px] rounded-[22px] invisible group-hover:visible dimmed peer-hover:visible absolute top-0 left-0 z-20"></div>
    </div>
  )
}

export default index
