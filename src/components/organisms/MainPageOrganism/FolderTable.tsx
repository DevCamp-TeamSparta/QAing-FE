import { useVideoStore } from '@/states/videoStore'
import { MyVideoSvg } from '../../../../public/icons/MyVideoSvg'
import { FolderSvg } from '../../../../public/icons/FolderSvg'
import { SaveSvg } from '../../../../public/icons/SaveSvg'
import { DateSvg } from '../../../../public/icons/DataSvg'
import { MoreSvg } from '../../../../public/icons/MoreSvg'
import FolderTableBody from '@/components/organisms/MainPageOrganism/FolderTableBody'
import { useEffect, useState } from 'react'
import { fetchFolder } from '@/services/folder/folder.api'
import { Folder } from '@/types/userFolder.types'
import { useRouter } from 'next/navigation'

export default function FolderTable() {
  const videos = useVideoStore(state => state.videos)
  const [folders, setFolders] = useState<Folder[]>([])
  const backServerUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
  const router = useRouter()

  useEffect(() => {
    fetchFolder()
      .then(response => {
        // console.log('상태값', response)
        setFolders(response.data)
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

  // useEffect(() => {
  //   if (folders.length === 0) return
  //   console.log('folder가 변경되었습니다.', folders)
  // }, [folders])

  // const folders = [
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  //   {
  //     name: '0',
  //     count: 0,
  //     folderName: '0',
  //     createdAt: '0',
  //     issues: ['1', '2', '3'],
  //     _id: '0',
  //   },
  // ]
  // const navigateToFoldersPage =(folders._id:string) =>{
  //   router.push(`/folders/${folders._id}/`)
  // }

  return (
    <div className="py-[44px]">
      <div className="min-w-full border-collapse">
        <div
          className={
            'grid grid-cols-[2fr_1fr_1fr_20px] p-[20px] bg-gray-100 rounded-[16px_16px_0_0] border-b border-gray-400 b3 text-gray-700'
          }
        >
          <p className="flex items-center gap-[4px]">
            <FolderSvg color={'#C0C2C2'} /> 폴더명
          </p>
          <p className="flex items-center gap-[4px]">
            <SaveSvg color={'#C0C2C2'} />
            이슈 개수
          </p>
          <p className="flex items-center gap-[4px]">
            <DateSvg color={'#C0C2C2'} />
            생성 날짜
          </p>
        </div>

        {folders.length > 0 ? (
          <div>
            {folders.map((folder, index) => (
              <FolderTableBody
                key={`video table body ${index}`}
                folderName={folder.folderName}
                createdAt={folder.createdAt}
                issues={folder.issues}
                _id={folder._id}
              />
            ))}
          </div>
        ) : (
          <div className="mt-[40px] text-center">
            <p className="h3 text-black">아직 진행한 QA가 없어요</p>
            <p className="b2 text-black mt-[8px]">
              우리 함께 QA를 빠르게 끝내볼까요?
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
