'use client'

import CTAButton from '@/components/atoms/CallToActionAButton'
import { useVideoStore } from '@/states/videoStore'

export default function MainPageHeader() {
  const addVideo = useVideoStore(state => state.addVideo)
  function onClickStartButtonHandler() {
    addVideo({
      name: '2023-11-15 16:24',
      issueNum: 8,
      createdAt: new Date(),
    })
  }
  return (
    <header
      className={'w-full h-[108px] p-[36px] flex items-center justify-between'}
    >
      <h1 className={'h3'}>내 QA 폴더</h1>
      <CTAButton size={'medium'} onClick={onClickStartButtonHandler}>
        QA 시작하기
      </CTAButton>
    </header>
  )
}
