'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { useModalStore } from '@/states/modalStore'
import clsx from 'clsx'
import CopyLinkIcon from '../../../../../public/icons/CopyLinkIcon'
import { CloseIcon } from '../../../../../public/icons/CloseIcon'
import { TypeImageIcon } from '../../../../../public/icons/TypeImageIcon'
import { TypeVideoIcon } from '../../../../../public/icons/TypeVideoIcon'
import useClipboard from '@/hooks/useClipboard'
import EditImageModalOrganism from './EditImageModalOrganism'
import PreviewModalOrganism from './PreviewModalOrganism'

interface IssueModalProps {
  imageUrl: string
  imageId: string
  videoUrl: string
  currentImageUrl: string | null | undefined
}

export default function IssueModal({
  imageUrl,
  imageId,
  videoUrl,
  currentImageUrl,
}: IssueModalProps) {
  const setModal = useModalStore(state => state.setModal)
  const [mode, setMode] = useState<'image' | 'video' | 'editImage'>('image')
  function onClickThumbnailHandler(mode: 'image' | 'video' | 'editImage') {
    setMode(mode)
  }
  // const { handleCopyClipBoard } = useClipboard()

  // async function onClickCopyLinkHandler() {
  //   const url = mode === 'image' ? imageUrl : videoUrl
  //   // navigator.clipboard.writeText(url)
  //   await handleCopyClipBoard(url)
  // }

  // function closeModal() {
  //   setModal(null)
  // }

  return (
    <div className={' h-screen w-full px-[13%] py-[2%] fixed top-0 left-0 '}>
      {
        {
          image: (
            <PreviewModalOrganism
              imageUrl={imageUrl}
              currentImageUrl={currentImageUrl}
              videoUrl={videoUrl}
              setMode={setMode}
              mode={mode}
              onClickThumbnailHandler={onClickThumbnailHandler}
            />
          ),
          video: (
            <PreviewModalOrganism
              imageUrl={imageUrl}
              videoUrl={videoUrl}
              setMode={setMode}
              mode={mode}
              onClickThumbnailHandler={onClickThumbnailHandler}
            />
          ),
          editImage: (
            <EditImageModalOrganism
              imageUrl={imageUrl}
              currentImageUrl={currentImageUrl}
              imageId={imageId}
              onClickPreviewThumbnailHandler={onClickThumbnailHandler}
              setMode={setMode}
            />
          ),
        }[mode]
      }
    </div>
  )
}
