import React from 'react'
import CopyLinkIcon from '../../../../public/icons/CopyLink'

type CopyButtonProps = {
  imageUrl: string
  videoUrl: string
}

function index({ imageUrl, videoUrl }: CopyButtonProps) {
  const handleCopyClipBoard = async (imageUrl: string) => {
    try {
      await navigator.clipboard.writeText(imageUrl)
      alert('클립보드에 링크가 복사되었어요.')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div
      onClick={() => handleCopyClipBoard(imageUrl)}
      className="bg-primary-default w-[44px] h-[44px] rounded-[99px] flex flex-row justify-center items-center shadow-copybutton "
    >
      <CopyLinkIcon color={'#FFFFFF'} />
    </div>
  )
}

export default index
