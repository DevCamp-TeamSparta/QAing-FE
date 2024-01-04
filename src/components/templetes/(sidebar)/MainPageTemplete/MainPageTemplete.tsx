'use client'
import { use, useEffect, useState } from 'react'
import FolderTable from '@/components/organisms/MainPageOrganism/FolderTable'
import InstallBanner from '@/components/organisms/MainPageOrganism/InstallBanner'
import GuideBanner from '@/components/organisms/MainPageOrganism/GuideBanner'
import { initAmplitude, logPageView } from '@/lib/amplitude'
import { Folder } from '@/types/userFolder.types'
import { fetchFolder } from '@/services/folder/folder.api'
import { useRouter } from 'next/navigation'

export default function MainPageTemplate() {
  // const [isExtensionInstalled, setIsExtensionInstalled] = useState(true)
  // const [isFolderExist, setIsFolderExist] = useState<boolean>(false)
  const [banner, setBanner] = useState<string>('none')
  const [isActive, setIsActive] = useState<boolean>(false)
  const [folders, setFolders] = useState<Folder[]>([])
  const router = useRouter()
  useEffect(() => {
    initAmplitude()
    logPageView('qaing_mainpage_view')
  }, [])

  const extensionId = 'meoehebomhebdjdbcbeehbjnljdblocn'

  async function checkExtensionInstalled() {
    try {
      const response = await fetch(`chrome-extension://${extensionId}/icon.png`)
      return true
    } catch (e) {
      if (e instanceof TypeError && e.message == 'Failed to fetch') {
        return false
      } else {
        throw e
      }
    }
  }

  useEffect(() => {
    if (banner !== 'guide') return
    checkExtensionInstalled().then((installed: any) => {
      if (installed) {
        setBanner('install')
        // setIsExtensionInstalled(false)
      } else {
        console.log('The extension is NOT installed.')
      }
    })
  }, [banner])

  useEffect(() => {
    fetchFolder()
      .then(response => {
        // console.log('상태값', response)
        setFolders(response.data)
        if (response.data.length === 0) {
          setBanner('guide')
        } else {
          setBanner('notRequired')
        }

        if (response.status === 401) {
          router.push('/auth/signup')
        }
      })
      .catch(error => {
        // console.log('error', error)
        if (error.response.status === 401) {
          router.push('/auth/signup')
          return
        }
        if (error.response.status !== 200) {
          window.location.href = 'https://qaing.co/404'
        }
      })
  }, [])

  if (banner === 'none') return <></>

  return (
    <main className="flex flex-col w-[1172px] px-[36px] ">
      <header
        className={
          'w-full h-[108px] py-[36px] flex items-center justify-between'
        }
      >
        <h1 className={'h3'}>내 워크스페이스</h1>
      </header>
      {
        {
          none: <InstallBanner />,
          install: <GuideBanner />,
          guide: <InstallBanner />,
          notRequired: <></>,
        }[banner]
      }
      {/* {isExtensionInstalled ? (
        <InstallBanner />
      ) : isFolderExist ? (
        <></>
      ) : (
        <GuideBanner />
      )} */}
      <div
        className={`${
          banner === 'notRequired' ? 'relative bottom-[56px]' : ''
        }`}
      >
        <FolderTable folders={folders} />
      </div>
    </main>
  )
}
