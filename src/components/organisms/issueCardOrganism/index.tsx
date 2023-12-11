import React from 'react'
import IssueThumanil from '@/components/atoms/issueThumbnailAtoms/index'
import CopyButton from '@/components/atoms/CopyButtonAtoms/index'
import MoreIcon from '../../../../public/icons/More'

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
    <div className="bg-gray-100 w-[440px] h-[417px]">
      <div className="flex flex-col">
        <div className=" relative">
          <IssueThumanil />
          <div className=" absolute top-0 right-0 z-30 mx-4 my-4">
            <CopyButton />
          </div>
        </div>

        <div className="t1 mt-4 flex flex-row justify-between">
          이슈 1
          <div>
            <MoreIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
