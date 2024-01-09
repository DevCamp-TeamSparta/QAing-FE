'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { useModalStore } from '@/states/modalStore'
import { useIssueStore } from '@/states/issue-store'
import { logEvent } from '@/lib/amplitude'
import IssueModalOrganism from '@/components/organisms/IssuePageOrganisms/IssueModalOrganism/IssueModalOrganism'
// import TestIssueModal from '@/components/organisms/IssuePageOrganisms/IssueModalOrganism/TestIssueModalOrganism'
// import EditImageModalOrganism from '@/components/organisms/IssuePageOrganisms/IssueModalOrganism/EditImageModalOrganism'

type ThumbnailProps = {
  imageUrl: string
  imageId: string
  videoUrl: string
}

export default function IssueThumbnailAtom({
  imageUrl,
  imageId,
  videoUrl,
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
      />,
    )
  }

  const { issues } = useIssueStore()
  const [currentEditedImageURL, setCurrentEditedImageURL] = useState<
    string | null
  >()
  useEffect(() => {
    issues &&
      issues?.forEach(f => {
        f.images.forEach(image => {
          if (image.originImageUrl === imageUrl) {
            if (!image.editedImageUrl) return null
            setCurrentEditedImageURL(image.editedImageUrl)
          }
        })
      })
  }, [issues])

  return (
    <div className="relative group cursor-pointer">
      <div
        className="w-[440px] h-[337px] rounded-[16px] group-hover border border-gray-500 bg-gray-300 z-10 overflow-hidden"
        onClick={onClickThumbnailHandler}
      >
        <Image
          src={currentEditedImageURL || imageUrl}
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
