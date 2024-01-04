import React, { useState, useRef, useCallback, useEffect, use } from 'react'
import { Stage, Layer, Image as KonvaImage, Rect } from 'react-konva'
import useImage from 'use-image'
import Konva from 'konva'
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
  const [image] = useImage(imageUrl)
  const stageRef = useRef<Konva.Stage>(null)
  const sizeRef = useRef<HTMLInputElement>(null)
  const [rect, setRect] = useState<Konva.RectConfig | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const handleMouseDown = useCallback(
    (event: Konva.KonvaEventObject<MouseEvent>) => {
      const pos = event.target.getStage()?.getPointerPosition()
      if (pos) {
        setRect({ x: pos.x, y: pos.y, width: 0, height: 0 })
        setIsDrawing(true)
      }
    },
    [],
  )

  const handleMouseMove = useCallback(
    (event: Konva.KonvaEventObject<MouseEvent>) => {
      if (!isDrawing || !rect) return
      if (!rect.x || !rect.y) return
      const stage = event.target.getStage()
      const point = stage?.getPointerPosition()
      if (point) {
        const newRect = {
          ...rect,
          width: point.x - rect.x,
          height: point.y - rect.y,
        }
        setRect(newRect)
      }
    },
    [isDrawing, rect],
  )

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false)
  }, [])

  const saveImage = useCallback(() => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL()
      // 여기에서 dataURL을 사용하여 서버에 저장하거나 다운로드할 수 있습니다.
    }
  }, [])

  const closeModal = () => {
    setModal(null)
  }

  const onClickThumbnailHandler = (mode: 'square' | 'clear') => {
    setMode(mode)
  }
  const modalRef = useRef<HTMLInputElement>(null)
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 })
  // useEffect(() => {
  //   if (image && modalRef.current) {
  //     // 모달의 크기를 가져옵니다.
  //     const modalWidth = modalRef.current.offsetWidth
  //     const modalHeight = modalRef.current.offsetHeight
  //     console.log(modalWidth, modalHeight)

  //     // 이미지와 모달의 비율을 계산합니다.
  //     const scaleX = modalWidth / image.width
  //     const scaleY = modalHeight / image.height
  //     const scale = Math.min(scaleX, scaleY, 1) // 이미지가 모달보다 크지 않도록 1을 최대값으로 설정

  //     // 스케일에 맞는 새로운 스테이지 크기를 설정합니다.
  //     const width = sizeRef.current?.offsetWidth
  //     const height = sizeRef.current?.offsetHeight
  //     setStageSize({
  //       width: width || 0,
  //       height: height || 0,
  //     })
  //   }
  // }, [sizeRef])
  console.log(sizeRef)
  useEffect(() => {
    if (!sizeRef.current) return

    // 스케일에 맞는 새로운 스테이지 크기를 설정합니다.
    const width = sizeRef.current?.offsetWidth
    const height = sizeRef.current?.offsetHeight
    console.log(width, height)
    setStageSize({
      width: width || 0,
      height: height || 0,
    })
  }, [sizeRef])

  useEffect(() => {
    console.log(stageSize)
  }, [stageSize])
  return (
    <div
      className={
        'w-full h-full  bg-white rounded-[8px] flex flex-col ref={modalRef}'
      }
    >
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
            onClick={saveImage}
            className={`flex gap-[8px] px-[20px] py-[8px] rounded-[8px] bg-primary-default b3 text-white [&>svg]:w-[20px] [&>svg]:h-[20px] hover:bg-primary-hover duration-150`}
          >
            저장
          </button>
        </div>
      </div>
      <div
        className={
          'tt h-full max-w-full px-[30px] py-[48px] bg-gray-200 rounded-[8px] relative'
        }
      >
        <div className={'flex w-full h-full relative   '} ref={sizeRef}>
          {sizeRef.current && (
            <Stage
              width={stageSize.width}
              height={stageSize.height}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              ref={stageRef}
              className="object-full"
            >
              <Layer>
                <KonvaImage image={image} />
                {rect && (
                  <Rect
                    x={rect.x}
                    y={rect.y}
                    width={rect.width}
                    height={rect.height}
                    stroke="red"
                    strokeWidth={2}
                    fillEnabled={false}
                  />
                )}
              </Layer>
            </Stage>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditImageModalOrganism
