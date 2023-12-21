'use client'

import React, { useEffect, useState } from 'react'
import { useModalStore } from '@/states/modalStore'
import LoadingIssueModal from '@/components/organisms/IssuePageOrganisms/LoadingIssueModal'
import { useVideoUploadStore } from '@/states/videoStore'
interface PageProps {
  folderId: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}
export default function IssueEmptyOrganism({
  folderId,
  setMessage,
}: PageProps) {
  const { modal, setModal, setBackGroundClose } = useModalStore()
  const { setProgress } = useVideoUploadStore()

  useEffect(() => {
    if (!folderId) return
    try {
    } catch {}
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos/subscribe/${folderId}`,
      { withCredentials: true },
    )
    setBackGroundClose(false)
    setModal(<LoadingIssueModal />)
    eventSource.onmessage = event => {
      const data = JSON.parse(event.data)
      if (!data.status) {
        if (!modal) {
          // setBackGroundClose(false)
          // setModal(<LoadingIssueModal />)
        }
        setProgress(data.progress, data.totalTasks)
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
