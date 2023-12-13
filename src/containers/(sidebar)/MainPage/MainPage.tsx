'use client'

import MainPageHeader from '@/components/organisms/MainPageOrganism/MainPageHeader'
import EmptyVideo from '@/components/organisms/MainPageOrganism/EmptyVideo'
import VideoTable from '@/components/organisms/MainPageOrganism/VideoTable'
import { useVideoStore } from '@/states/videoStore'

export default function MainPageTemplate() {
  const videos = useVideoStore(state => state.videos)
  return (
    <main className="flex flex-col w-full">
      <MainPageHeader />
      {videos.length > 0 ? <VideoTable /> : <EmptyVideo />}
    </main>
  )
}
