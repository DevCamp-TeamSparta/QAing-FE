'use client'

import React, { useEffect, useState } from 'react'
import { useModalStore } from '@/states/modalStore'
import LoadingIssueModal from '@/components/organisms/IssuePageOrganisms/LoadingIssueModal'

interface PageProps {
  folderId: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}
export default function IssueEmptyOrganism({
  folderId,
  setMessage,
}: PageProps) {
  const { setModal, setBackGroundClose } = useModalStore()
  const [progress, setProgress] = useState(0)
  const [totalProgress, setTotalProgress] = useState(0)

  useEffect(() => {
    if (totalProgress > progress) {
      setBackGroundClose(false)
      setModal(
        <LoadingIssueModal progress={progress} totalProgress={totalProgress} />,
      )
    }

    return () => {
      setModal(null)
    }
  }, [])

  useEffect(() => {
    if (!folderId) return
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/subscribe/${folderId}`,
      { withCredentials: true },
    )
    eventSource.onopen = () => {
      console.log('eventSource start')
    }
    eventSource.onmessage = event => {
      console.log(event)
      const data = JSON.parse(event.data)
      if (!data.status) {
        setTotalProgress(data.totalTasks)
        setProgress(data.progress)
      } else {
        setModal(null)
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

    return () => {
      eventSource.close()
    }
  }, [folderId])

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
      <div className={'w-full h-[337px] bg-gray-300 rounded-[16px]'} />
      <div className={'w-full flex justify-between h-[32px]'}>
        <div className={'w-[291px] h-full bg-gray-300 rounded-[8px]'} />
        <div className={'w-[36px] h-full bg-gray-300 rounded-[8px]'} />
      </div>
    </div>
  )
}
