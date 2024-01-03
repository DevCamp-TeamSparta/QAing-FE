'use client'
import { useEffect, useState } from 'react'
import FolderTable from '@/components/organisms/MainPageOrganism/FolderTable'
import InstallBanner from '@/components/organisms/MainPageOrganism/InstallBanner'
import { initAmplitude, logPageView } from '@/lib/amplitude'

export default function MainPageTemplate() {
  const [isExtensionInstalled, setIsExtensionInstalled] = useState(true)

  useEffect(() => {
    initAmplitude()
    logPageView('qaing_mainpage_view')
  }, [])

  const extensionId = 'njjpnfbdgeihghedhhahflddfmfenfli'

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
    // Then in your site's buisness logic, do something like this

    checkExtensionInstalled().then((installed: any) => {
      if (installed) {
        setIsExtensionInstalled(false)
      } else {
        console.log('The extension is NOT installed.')
      }
    })
  }, [])

  return (
    <main className="flex flex-col w-[1172px] px-[36px] ">
      <header
        className={
          'w-full h-[108px] py-[37px] flex items-center justify-between'
        }
      >
        <h1 className={'h3'}>QA 폴더</h1>
      </header>
      {isExtensionInstalled ? <InstallBanner /> : <></>}
      <div
        className={`${isExtensionInstalled ? '' : 'relative bottom-[30px]'}`}
      >
        <FolderTable />
      </div>
    </main>
  )
}
