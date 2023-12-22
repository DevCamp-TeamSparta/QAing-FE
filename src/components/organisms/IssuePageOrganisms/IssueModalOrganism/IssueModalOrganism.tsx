'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useModalStore } from '@/states/modalStore'
import clsx from 'clsx'
import CopyLinkIcon from '../../../../../public/icons/CopyLinkIcon'
import { CloseIcon } from '../../../../../public/icons/CloseIcon'
import { TypeImageIcon } from '../../../../../public/icons/TypeImageIcon'
import { TypeVideoIcon } from '../../../../../public/icons/TypeVideoIcon'
import useClipboard from '@/hooks/useClipboard'

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
  const { handleCopyClipBoard } = useClipboard()

  async function onClickCopyLinkHandler() {
    const url = mode === 'image' ? imageUrl : videoUrl
    // navigator.clipboard.writeText(url)
    await handleCopyClipBoard(url)
  }

  function closeModal() {
    setModal(null)
  }

  return (
    <div className={' h-screen max-h-screen px-40 py-24 '}>
      <div className={'w-full h-full bg-white rounded-[8px] flex flex-col'}>
        <div
          className={
            'relative px-[20px] py-[12px] flex items-center gap-[12px]  justify-between'
          }
        >
          <button
            className={'[&>svg]:w-[20px] [&>svg]:h-[20px]'}
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
          <div
            className={`absolute left-[50%] translate-x-[-50%] flex 
            [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:gap-[4px] [&>button]:w-[106px] [&>button]:h-[36px] [&>button]:b3
            `}
          >
            <button
              className={clsx(
                'border rounded-l-[8px] [&>svg]:w-[20px] [&>svg]:h-[20px]',
                {
                  'bg-primary-default border-primary-default text-white ':
                    mode === 'image',
                  'bg-white border-gray-500 text-gray-700 border-r-primary-default':
                    mode !== 'image',
                },
              )}
              onClick={() => onClickThumbnailHandler('image')}
            >
              <TypeImageIcon color={mode === 'image' ? '#FFFFFF' : '#808181'} />{' '}
              이미지
            </button>
            <button
              className={clsx(
                'border rounded-r-[8px] [&>svg]:w-[20px] [&>svg]:h-[20px]',
                {
                  'bg-primary-default border-primary-default text-white':
                    mode === 'video',
                  'bg-white border-gray-500 text-gray-700 border-l-primary-default':
                    mode !== 'video',
                },
              )}
              onClick={() => onClickThumbnailHandler('video')}
            >
              <TypeVideoIcon color={mode === 'video' ? '#FFFFFF' : '#808181'} />{' '}
              20초 영상
            </button>
          </div>
          <button
            className={`flex gap-[8px] px-[20px] py-[8px] rounded-[99px] bg-primary-default b3 text-white [&>svg]:w-[20px] [&>svg]:h-[20px]`}
            onClick={onClickCopyLinkHandler}
          >
            <CopyLinkIcon color={'#FFFFFF'} /> 링크 복사하기
          </button>
        </div>
        <div className={'h-full px-[30px] py-[48px] bg-gray-200 rounded-[8px]'}>
          <div className={'flex w-full h-full relative'}>
            {mode === 'image' ? (
              <div className={'h-full w-full flex justify-center'}>
                <Image
                  className={
                    'h-full  rounded-[8px] overflow-hidden mx-auto object-cover'
                  }
                  src={imageUrl}
                  alt="issue"
                />
              </div>
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
