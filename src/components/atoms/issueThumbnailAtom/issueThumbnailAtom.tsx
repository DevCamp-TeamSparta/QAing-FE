'use client'

import React from 'react'
import Image from 'next/image'
import { useModalStore } from '@/states/modalStore'
// import IssueModalOrganism from '@/components/organisms/IssuePageOrganisms/IssueModalOrganism/IssueModalOrganism'
import { logEvent } from '@/lib/amplitude'
import TestIssueModal from '@/components/organisms/IssuePageOrganisms/IssueModalOrganism/TestIssueModalOrganism'
// import EditImageModalOrganism from '@/components/organisms/IssuePageOrganisms/IssueModalOrganism/EditImageModalOrganism'

type ThumbnailProps = {
  imageUrl: string
  videoUrl: string
}

function IssueThumbnail({ imageUrl, videoUrl }: ThumbnailProps) {
  const setModal = useModalStore(state => state.setModal)
  function onClickThumbnailHandler() {
    logEvent('qaing_folderpage_file_preview_view', {
      button_name: '파일 미리보기',
    })
    setModal(<TestIssueModal imageUrl={imageUrl} videoUrl={videoUrl} />)
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
