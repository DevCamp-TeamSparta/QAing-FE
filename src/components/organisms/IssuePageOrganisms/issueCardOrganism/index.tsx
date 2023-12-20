import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import IssueThumbnail from '@/components/atoms/issueThumbnailAtoms'
import CopyButton from '@/components/atoms/CopyButtonAtoms'
import MoreIcon from '../../../../../public/icons/More'
import { EditSvg } from '../../../../../public/icons/EditSvg'
import DeleteFolderModal from '../../MainPageOrganism/DeleteFolderModal'
import { TrashSvg } from '../../../../../public/icons/TrashSvg'
import { useModalStore } from '@/states/modalStore'
import { useClickOutSide } from '@/hooks/useClickOutSide'

interface IssueCardProps {
  IssueCardProps: {
    imageUrl: string
    videoUrl: string
    updatedAt: string
    issueName: string
    _id: string
  }
}

function Index({ IssueCardProps }: IssueCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { imageUrl, videoUrl, updatedAt, issueName, _id } = IssueCardProps
  const [isMoreButtonClicked, setIsMoreButtonClicked] = React.useState(false)
  const [isEditButtonClicked, setIsEditButtonClicked] = React.useState(false)
  const setModal = useModalStore(state => state.setModal)

  useClickOutSide(ref, onClickOutsideHandler, [isMoreButtonClicked])

  function onClickOutsideHandler() {
    if (isMoreButtonClicked) {
      setIsMoreButtonClicked(false)
    }
  }

  function onClickEditButtonHandler(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation()
    setIsEditButtonClicked(prev => !prev)
  }
  function onClickDeleteButtonHandler() {
    setIsMoreButtonClicked(false)
    setModal(<DeleteFolderModal folderId={_id} />)
  }
  function onClickMoreButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setIsMoreButtonClicked(!isMoreButtonClicked)
  }
  return (
    <div className="w-[440px] h-[417px] relative">
      <div className="flex flex-col">
        <div className=" relative">
          <IssueThumbnail imageUrl={imageUrl} videoUrl={videoUrl} />
          <div className="absolute top-0 right-0 z-30 mx-4 my-4">
            <CopyButton imageUrl={imageUrl} videoUrl={videoUrl} />
          </div>
        </div>
        <div className="t1 mt-4 flex flex-row justify-between">
          {issueName}
          <button onClick={onClickMoreButtonHandler}>
            <MoreIcon />
          </button>
          {isMoreButtonClicked && (
            <div
              ref={ref}
              className={
                'absolute w-[136px] px-[8px] py-[12px] bottom-[-90px] right-[12px] bg-white rounded-[12px] shadow-[0_6px_14px_0_rgba(0,0,0,0.20)] [&>button]:p-[12px] [&>button]:flex [&>button]:items-center [&>button]:gap-[12px] [&>button]:rounded-[8px] z-10'
              }
            >
              <button
                className={'w-full hover:bg-gray-200'}
                onClick={onClickEditButtonHandler}
              >
                <EditSvg color={'#5F6060'} />{' '}
                <p className={'b4'}>이슈명 편집</p>
              </button>

              <button
                className={'w-full hover:bg-gray-200 '}
                onClick={onClickDeleteButtonHandler}
              >
                <TrashSvg color={'#5F6060'} /> <p className={'b4'}>이슈 삭제</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Index
