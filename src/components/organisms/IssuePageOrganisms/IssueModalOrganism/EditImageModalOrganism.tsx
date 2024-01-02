import { useState } from 'react'
import Image from 'next/image'
import { useModalStore } from '@/states/modalStore'
import clsx from 'clsx'
import { CloseIcon } from '../../../../../public/icons/CloseIcon'
import { DeleteSvg } from '../../../../../public/icons/DeleteSvg'
import { ResetSvg } from '../../../../../public/icons/ResetSvg'

interface EditImageModalProps {
  imageUrl: string
}

function EditImageModalOrganism({ imageUrl }: EditImageModalProps) {
  const setModal = useModalStore(state => state.setModal)
  const [mode, setMode] = useState<'square' | 'clear'>()
  function onClickThumbnailHandler(mode: 'square' | 'clear') {
    setMode(mode)
  }
  function closeModal() {
    setModal(null)
  }

  return (
    <div>
      <div className={'w-full h-full  bg-white rounded-[8px] flex flex-col'}>
        <div
          className={
            'relative px-[20px] py-[12px] flex items-center gap-[12px] justify-between '
          }
        >
          <button
            className={
              'p-[8px] rounded-[8px] duration-150  [&>svg]:w-[20px] [&>svg]:h-[20px] hover:bg-gray-200'
            }
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
          <div
            className={` flex gap-2 
            [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:gap-[4px]  [&>button]:h-[36px] [&>button]:b4 [&>button]:bg-gray-300
            `}
          ></div>

          <div className="flex flex-row gap-2 items-center ">
            <button
              className={clsx(
                'border p-[9px]  rounded-[8px] [&>svg]:w-[20px] [&>svg]:h-[20px] ',
              )}
              onClick={() => onClickThumbnailHandler('square')}
            >
              <div className="mx-[12px] border-[2px] border-sementic-danger w-[16px] h-[16px]"></div>
            </button>
            <button
              className={clsx(
                'border px-[18px] py-2 rounded-[8px]  [&>svg]:h-[20px]',
              )}
              onClick={() => onClickThumbnailHandler('clear')}
            >
              <DeleteSvg />
            </button>
            <button
              className={clsx(
                'border  rounded-[8px] px-[18px] py-2 [&>svg]:w-[20px] [&>svg]:h-[20px]',
              )}
              onClick={() => onClickThumbnailHandler('clear')}
            >
              <ResetSvg />
            </button>
            <div className="m-[12px] border border-gray-400 h-[28px]  " />
            <button
              className={`flex gap-[8px] px-[20px] py-[8px] rounded-[8px] bg-gray-300 b3  [&>svg]:w-[20px] [&>svg]:h-[20px] hover:bg-primary-hover duration-150`}
            >
              취소
            </button>
            <button
              className={`flex gap-[8px] px-[20px] py-[8px] rounded-[8px] bg-primary-default b3 text-white [&>svg]:w-[20px] [&>svg]:h-[20px] hover:bg-primary-hover duration-150`}
            >
              저장
            </button>
          </div>
        </div>
        <div
          className={
            'h-full max-w-full px-[30px] py-[48px] bg-gray-200 rounded-[8px] relative'
          }
        >
          <div className={'flex w-full h-full relative'}>
            <div className="w-full h-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditImageModalOrganism
