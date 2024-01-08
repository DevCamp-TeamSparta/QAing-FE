import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useModalStore } from '@/states/modalStore'
import clsx from 'clsx'
import CopyLinkIcon from '../../../../../public/icons/CopyLinkIcon'
import { CloseIcon } from '../../../../../public/icons/CloseIcon'
import { TypeImageIcon } from '../../../../../public/icons/TypeImageIcon'
import { TypeVideoIcon } from '../../../../../public/icons/TypeVideoIcon'
import useClipboard from '@/hooks/useClipboard'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'

interface IssueModalProps {
  imageUrl: string
  videoUrl: string
}

//test commit
export default function TestIssueModal({
  imageUrl,
  videoUrl,
}: IssueModalProps) {
  const setModal = useModalStore(state => state.setModal)
  const [mode, setMode] = useState('image')
  const videoRef = useRef<HTMLVideoElement>(null)
  const player = useRef<any>(null)
  const [marks, setMarks] = useState<number[]>([])
  const [isMarkingDisabled, setIsMarkingDisabled] = useState(false)

  const addMark = () => {
    if (player.current && !isMarkingDisabled) {
      const currentTime = player.current.currentTime()
      // 새 마크를 현재 마크 배열에 추가
      setMarks(prevMarks => [...prevMarks, currentTime])
      setIsMarkingDisabled(true)
      setTimeout(() => {
        setIsMarkingDisabled(false)
      }, 1000)
      setTimeout(() => {
        setIsMarkingDisabled(false)
      }, 1000)
    }
  }

  const onClickThumbnailHandler = (selectedMode: 'image' | 'video') => {
    setMode(selectedMode)
  }

  const { handleCopyClipBoard } = useClipboard()

  const onClickCopyLinkHandler = async () => {
    const url = mode === 'image' ? imageUrl : videoUrl
    await handleCopyClipBoard(url)
  }

  const closeModal = () => {
    setModal(null)
  }

  const updateMarksOnScreen = () => {
    if (!player.current) return

    if (player.current) {
      const isPlaying = !player.current.paused()
      setIsMarkingDisabled(!isPlaying) // 비디오 재생 중이 아니면 버튼 비활성화
    }

    const progressBarLength = player.current
      .el()
      .querySelector('.vjs-progress-holder').offsetWidth
    const playBtnLength = player.current
      .el()
      .querySelector('.vjs-play-control').offsetWidth
    const duration = player.current.duration()
    const progressBarHeight = player.current.controlBar.progressControl.height()

    let marksContainer = document.querySelector(
      '.video-marks-container',
    ) as HTMLElement
    if (!marksContainer) {
      marksContainer = document.createElement('div') as HTMLElement
      marksContainer.className = 'video-marks-container'
      player.current.el().appendChild(marksContainer)
    }

    marks.forEach((mark: any, index: any) => {
      let markElement = document.getElementById(`mark-${index}`)
      const markPosition = (mark / duration) * progressBarLength + playBtnLength
      if (!markElement) {
        // 새로운 마크를 DOM에 추가
        markElement = document.createElement('div')
        markElement.id = `mark-${index}`
        markElement.className = 'video-mark'
        markElement.textContent = '✅' // 마크 표시
        markElement.setAttribute('currentTime', mark.toString())
        marksContainer?.appendChild(markElement)
      }
      markElement.style.left = `${markPosition}px`
      markElement.style.top = `calc(100% - ${progressBarHeight}px - 10px)`
      markElement.style.position = 'absolute'
    })
  }

  useEffect(() => {
    if (mode !== 'image' && videoRef.current) {
      player.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: 'metadata',
        controlBar: {
          pictureInPictureToggle: false,
          volumePanel: false,
        },
      })

      const backwardButton = player.current.controlBar.addChild('button')
      backwardButton.addClass('vjs-icon-replay-5')
      backwardButton.controlText('-5 sec')
      backwardButton.el().onclick = () => {
        player.current.currentTime(player.current?.currentTime() - 5)
      }

      const forwardButton = player.current.controlBar.addChild('button')
      forwardButton.addClass('vjs-icon-forward-5')
      forwardButton.controlText('+5 sec')
      forwardButton.el().onclick = () => {
        player.current.currentTime(player.current?.currentTime() + 5)
      }

      const handleKeyPress = (event: KeyboardEvent) => {
        if (!player.current) return

        switch (event.key) {
          case 'Enter':
            player.current.isFullscreen()
              ? player.current.exitFullscreen()
              : player.current.requestFullscreen()
            break
          case 'ArrowLeft':
            player.current.currentTime(player.current.currentTime() - 5)
            break
          case 'ArrowRight':
            player.current.currentTime(player.current.currentTime() + 5)
            break
          case ' ':
            if (player.current.paused()) {
              player.current.play()
            } else {
              player.current.pause()
            }
            event.preventDefault()
            break
          case 'm' || 'M':
            event.preventDefault() // M 키의 기본 동작 (예: 스크롤)을 방지합니다.
            addMark()
            break
          default:
            break
        }
      }

      const videoJsPlayerDiv = videoRef.current.parentNode
      const emojiContainer = document.createElement('div') as HTMLElement
      emojiContainer.className = 'video-marks-container'
      emojiContainer.style.width = '100%'
      emojiContainer.style.height = '100%'
      let root: any

      if (videoJsPlayerDiv) {
        videoJsPlayerDiv.appendChild(emojiContainer)
        root = createRoot(emojiContainer)
      }

      player.current.on('loadedmetadata', updateMarksOnScreen)
      player.current.on('timeupdate', updateMarksOnScreen)
      window.addEventListener('resize', updateMarksOnScreen)
      player.current.on('fullscreenchange', () => {
        if (player.current.isFullscreen()) {
          const emojiElements = document.querySelectorAll('.video-mark')
          emojiElements.forEach((emojiElement, index) => {
            if (emojiElement instanceof HTMLElement) {
              const markElement = document.getElementById(`mark-${index}`)
              const progressBarLength = player.current
                .el()
                .querySelector('.vjs-progress-holder').offsetWidth
              const playBtnLength = player.current
                .el()
                .querySelector('.vjs-play-control').offsetWidth
              const duration = player.current.duration()
              const currentTime = Number(
                markElement?.getAttribute('currentTime'),
              )
              const markPosition =
                (currentTime / duration) * progressBarLength + playBtnLength
              emojiElement.style.transform = 'scale(1.5)'
              emojiElement.style.left = `${markPosition}px`
            }
          })
        } else {
          // 일반 모드인 경우 이모지 크기를 원래 크기로 복원
          const emojiElements = document.querySelectorAll('.video-mark')
          emojiElements.forEach((emojiElement, index) => {
            if (emojiElement instanceof HTMLElement) {
              const markElement = document.getElementById(`mark-${index}`)
              const progressBarLength = player.current
                .el()
                .querySelector('.vjs-progress-holder').offsetWidth
              const playBtnLength = player.current
                .el()
                .querySelector('.vjs-play-control').offsetWidth
              const duration = player.current.duration()
              const currentTime = Number(
                markElement?.getAttribute('currentTime'),
              )
              const markPosition =
                (currentTime / duration) * progressBarLength + playBtnLength
              emojiElement.style.transform = 'scale(1)'
              emojiElement.style.left = `${markPosition}px`
            }
          })
        }
      })
      document.addEventListener('keydown', handleKeyPress)

      // 비디오 재생 상태를 감시하고 버튼 업데이트
      player.current.on('play', updateMarksOnScreen)
      player.current.on('pause', updateMarksOnScreen)
      player.current.on('ended', updateMarksOnScreen)

      return () => {
        if (root) {
          setTimeout(() => {
            root.unmount()
            if (videoJsPlayerDiv) {
              videoJsPlayerDiv.removeChild(emojiContainer)
            }
          }, 0)
        }
        if (player.current) {
          player.current.off('loadedmetadata', updateMarksOnScreen)
          player.current.off('fullscreenchange')
          player.current.dispose()
          player.current = null
        }
        window.removeEventListener('resize', updateMarksOnScreen)
        document.removeEventListener('keydown', handleKeyPress)
      }
    }
  }, [mode])

  useEffect(() => {
    updateMarksOnScreen()
  }, [marks])

  // 이모지 클릭 시 비디오 시점으로 이동하는 함수
  const handleEmojiClick = (event: MouseEvent) => {
    const emojiElement = event.target as HTMLElement
    const currentTime = emojiElement.getAttribute('currentTime')
    if (currentTime && player.current) {
      player.current.currentTime(parseFloat(currentTime) - 0.5)
    }
  }

  // 이모지 클릭 이벤트를 추가
  document.addEventListener('click', (event: MouseEvent) => {
    const emojiElement = event.target as HTMLElement
    if (emojiElement.classList.contains('video-mark')) {
      handleEmojiClick(event)
    }
  })

  // 이모지에 마우스 오버 이벤트를 추가
  document.addEventListener('mouseover', (event: MouseEvent) => {
    const emojiElement = event.target as HTMLElement
    if (emojiElement.classList.contains('video-mark')) {
      emojiElement.style.cursor = 'pointer'
    }
  })

  return (
    <div className={'h-screen w-full px-[13%] py-[2%] fixed top-0 left-0'}>
      <div className={'w-full h-full bg-white rounded-[8px] flex flex-col'}>
        <div
          className={
            'relative px-[20px] py-[12px] flex items-center gap-[12px] justify-between'
          }
        >
          <button
            className={
              'p-[8px] rounded-[8px] duration-150 [&>svg]:w-[20px] [&>svg]:h-[20px] hover:bg-gray-200'
            }
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
          <div
            className={`absolute left-[50%] translate-x-[-50%] flex [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:gap-[4px] [&>button]:w-[106px] [&>button]:h-[36px] [&>button]:b3`}
          >
            <button
              className={clsx(
                'border rounded-l-[8px] [&>svg]:w-[20px] [&>svg]:h-[20px]',
                {
                  'bg-primary-default border-primary-default text-white':
                    mode === 'image',
                  'bg-white border-gray-500 text-gray-700 border-r-primary-default':
                    mode !== 'image',
                },
              )}
              onClick={() => onClickThumbnailHandler('image')}
            >
              <TypeImageIcon color={mode === 'image' ? '#FFFFFF' : '#808181'} />{' '}
              이미지
            </button>
            <button
              className={clsx(
                'border rounded-r-[8px] [&>svg]:w-[20px] [&>svg]:h-[20px]',
                {
                  'bg-primary-default border-primary-default text-white':
                    mode === 'video',
                  'bg-white border-gray-500 text-gray-700 border-l-primary-default':
                    mode !== 'video',
                },
              )}
              onClick={() => onClickThumbnailHandler('video')}
            >
              <TypeVideoIcon color={mode === 'video' ? '#FFFFFF' : '#808181'} />{' '}
              20초 영상
            </button>
          </div>
          <button
            className={`flex gap-[8px] px-[20px] py-[8px] rounded-[99px] bg-primary-default b3 text-white [&>svg]:w-[20px] [&>svg]:h-[20px] hover:bg-primary-hover duration-150`}
            onClick={onClickCopyLinkHandler}
          >
            <CopyLinkIcon color={'#FFFFFF'} /> 링크 복사하기
          </button>
        </div>
        <div
          className={
            'h-full max-w-full px-[30px] py-[48px] bg-gray-200 rounded-[8px] relative'
          }
        >
          <div className={'flex w-full h-full relative'}>
            {mode === 'image' ? (
              <div
                className={
                  'h-full w-full flex justify-center items-center absolute'
                }
              >
                <Image
                  className={
                    'h-full w-full rounded-[8px] overflow-hidden object-fit'
                  }
                  width={1080}
                  height={720}
                  src={imageUrl}
                  alt="issue"
                />
              </div>
            ) : (
              <div>
                <div
                  className={
                    'h-full w-full max-h-full flex justify-center items-center absolute'
                  }
                >
                  <video
                    ref={videoRef}
                    className={'video-js'}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                </div>
              </div>
            )}
          </div>
          {mode === 'video' && (
            <button
              onClick={addMark}
              disabled={isMarkingDisabled}
              className={'add-mark-btn'}
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 10,
              }}
            >
              마킹 추가
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
