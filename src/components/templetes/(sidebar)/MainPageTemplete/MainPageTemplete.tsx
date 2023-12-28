'use client'
import { useEffect } from 'react'
import FolderTable from '@/components/organisms/MainPageOrganism/FolderTable'
import { useVideoStore } from '@/states/videoStore'
import InstallBanner from '@/components/organisms/MainPageOrganism/InstallBanner'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { initAmplitude, logPageView, logEvent } from '@/lib/amplitude'

export default function MainPageTemplate() {
  const router = useRouter()
  const videos = useVideoStore(state => state.videos)
  const getCookie = Cookies.get('access-token')

  useEffect(() => {
    initAmplitude()
    logPageView('qaing_mainpage_view')
  }, [])

  useEffect(() => {
    // window.location.href = 'https://qaing.co'
    // router.push('/')
    const getCookie = Cookies.get('access-token')
    // console.log('getCookie', getCookie)
  }, [getCookie])

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
      <FolderTable />
    </main>
  )
}
