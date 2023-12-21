'use client'

import React, { useEffect, useState } from 'react'
import { useModalStore } from '@/states/modalStore'
import LoadingIssueModal from '@/components/organisms/IssuePageOrganisms/LoadingIssueModal'

interface PageProps {
  issuesId: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}
export default function IssueEmptyOrganism({
  issuesId,
  setMessage,
}: PageProps) {
  const { setModal, setBackGroundClose } = useModalStore()
  const [progress, setProgress] = useState(0)
  const [totalProgress, setTotalProgress] = useState(0)

  useEffect(() => {
    setBackGroundClose(false)
    setModal(
      <LoadingIssueModal progress={progress} totalProgress={totalProgress} />,
    )
  }, [])

  useEffect(() => {
    if (!issuesId) return
    try {
    } catch {}
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/subscribe/${issuesId}`,
      { withCredentials: true },
    )
    eventSource.onmessage = event => {
      const data = JSON.parse(event.data)

      if (!data.status) {
        setTotalProgress(data.totalTasks)
        setProgress(data.progress)
      } else {
        setMessage(data.message)
        eventSource.close()
      }
    }
    //에러확인
    eventSource.onerror = error => {
      // 오류 처리
      console.error('EventSource failed:', error)
      eventSource.close()
    }

    // if (eventSource.readyState === EventSource.CLOSED) {
    //   console.log('연결이 닫혔습니다.')
    // } else {
    //   console.log('연결이 아직 닫히지 않았습니다.')
    // }

    return () => {
      eventSource.close()
    }
  }, [issuesId])

  return (
    <div className="grid grid-cols-3 w-full gap-x-[24px] gap-y-[56px]">
      <IssueSkeleton />
      <IssueSkeleton />
      <IssueSkeleton />
      <IssueSkeleton />
      <IssueSkeleton />
    </div>
  )
}

function IssueSkeleton() {
  return (
    <div className={'flex flex-col gap-[16px]'}>
      <div className={'w-full h-[417px] bg-gray-300 rounded-[16px]'} />
      <div className={'w-full flex justify-between h-[36px]'}>
        <div className={'w-[291px] h-full bg-gray-300 rounded-[8px]'} />
        <div className={'w-[36px] h-full bg-gray-300 rounded-[8px]'} />
      </div>
    </div>
  )
}
