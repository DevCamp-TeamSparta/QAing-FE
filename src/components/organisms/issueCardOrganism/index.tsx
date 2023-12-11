import React from 'react'
import IssueThumanil from '@/components/atoms/issueThumbnailAtoms/index'
import CopyButton from '@/components/atoms/CopyButtonAtoms/index'

function index() {
  return (
    <div className="bg-gray-100 w-[440px] h-[417px]">
      <div className="flex flex-col">
        <div className=" relative">
          <IssueThumanil />
          <div className=" absolute top-0 right-0">
            <CopyButton />
          </div>
        </div>

        <div>제목</div>
      </div>
    </div>
  )
}

export default index
