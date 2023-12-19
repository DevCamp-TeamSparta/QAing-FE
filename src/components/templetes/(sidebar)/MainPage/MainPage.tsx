'use client'

import VideoTable from '@/components/organisms/MainPageOrganism/VideoTable'
import { useVideoStore } from '@/states/videoStore'
import InstallBanner from '@/components/organisms/MainPageOrganism/InstallBanner'
import { useEffect, useState } from 'react'
import { fetchFolder } from '@/services/folder/folder.api'
import { Folder } from '@/types/userFolder.types'
import axios from 'axios'

export default function MainPageTemplate() {
  // const videos = useVideoStore(state => state.videos)
  const [folders, setFolders] = useState<Folder[]>([])
  const backServerUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL

  useEffect(() => {
    // fetchFolder().then(data => {
    //   console.log('store에 저장합니다1', data)
    //   setFolders(data)
    // })
    const getfolder = async () => {
      const response = await axios
        .get(`${backServerUrl}/folders/test`, {
          withCredentials: true,
        })
        .then(res => {
          console.log('store에 저장합니다2', res.data)
          setFolders(res.data)
        })
      return response
    }
    try {
      getfolder()
    } catch (err) {
      console.log('err', err)
    }
  }, [])

  useEffect(() => {
    if (folders.length === 0) return
    console.log('folder가 변경되었습니다.', folders)
  }, [folders])

  const videos = useVideoStore(state => state.videos)
  return (
    <main className="flex flex-col w-full px-[36px]">
      <header
        className={
          'w-full h-[108px] py-[36px] flex items-center justify-between'
        }
      >
        <h1 className={'h3'}>QA 폴더</h1>
      </header>
      <InstallBanner />
      <VideoTable />
    </main>
  )
}
