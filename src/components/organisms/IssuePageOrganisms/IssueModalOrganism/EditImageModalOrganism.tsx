import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Rect,
  Line,
  Text,
  Transformer,
} from 'react-konva'
import useImage from 'use-image'
import Konva from 'konva'
import { useModalStore } from '@/states/modalStore'
import clsx from 'clsx'
import { CloseIcon } from '../../../../../public/icons/CloseIcon'
import { DeleteSvg } from '../../../../../public/icons/DeleteSvg'
import { ResetSvg } from '../../../../../public/icons/ResetSvg'
import { TextIconSvg } from '../../../../../public/icons/TextIconSvg'
import { EraseCursor } from '../../../../../public/icons/EraseCursor'
import {
  getPresignedURL,
  uploadEditedImageToBackend,
  uploadImageToS3,
} from '@/services/auth/auth.api'
import { v4 as uuidv4 } from 'uuid'
import { useIssueStore } from '@/states/issue-store'

interface EditImageModalProps {
  imageUrl: string
  imageId: string
  onClickPreviewThumbnailHandler: (
    mode: 'image' | 'video' | 'editImage',
  ) => void
  setMode: Dispatch<SetStateAction<'image' | 'video' | 'editImage'>>
  currentImageUrl: string | null | undefined
}

// 라인의 타입 정의
interface Line {
  points: number[]
}

function EditImageModalOrganism({
  imageUrl,
  currentImageUrl,
  imageId,
  onClickPreviewThumbnailHandler,
}: EditImageModalProps) {
  const setModal = useModalStore(state => state.setModal)
  const [editMode, setEditMode] = useState<
    'text' | 'square' | 'eraser' | 'reset'
  >()
  const [image] = useImage(
    currentImageUrl ? currentImageUrl : imageUrl,
    'anonymous',
  )
  const stageRef = useRef<Konva.Stage>(null)
  const sizeRef = useRef<HTMLInputElement>(null)
  const [rect, setRect] = useState<Konva.RectConfig | null>(null)
  const [rects, setRects] = useState<Konva.RectConfig[]>([]) // 도형들을 저장할 배열 상태
  const [isDrawing, setIsDrawing] = useState(false)
  const [selectedRect, setSelectedRect] = useState<number | null>(null) // 선택된 Rect의 인덱스 저장
  const [isActive, setIsActive] = useState({
    text: false,
    square: false,
    eraser: false,
    reset: false,
  })
  //텍스트 추가
  const [textFields, setTextFields] = useState<
    { x: any; y: any; text: string; isNew?: boolean }[]
  >([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  //편집된 이미지 관련
  const [editedImage, setEditedImage] = useState<File | null>(null)
  const [updatedImageUrl, setUpdatedImageUrl] = useState<string | null>(null)

  // 커서 스타일 정의
  const eraserCursorStyle =
    editMode === 'eraser'
      ? { cursor: `url('/public/icons/eraseCursor.png'), auto` }
      : {}
  //이미지 편집이 완료되면 folder업데이트
  const { folder, setFolder } = useIssueStore()
  const [isImageEdited, setIsImageEdited] = useState(false)

  const getCursorStyle = () => {
    switch (editMode) {
      case 'square':
        return 'cursor-crosshair'
      case 'eraser':
        return 'eraserCursorStyle' // 'eraserCursorStyle'는 해당 스타일을 정의하는 CSS 클래스 이름
      default:
        return ''
    }
  }
  // 커서 스타일 적용
  const cursorStyle = getCursorStyle()

  const erasing = useRef(false)

  //마우스 클릭
  const handleMouseDown = useCallback(
    (event: Konva.KonvaEventObject<MouseEvent>) => {
      const pos = event.target.getStage()?.getPointerPosition()
      if (editMode === 'square') {
        // 'square' 모드일 때만 도형 그리기
        if (!pos) return
        setRect({ x: pos.x, y: pos.y, width: 0, height: 0 }) // 초기 사각형 설정
        setIsDrawing(true)
      }
      if (editMode === 'text') {
        if (event.target === stageRef.current) {
          const stage = stageRef.current
          const pointerPosition = stage.getPointerPosition()
          console.log('pointerPosition', pointerPosition)

          if (pointerPosition) {
            setTextFields([
              ...textFields,
              {
                x: pointerPosition.x,
                y: pointerPosition.y,
                text: '',
                isNew: true,
              },
            ])
          }
        }
      }
    },
    [editMode],
  )

  useEffect(() => {
    console.log('textFields', setTextFields)
  }, [textFields])

  // 마우스 클릭 후 이동
  const handleMouseMove = useCallback(
    (event: Konva.KonvaEventObject<MouseEvent>) => {
      if (editMode === 'square') {
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
      }
      if (editMode === 'eraser' && erasing.current) {
        const stage = event.target.getStage()
      }
    },
    [isDrawing, rect, editMode],
  )

  // 마우스 클릭 종료
  const handleMouseUp = useCallback(() => {
    if (editMode === 'square' && rect) {
      setRects([...rects, rect]) // 마우스를 떼면 현재 사각형을 배열에 추가
      setRect(null) // 다음 사각형을 위해 현재 사각형 상태 초기화
    }
    if (editMode === 'eraser') {
      erasing.current = false // 드래그 종료
    }
    setIsDrawing(false)
  }, [rect, rects, editMode])

  //이미지 저장
  const saveImageWithShapes = async () => {
    if (stageRef.current) {
      // console.log('imageUrl', imageUrl)
      // console.log('rects', rects)
      if (rects.length === 0) return
      const dataURL = stageRef.current.toDataURL({
        mimeType: 'image/webp',
        quality: 1,
      })

      // Base64 데이터를 Blob으로 변환
      const base64Response = await fetch(dataURL)
      const blob = await base64Response.blob()
      const uuid = uuidv4() + '.png'

      // Blob을 File 객체로 변환
      const file = new File([blob], uuid, { type: 'image/png' })

      // 여기서 File 객체 사용
      // console.log(file)
      // setUpdatedImageUrl(dataURL)
      setEditedImage(file)
    }
  }

  useEffect(() => {
    if (!editedImage) return
    // console.log('editedImage', editedImage)
    const handleSubmitEditedImage = async () => {
      getPresignedURL(editedImage).then(data => {
        // console.log('presigned data', data)
        uploadImageToS3(data.url, editedImage).then(data => {
          // console.log('s3 버킷에 저장 완료', data)
          uploadEditedImageToBackend(editedImage, false, imageUrl).then(
            data => {
              // console.log('백백엔드에 저장 API test', data)
              // setIsImageEdited(true)
              setUpdatedImageUrl(data.fileUrl)
            },
          )
        })
      })
    }
    handleSubmitEditedImage()
  }, [editedImage])

  useEffect(() => {
    console.log('맵돌린다', updatedImageUrl)
    if (!folder) return
    if (!updatedImageUrl) return
    console.log('folder', folder)
    const updatedFolder = folder.map((items, index) => {
      if (items.images[0]._id === imageId) {
        return {
          ...items,
          images: [{ ...items.images[0], editedImageUrl: updatedImageUrl }],
        }
      }
      return items
    })
    console.log('items', updatedFolder)
    setFolder(updatedFolder)
  }, [updatedImageUrl])

  // Rect 클릭 핸들러
  const handleRectClick = (index: number) => {
    if (editMode === 'eraser') {
      // eraser 모드에서는 Rect를 제거
      setRects(rects.filter((_, rectIndex) => rectIndex !== index))
    } else {
      // 다른 모드에서는 Rect 선택
      setSelectedRect(index)
    }
  }
  // Reset 버튼 클릭 핸들러
  const handleReset = () => {
    setRects([]) // 모든 Rect 객체 제거
    onClickThumbnailHandler('reset')
  }

  const closeModal = () => {
    setModal(null)
  }

  const onClickThumbnailHandler = (
    mode: 'text' | 'square' | 'eraser' | 'reset',
  ) => {
    setEditMode(mode)
    setIsActive({
      text: false,
      square: false,
      eraser: false,
      reset: false,
      [mode]: !isActive[mode],
    })
  }

  const [stageSize, setStageSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!sizeRef.current) return

    // 스케일에 맞는 새로운 스테이지 크기를 설정합니다.
    const width = sizeRef.current?.offsetWidth
    const height = sizeRef.current?.offsetHeight
    // console.log(width, height)
    setStageSize({
      width: width || 0,
      height: height || 0,
    })
  }, [sizeRef])

  useEffect(() => {
    console.log('mode', editMode)
  }, [editMode])

  //텍스트추가
  const handleTextDblClick = (
    e: Konva.KonvaEventObject<MouseEvent>,
    index: number,
  ) => {
    const textNode = e.target as Konva.Text
    const textPosition = textNode.absolutePosition()
    const stage = textNode.getStage()
    const inputArea = document.createElement('input')
    document.body.appendChild(inputArea)

    inputArea.value = textNode.text()
    inputArea.style.position = 'absolute'
    inputArea.style.top = `${textPosition.y}px`
    inputArea.style.left = `${textPosition.x}px`
    inputArea.style.width = `${textNode.width()}px`

    inputArea.focus()

    inputArea.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        textFields[index].text = this.value
        textFields[index].isNew = false
        setTextFields([...textFields])
        document.body.removeChild(this)
      }
    })
  }

  return (
    <div
      className={
        'w-full h-full  bg-white rounded-[8px] flex flex-col ref={modalRef}'
      }
    >
      <div
        className={
          'relative px-[20px] py-[12px]  flex items-center  justify-between '
        }
      >
        <button
          className={
            ' rounded-[8px] ml-2  duration-150  [&>svg]:w-[20px] [&>svg]:h-[20px] hover:bg-gray-200'
          }
          onClick={closeModal}
        >
          <CloseIcon />
        </button>

        <div className="flex flex-row items-center ">
          <button
            className={clsx(
              `py-[6px] px-[14px]  rounded-[8px] ${
                isActive.text ? 'bg-primary-default' : ''
              } `,
            )}
            onClick={() => {
              onClickThumbnailHandler('text')
            }}
          >
            <TextIconSvg color={`${isActive.text ? '#fff' : '#1B1B1B'}`} />
          </button>

          <button
            className={clsx(
              `py-[6px] px-[14px] rounded-[8px] ${
                isActive.square ? 'bg-primary-default' : ''
              }`,
            )}
            onClick={() => onClickThumbnailHandler('square')}
          >
            <div
              className={`border-[2px] ${
                isActive.square ? 'border-[#fff]' : 'border-extra-black'
              }  w-[20px] h-[20px]`}
            ></div>
          </button>
          <button
            className={clsx(
              `py-[6px] px-[14px] rounded-[8px] ${
                isActive.eraser ? 'bg-primary-default' : ''
              }`,
            )}
            onClick={() => onClickThumbnailHandler('eraser')}
          >
            <DeleteSvg color={`${isActive.eraser ? '#fff' : '#1B1B1B'}`} />
          </button>
          <button
            onClick={handleReset}
            className={clsx(
              `py-[6px] px-[14px] rounded-[8px] ${
                isActive.reset ? 'bg-primary-default' : ''
              }`,
            )}
          >
            <ResetSvg color={`${isActive.reset ? '#fff' : '#1B1B1B'}`} />
          </button>
          <div className="flex flex-row gap-2">
            <div className="mx-[12px] my-1 border border-gray-400 h-[28px]  " />
            <button
              onClick={() => onClickPreviewThumbnailHandler('image')}
              className={` px-[20px] py-[8px] rounded-[8px] bg-gray-300 b3  [&>svg]:w-[20px] [&>svg]:h-[20px] hover:bg-primary-hover duration-150`}
            >
              취소
            </button>
            <button
              onClick={saveImageWithShapes}
              className={`px-[20px] py-[8px] rounded-[8px] bg-primary-default b3 text-white  hover:bg-primary-hover duration-150`}
            >
              저장
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          'tt h-full max-w-full px-[30px] py-[48px] bg-gray-200 rounded-[8px] relative'
        }
      >
        <div
          className={'flex w-full h-full object-cover overflow-hidden  '}
          ref={sizeRef}
        >
          {sizeRef.current && (
            <Stage
              width={stageSize.width}
              height={stageSize.height}
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              ref={stageRef}
              className={cursorStyle}
            >
              <Layer>
                <KonvaImage
                  image={image}
                  width={stageSize.width}
                  height={stageSize.height}
                />

                {rects.map((rect, index) => (
                  <Rect
                    key={index}
                    x={rect.x}
                    y={rect.y}
                    width={rect.width}
                    height={rect.height}
                    stroke="red"
                    strokeWidth={4}
                    hitStrokeWidth={22}
                    fillEnabled={false}
                    onClick={() => handleRectClick(index)}
                  />
                ))}

                {isDrawing && rect && (
                  <Rect // 현재 그리고 있는 사각형을 렌더링
                    {...rect}
                    stroke="red"
                    strokeWidth={5}
                    fillEnabled={false}
                  />
                )}
                <Text text="Try click on rect" />
              </Layer>
            </Stage>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditImageModalOrganism
