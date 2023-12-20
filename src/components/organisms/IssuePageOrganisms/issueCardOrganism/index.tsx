import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import IssueThumbnail from '@/components/atoms/issueThumbnailAtoms'
import CopyButton from '@/components/atoms/CopyButtonAtoms'
import MoreIcon from '../../../../../public/icons/More'
import { EditSvg } from '../../../../../public/icons/EditSvg'
import DeleteIssueModal from '../DeleteIssueModal'
import { TrashSvg } from '../../../../../public/icons/TrashSvg'
import { useModalStore } from '@/states/modalStore'
import { useClickOutSide } from '@/hooks/useClickOutSide'
import { TypeImageIcon } from '../../../../../public/icons/TypeImageIcon'
import { TypeVideoIcon } from '../../../../../public/icons/TypeVideoIcon'
import CopyLinkIcon from '../../../../../public/icons/CopyLinkIcon'

interface IssueCardProps {
  IssueCardProps: {
    imageUrl: string
    videoUrl: string
    updatedAt: string
    issueName: string
    _id: string
  }
  folderId: string
  folderName: string
}

type Values = {
  newFolderName: string
}

function Index({ IssueCardProps, folderId, folderName }: IssueCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const { imageUrl, videoUrl, updatedAt, issueName, _id } = IssueCardProps
  const [isMoreButtonClicked, setIsMoreButtonClicked] = React.useState(false)
  const [isCopyButtonClicked, setIsCopyButtonClicked] = React.useState(false)
  const [isEditButtonClicked, setIsEditButtonClicked] = React.useState(false)
  const setModal = useModalStore(state => state.setModal)
  const [values, setValues] = useState<Values>({ newFolderName: issueName })

  useClickOutSide(ref, onClickOutsideHandler, [isMoreButtonClicked])
  useClickOutSide(copyRef, onClickOutsideHandler, [isCopyButtonClicked])

  function onClickOutsideHandler() {
    if (isMoreButtonClicked) {
      setIsMoreButtonClicked(false)
    }
    if (isCopyButtonClicked) {
      setIsCopyButtonClicked(false)
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
    setModal(<DeleteIssueModal issueID={_id} folderId={folderId} />)
  }
  function onClickMoreButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setIsMoreButtonClicked(!isMoreButtonClicked)
  }
  function onClickCopyButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setIsCopyButtonClicked(!isCopyButtonClicked)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  useEffect(() => {
    console.log('folderId', folderId)
  }, [])

  return (
    <div className="w-[440px] h-[417px] relative">
      <div className="flex flex-col">
        <div className=" relative">
          <IssueThumbnail imageUrl={imageUrl} videoUrl={videoUrl} />
          <button
            onClick={onClickCopyButtonHandler}
            className="absolute top-0 right-0 z-30 mx-4 my-4 bg-primary-default w-[44px] h-[44px] rounded-[99px] flex flex-row justify-center items-center shadow-copybutton"
          >
            <CopyLinkIcon color={'#FFFFFF'} />
            {/* <CopyButton /> */}
          </button>
          {isCopyButtonClicked && (
            <div ref={copyRef} className={`relative `}>
              <div className="absolute bottom-[76px] right-[16px] bg-white py-5 px-[15px] rounded-2xl shadow-[0_6px_22px_0_rgba(0,0,0,0.20)] ">
                <div className="flex flex-col gap-3">
                  <div className="rounded-2xl px-4 py-[10px] bg-gray-200 ">
                    <div className="flex flex-row ">
                      <div className="py-1 mr-3">
                        <div className="bg-white rounded-[99px]  p-2 ">
                          <TypeImageIcon color={'#00CCCC'} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mr-[30px]">
                        <p className="b2">이미지</p>
                        <p className="b4 text-gray-600">로 공유하기</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl px-4 py-[10px] bg-gray-200 ">
                    <div className="flex flex-row ">
                      <div className="py-1 mr-3">
                        <div className="bg-white rounded-[99px] p-2">
                          <TypeVideoIcon color={'#00CCCC'} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mr-[30px]">
                        <p className="b2">앞뒤 10초 영상</p>
                        <p className="b4 text-gray-600">로 공유하기</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                'absolute w-[136px] px-[8px] py-[12px] bottom-[-90px] right-[12px] bg-white rounded-[12px] shadow-[0_6px_14px_0_rgba(0,0,0,0.20)] [&>button]:p-[12px] [&>button]:flex [&>button]:items-center [&>button]:gap-[12px] [&>button]:rounded-[8px] z-40'
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
