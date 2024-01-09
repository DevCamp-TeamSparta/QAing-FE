'use client'

import { useEffect, useState } from 'react'
import { useModalStore } from '@/states/modalStore'
import EditImageModalOrganism from './EditImageModalOrganism'
import PreviewModalOrganism from './PreviewModalOrganism'
import { useIssueStore } from '@/states/issue-store'

interface IssueModalProps {
  imageUrl: string
  imageId: string
  videoUrl: string
}

export default function IssueModalOrganism({
  imageUrl,
  imageId,
  videoUrl,
}: IssueModalProps) {
  const setModal = useModalStore(state => state.setModal)
  const [mode, setMode] = useState<'image' | 'video' | 'editImage'>('image')
  function onClickThumbnailHandler(mode: 'image' | 'video' | 'editImage') {
    setMode(mode)
  }

  const { issues } = useIssueStore()
  const [currentEditedImageUrl, setCurrentEditedImageUrl] = useState<
    string | null
  >()
  useEffect(() => {
    issues &&
      issues?.forEach(f => {
        f.images.forEach(image => {
          if (image.originImageUrl === imageUrl) {
            if (!image.editedImageUrl) return null
            setCurrentEditedImageUrl(image.editedImageUrl)
          }
        })
      })
  }, [issues])

  return (
    <div className={' h-screen w-screen px-[2%] py-[2%] fixed top-0 left-0 '}>
      {
        {
          image: (
            <PreviewModalOrganism
              imageUrl={imageUrl}
              currentImageUrl={currentEditedImageUrl}
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
              currentImageUrl={currentEditedImageUrl}
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
