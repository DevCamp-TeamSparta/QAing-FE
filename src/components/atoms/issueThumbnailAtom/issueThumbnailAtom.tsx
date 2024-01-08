'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { useModalStore } from '@/states/modalStore'
import { logEvent } from '@/lib/amplitude'
import IssueModalOrganism from '@/components/organisms/IssuePageOrganisms/IssueModalOrganism/IssueModalOrganism'
// import TestIssueModal from '@/components/organisms/IssuePageOrganisms/IssueModalOrganism/TestIssueModalOrganism'
// import EditImageModalOrganism from '@/components/organisms/IssuePageOrganisms/IssueModalOrganism/EditImageModalOrganism'

type ThumbnailProps = {
  imageUrl: string
  imageId: string
  videoUrl: string
  editedImageUrl: string | null
}

function IssueThumbnail({
  imageUrl,
  imageId,
  videoUrl,
  editedImageUrl,
}: ThumbnailProps) {
  const setModal = useModalStore(state => state.setModal)
  function onClickThumbnailHandler() {
    logEvent('qaing_folderpage_file_preview_view', {
      button_name: '파일 미리보기',
    })
    setModal(
      <IssueModalOrganism
        imageUrl={imageUrl}
        imageId={imageId}
        videoUrl={videoUrl}
        currentImageUrl={currentImageUrl}
      />,
    )
  }

  const [currentImageUrl, setCurrentImageUrl] = useState<
    string | null | undefined
  >(imageUrl)

  useEffect(() => {
    if (editedImageUrl === null) {
      setCurrentImageUrl(imageUrl)
    }
    if (editedImageUrl !== null) {
      setCurrentImageUrl(editedImageUrl)
    }
  }, [editedImageUrl])

  useEffect(() => {
    setModal(
      <IssueModalOrganism
        imageUrl={imageUrl}
        imageId={imageId}
        videoUrl={videoUrl}
        currentImageUrl={currentImageUrl}
      />,
    )
  }, [currentImageUrl])

  return (
    <div className="relative group cursor-pointer">
      <div
        className="w-[440px] h-[337px] rounded-[16px] group-hover border border-gray-500 bg-gray-300 z-10 overflow-hidden"
        onClick={onClickThumbnailHandler}
      >
        <Image
          src={currentImageUrl || imageUrl}
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
