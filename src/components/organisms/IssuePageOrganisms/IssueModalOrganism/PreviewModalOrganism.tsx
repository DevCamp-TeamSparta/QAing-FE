import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useClipboard from '@/hooks/useClipboard'
import { useModalStore } from '@/states/modalStore'
import { CloseIcon } from '../../../../../public/icons/CloseIcon'
import clsx from 'clsx'
import Image from 'next/image'
import { TypeVideoIcon } from '../../../../../public/icons/TypeVideoIcon'
import CopyLinkIcon from '../../../../../public/icons/CopyLinkIcon'
import { TypeImageIcon } from '../../../../../public/icons/TypeImageIcon'

interface PreviewModalProps {
  imageUrl: string
  currentImageUrl?: string | null | undefined
  videoUrl: string
  mode: string
  setMode: Dispatch<SetStateAction<'image' | 'video' | 'editImage'>>
  onClickThumbnailHandler: (mode: 'image' | 'video' | 'editImage') => void
}

export default function PreviewModalOrganism({
  imageUrl,
  currentImageUrl,
  videoUrl,
  mode,
  onClickThumbnailHandler,
}: PreviewModalProps) {
  const setModal = useModalStore(state => state.setModal)
  function closeModal() {
    setModal(null)
  }
  const { handleCopyClipBoard } = useClipboard()

  async function onClickCopyLinkHandler() {
    const url = mode === 'image' ? imageUrl : videoUrl
    // navigator.clipboard.writeText(url)
    await handleCopyClipBoard(url)
  }

  return (
    <div className={'w-full h-full  bg-white rounded-[8px] flex flex-col'}>
      <div
        className={
          'relative px-[20px] py-[12px] flex items-center gap-[12px]  justify-between'
        }
      >
        <button
          className={
            'p-[8px] rounded-[8px] duration-150 [&>svg]:w-[20px] [&>svg]:h-[20px] hover:bg-gray-200'
          }
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

        <div className="flex flex-row gap-3">
          {mode === 'image' && (
            <button
              className="flex px-4  justify-center items-center bg-gray-300 rounded-[8px]
            "
              onClick={() => onClickThumbnailHandler('editImage')}
            >
              편집하기
            </button>
          )}
          <button
            className={`flex  items-center gap-[8px] px-[20px] py-[8px] rounded-[99px] bg-primary-default b3 text-white [&>svg]:w-[20px] [&>svg]:h-[20px] hover:bg-primary-hover duration-150`}
            onClick={onClickCopyLinkHandler}
          >
            <CopyLinkIcon color={'#FFFFFF'} /> 링크 복사하기
          </button>
        </div>
      </div>
      <div
        className={
          'h-full max-w-full px-[30px] py-[48px] bg-gray-200 rounded-[8px] relative'
        }
      >
        <div className={'flex w-full h-full relative'}>
          {mode === 'image' ? (
            <div
              className={
                'h-full w-full flex justify-center items-center absolute'
              }
            >
              <Image
                className={
                  'h-full w-full rounded-[8px] overflow-hidden object-fit'
                }
                width={1080}
                height={720}
                src={currentImageUrl || imageUrl}
                alt="issue"
              />
            </div>
          ) : (
            <div
              className={
                'h-full w-full max-h-full flex justify-center items-center absolute'
              }
            >
              <video
                className={
                  'h-full w-full rounded-[8px] overflow-hidden absolute'
                }
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
  )
}
