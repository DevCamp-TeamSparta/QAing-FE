import React from 'react'
import Image from 'next/image'
import MyVideo from '/public/icons/myVideo.svg'

function index() {
  return (
    <div className="flex flex-row items-center ">
      <div>
        <Image src={MyVideo} alt="MyVideo" />
      </div>
      <div className="ml-[14px] h3 "> 2023-11-15 16:24</div>
    </div>
  )
}

export default index
