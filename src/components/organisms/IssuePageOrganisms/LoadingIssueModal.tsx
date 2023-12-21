import { useEffect, useState } from 'react'
import ProgressBar from '@/components/atoms/common/ProgressBar'

import { useVideoUploadStore } from '@/states/videoStore'

export default function LoadingIssueModal() {
  const [dots, setDots] = useState('...')
  const { progress, totalProgress } = useVideoUploadStore()
  const percentage = (progress / totalProgress) * 100

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '.' : `${prev}.`))
    }, 800)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={'px-[36px] py-[40px] bg-white rounded-[16px] text-center'}>
      <div className={'b3 text-black flex justify-center'}>
        <p>저장 이슈 불러오는 중</p>
        <p className={'w-[12px] text-left'}>{dots}</p>
      </div>
      <p className={'b4 text-gray-600 mt-[4px]'}>
        앞으로 더 빠르게 불러올 수 있도록 노력중이에요!
      </p>
      <p className={'b3 mt-[32px] text-gray-800'}>
        <span className={'text-primary-default'}>{progress}</span> /{' '}
        {totalProgress}
      </p>
      <div className={'mt-[8px]'}>
        <ProgressBar percentage={percentage} />
      </div>
    </div>
  )
}
