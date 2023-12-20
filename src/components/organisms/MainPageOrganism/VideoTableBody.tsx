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

type Values = {
  newFolderName: string
}

export default function VideoTableBody({ createdAt, issues, _id }: Folder) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMoreButtonClicked, setIsMoreButtonClicked] = React.useState(false)
  const [isEditButtonClicked, setIsEditButtonClicked] = React.useState(false)
  const [values, setValues] = useState<Values>({ newFolderName: '2023-12-20' })
  const setModal = useModalStore(state => state.setModal)
  const inputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    console.log('_id', _id)
  })

  function onClickDeleteButtonHandler() {
    setIsMoreButtonClicked(false)
    setModal(<DeleteFolderModal folderId={_id} />)
  }

  function onClickEditButtonHandler(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation()
    setIsEditButtonClicked(prev => !prev)
  }

  const dateObject = new Date(createdAt)
  const videoTableProps = {
    name: createdAt.substring(0, 10) || '0',
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
  const handleEditFolderSubmit = (folderId: string, values: object) => {
    editFolder(folderId, values)
      .then(res => {
        console.log('res', res)
        alert('폴더명이 변경되었습니다.')
      })
      .catch(err => {
        console.error('err', err)
      })
  }

  useEffect(() => {
    console.log('values', values)
  }, [values])

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
        onClick={() => {
          if (isEditButtonClicked) return
          alert('클릭')
        }}
        className={
          'grid grid-cols-[2fr_1fr_1fr_20px] px-[20px] py-[16px] border-b border-gray-300 hover:bg-gray-200 active:bg-brand-background cursor-pointer'
        }
      >
        <p className="flex gap-[12px] b3">
          {isEditButtonClicked ? (
            <form
              className="flex gap-[10px]"
              onSubmit={() => handleEditFolderSubmit(_id, values)}
            >
              <MyVideoSvg color={'#959797'} />
              <div className="">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={videoTableProps.name}
                  onChange={handleChange}
                  name="newFolderName"
                  value={values.newFolderName}
                  onBlur={() => setIsEditButtonClicked(false)}
                  maxLength={40}
                  className="  overflow-hidden truncate placeholder:text-black bg-white w-[428px]"
                />
              </div>
            </form>
          ) : (
            <>
              <MyVideoSvg color={'#959797'} /> {videoTableProps.name}
            </>
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
