'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useModalStore } from '@/states/modalStore'

interface IssueModalProps {
  imageUrl: string
  videoUrl: string
}

export default function IssueModal({ imageUrl, videoUrl }: IssueModalProps) {
  const setModal = useModalStore(state => state.setModal)
  const [mode, setMode] = useState<'image' | 'video'>('image')
  function onClickThumbnailHandler(mode: 'image' | 'video') {
    setMode(mode)
  }
  console.log(videoUrl)

  function closeModal() {
    setModal(null)
  }

  return (
    <div className={'w-screen h-screen max-h-screen p-12'}>
      <div className={'w-full h-full bg-white rounded-[8px] flex flex-col'}>
        <div className={'flex h-[36px] gap-[12px] items-center'}>
          <button onClick={closeModal}>닫기</button>
          <div className={'flex gap-[8px]'}>
            <button
              className={'p-1 border-[1px] bg-gray-500'}
              onClick={() => onClickThumbnailHandler('image')}
            >
              이미지
            </button>
            <button
              className={'border-[1px] bg-gray-500'}
              onClick={() => onClickThumbnailHandler('video')}
            >
              비디오
            </button>
          </div>
        </div>
        <div className={'h-full px-[60px] py-[48px] bg-gray-200'}>
          <div className={'flex w-full h-full relative'}>
            {mode === 'image' ? (
              <Image
                className={'rounded-[8px] overflow-hidden'}
                src={imageUrl}
                alt="issue"
                fill
              />
            ) : (
              <div className={'h-full w-full flex justify-center'}>
                <video
                  className={'h-full w-auto rounded-[8px] overflow-hidden'}
                  controls
                  autoPlay
                  playsInline
                >
                  <source src={videoUrl} />
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
