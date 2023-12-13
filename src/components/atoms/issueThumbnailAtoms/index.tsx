import React, { useEffect } from 'react'
import Image from 'next/image'
import DefaultThumbnailImage from '/public/images/Default.svg'

type ThumbnailProps = {
  imageUrl: string
}

function index({ imageUrl }: ThumbnailProps) {
  const decodeUrl = (url: string) => decodeURIComponent(url)
  const decodedImageUrl = decodeUrl(imageUrl)
  return (
    <div className="relative group">
      <div className="w-[440px] h-[337px] rounded-[16px] group-hover border border-gray-500 bg-gray-300 z-10 overflow-hidden">
        <Image
          src={decodedImageUrl ? decodedImageUrl : DefaultThumbnailImage}
          alt="thumbnail"
          className="w-full h-full object-cover"
          width={440}
          height={337}
        />
      </div>
      <div className="w-[440px] h-[337px] rounded-[16px] invisible group-hover:visible dimmed absolute border border-b-gray-500 top-0 left-0 z-20"></div>
    </div>
  )
}

export default index
