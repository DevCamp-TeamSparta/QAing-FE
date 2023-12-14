'use client'

import React from 'react'
import Image from 'next/image'
import { useModalStore } from '@/states/modalStore'
import IssueModal from '@/components/organisms/IssuePageOrganisms/IssueModalOrganism'

type ThumbnailProps = {
  imageUrl: string
  videoUrl: string
}

function IssueThumbnail({ imageUrl, videoUrl }: ThumbnailProps) {
  const setModal = useModalStore(state => state.setModal)
  function onClickThumbnailHandler() {
    setModal(<IssueModal imageUrl={imageUrl} videoUrl={videoUrl} />)
  }
  return (
    <div className="relative group cursor-pointer">
      <div
        className="w-[440px] h-[337px] rounded-[16px] group-hover border border-gray-500 bg-gray-300 z-10 overflow-hidden"
        onClick={onClickThumbnailHandler}
      >
        <Image
          src={imageUrl}
          alt="thumbnail"
          className="w-full h-full object-cover"
          width={440}
          height={337}
        />
      </div>
      {/*<div className="w-[440px] h-[337px] rounded-[16px] invisible group-hover:visible dimmed absolute border border-b-gray-500 top-0 left-0 z-20"></div>*/}
    </div>
  )
}

export default IssueThumbnail
