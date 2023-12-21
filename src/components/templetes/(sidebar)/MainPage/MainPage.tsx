'use client'

import VideoTable from '@/components/organisms/MainPageOrganism/VideoTable'
import { useVideoStore } from '@/states/videoStore'
import InstallBanner from '@/components/organisms/MainPageOrganism/InstallBanner'

export default function MainPageTemplate() {
  const videos = useVideoStore(state => state.videos)
  return (
    <main className="flex flex-col w-[1172px] px-[36px]">
      <header
        className={
          'w-full h-[108px] py-[37px] flex items-center justify-between'
        }
      >
        <h1 className={'h3'}>QA 폴더</h1>
      </header>
      <InstallBanner />
      <VideoTable />
    </main>
  )
}
