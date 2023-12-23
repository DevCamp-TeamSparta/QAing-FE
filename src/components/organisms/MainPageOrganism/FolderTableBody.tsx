import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Video } from '@/states/videoStore'
import { MoreSvg } from '../../../../public/icons/MoreSvg'
import { MyVideoSvg } from '../../../../public/icons/MyVideoSvg'
import { EditSvg } from '../../../../public/icons/EditSvg'
import { TrashSvg } from '../../../../public/icons/TrashSvg'
import { useModalStore } from '@/states/modalStore'
import DeleteFolderModal from '@/components/organisms/MainPageOrganism/DeleteFolderModal'
import { useClickOutSide } from '@/hooks/useClickOutSide'
import { Folder } from '@/types/userFolder.types'
import { editFolder } from '@/services/folder/folder.api'
import { useRouter } from 'next/navigation'

type Values = {
  newFolderName: string
}

export default function FolderTableBody({
  createdAt,
  issues,
  _id,
  folderName,
}: Folder) {
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isMoreButtonClicked, setIsMoreButtonClicked] = React.useState(false)
  const [isEditButtonClicked, setIsEditButtonClicked] = React.useState(false)
  const [isHovered, setIsHovered] = useState(false) // 폴더명 편집 버튼 hover 상태
  const [values, setValues] = useState<Values>({ newFolderName: folderName })
  const setModal = useModalStore(state => state.setModal)
  const router = useRouter()

  useClickOutSide(ref, onClickOutsideHandler, [isMoreButtonClicked])

  function onClickOutsideHandler() {
    if (isMoreButtonClicked) {
      setIsMoreButtonClicked(false)
    }
  }

  function onClickMoreButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setIsMoreButtonClicked(!isMoreButtonClicked)
  }

  // useEffect(() => {
  //   console.log('_id', _id)
  // })

  function onClickDeleteButtonHandler() {
    setIsMoreButtonClicked(false)
    setModal(<DeleteFolderModal folderId={_id} />)
  }

  function onClickEditButtonHandler(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation()
    setIsMoreButtonClicked(false)
    setIsEditButtonClicked(prev => !prev)
  }

  const dateObject = new Date(createdAt)
  const videoTableProps = {
    name: folderName || '폴더 이름을 변경해 주세요',
    count: issues.length || 0,
    createdAt: `${dateObject.getFullYear()}.${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${dateObject.getDate().toString().padStart(2, '0')}`,
    _id,
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }
  const handleEditFolderSubmit = (
    event: React.FormEvent,
    folderId: string,
    values: Values,
  ) => {
    event.preventDefault()
    if (values.newFolderName === '') return
    setIsEditButtonClicked(false)
    editFolder(folderId, values)
      .then(res => {
        // console.log('res', res)
        alert('폴더명이 변경되었습니다.')
      })
      .catch(err => {
        // console.error('err', err)
      })
  }

  // useEffect(() => {
  //   console.log('values', values)
  // }, [values])

  useEffect(() => {
    if (isEditButtonClicked && inputRef.current) {
      inputRef.current.focus() // input에 포커스
      inputRef.current.select() // 텍스트 선택
    }
  }, [isEditButtonClicked])

  return (
    //  TODO: Link tag로 변경
    <div className={'relative'}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (isEditButtonClicked) return
          router.push(`folders/${_id}/issues`)
        }}
        className={
          'grid grid-cols-[2fr_1fr_1fr_20px] px-[20px] py-[16px] border-b border-gray-300 ' +
          (isHovered ? 'bg-gray-200' : '') +
          ' active:bg-brand-background cursor-pointer'
        }
      >
        <p className="flex gap-[12px] b3">
          <MyVideoSvg color={'#959797'} size={'24'} />
          {isEditButtonClicked ? (
            <form
              className="flex gap-[10px]"
              onSubmit={event => handleEditFolderSubmit(event, _id, values)}
            >
              <div className="">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={videoTableProps.name}
                  onChange={handleChange}
                  name="newFolderName"
                  value={values.newFolderName}
                  onBlur={event => handleEditFolderSubmit(event, _id, values)}
                  maxLength={40}
                  className={
                    'overflow-hidden truncate w-[428px] ' +
                    (isHovered ? 'bg-gray-200' : '')
                  }
                />
              </div>
            </form>
          ) : (
            <p>{values.newFolderName}</p>
          )}
        </p>
        <p className={'b4'}>{videoTableProps.count}개</p>
        <p className={'b4'}>{videoTableProps.createdAt}</p>
        <button onClick={onClickMoreButtonHandler}>
          <MoreSvg />
        </button>
      </div>
      {isMoreButtonClicked && (
        <div
          ref={ref}
          className={
            'absolute w-[154px] p-[12px] top-[48px] right-[12px] bg-white rounded-[12px] shadow-[0_6px_14px_0_rgba(0,0,0,0.20)] [&>button]:p-[12px] [&>button]:flex [&>button]:items-center [&>button]:gap-[12px] [&>button]:rounded-[8px] z-10'
          }
        >
          <button
            className={'w-full hover:bg-gray-200'}
            onClick={onClickEditButtonHandler}
          >
            <EditSvg /> <p className={'b4'}>폴더명 편집</p>
          </button>
          <p className={'my-[4px] h-[1px] w-full bg-gray-400'} />
          <button
            className={'w-full hover:bg-gray-200 '}
            onClick={onClickDeleteButtonHandler}
          >
            <TrashSvg /> <p className={'b4'}>폴더 삭제</p>
          </button>
        </div>
      )}
    </div>
  )
}
