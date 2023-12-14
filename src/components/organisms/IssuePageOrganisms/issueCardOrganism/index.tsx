import React from 'react'
import IssueThumbnail from '@/components/atoms/issueThumbnailAtoms'
import CopyButton from '@/components/atoms/CopyButtonAtoms'
import MoreIcon from '../../../../../public/icons/More'

interface IssueCardProps {
  IssueCardProps: {
    imageUrl: string
    videoUrl: string
    updatedAt: string
    issueName: string
    _id: string
  }
}

function index({ IssueCardProps }: IssueCardProps) {
  const { imageUrl, videoUrl, updatedAt, issueName, _id } = IssueCardProps
  return (
    <div className="w-[440px] h-[417px]">
      <div className="flex flex-col">
        <div className=" relative">
          <IssueThumbnail imageUrl={imageUrl} videoUrl={videoUrl} />
          <div className="absolute top-0 right-0 z-30 mx-4 my-4">
            <CopyButton imageUrl={imageUrl} videoUrl={videoUrl} />
          </div>
        </div>
        <div className="t1 mt-4 flex flex-row justify-between">
          {issueName}
          <div>
            <MoreIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default index