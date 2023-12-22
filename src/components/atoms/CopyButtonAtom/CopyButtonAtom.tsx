import React from 'react'
import CopyLinkIcon from '../../../../public/icons/CopyLinkIcon'

function Index() {
  const decodeUrl = (url: string) => decodeURIComponent(url)

  const handleCopyClipBoard = async (imageUrl: string) => {
    try {
      const decodedUrl = decodeUrl(imageUrl)
      await navigator.clipboard.writeText(decodedUrl)
      alert('클립보드에 링크가 복사되었어요.')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="bg-primary-default w-[44px] h-[44px] rounded-[99px] flex flex-row justify-center items-center shadow-copybutton ">
      <CopyLinkIcon color={'#FFFFFF'} />
    </div>
  )
}

export default Index
