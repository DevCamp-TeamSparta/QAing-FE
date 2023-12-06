'use client'

import CTAButton from '@/components/atoms/CallToActionAButton'
import { useVideoStore } from '@/states/videoStore'

const Descriptions = [
  { icon: '📌', text: '이슈 저장 시 캡쳐 및 앞뒤 10초의 영상 자동저장' },
  { icon: '🧑🏻‍💻', text: '저장한 이슈를 이미지 또는 영상, 필요한대로 선택' },
  { icon: '🔗', text: '이슈 이미지 또는 영상을  URL로 빠른 공유' },
]

export default function EmptyVideo() {
  const addVideo = useVideoStore(state => state.addVideo)
  function onClickStartButtonHandler() {
    addVideo({
      name: '2023-11-15 16:24',
      issueNum: 8,
      createdAt: new Date(),
    })
  }
  return (
    <div
      className={
        'w-full h-full flex flex-col justify-center items-center text-center'
      }
    >
      <h2 className={'text-[32px] font-semibold'}>
        QAing과 함께
        <br />
        빠르게 QA를 하러 가볼까요?
      </h2>
      <div className={'flex flex-col gap-[12px] mt-[40px]'}>
        {Descriptions.map(({ icon, text }) => (
          <div
            key={`qaing empty video description ${text}`}
            className={
              'flex items-center gap-[12px] px-[28px] py-[12px] rounded-[16px] bg-gray-200'
            }
          >
            <span className={'text-[20px] font-semibold'} >{icon}</span>
            <span className={'b4'}>{text}</span>
          </div>
        ))}
      </div>
      <div className={'mt-[20px] text-[#5C5C5C] b4'}>
        <p>* 이슈를 저장하지 않으면 전체 영상은 저장되지 않아요</p>
        <p>* 오디오는 녹음되지 않아요</p>
      </div>
      <CTAButton
        className={'mt-[40px]'}
        size={'medium'}
        onClick={onClickStartButtonHandler}
      >
        QA 시작하기
      </CTAButton>
    </div>
  )
}
