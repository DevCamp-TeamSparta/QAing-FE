import { useVideoStore } from '@/states/videoStore'
import { MyVideoSvg } from '../../../../public/icons/MyVideoSvg'
import { FolderSvg } from '../../../../public/icons/FolderSvg'
import { SaveSvg } from '../../../../public/icons/SaveSvg'
import { DateSvg } from '../../../../public/icons/DataSvg'
import { MoreSvg } from '../../../../public/icons/MoreSvg'
import VideoTableBody from '@/components/organisms/MainPageOrganism/VideoTableBody'
import { useEffect, useState } from 'react'
import { fetchFolder } from '@/services/folder/folder.api'
import { Folder } from '@/types/userFolder.types'

export default function VideoTable() {
  // const videos = useVideoStore(state => state.videos)
  const [folders, setFolders] = useState<Folder[]>([])

  useEffect(() => {
    fetchFolder().then(data => {
      console.log('store에 저장합니다.', data)
      setFolders(data)
    })
  }, [])

  useEffect(() => {
    if (folders.length === 0) return
    console.log('folder가 변경되었습니다.', folders)
  }, [folders])

  const videos = [
    {
      key: '1',
      name: 'rhs',
      issueNum: 1,
      createdAt: new Date(),
    },
    {
      key: '1',
      name: 'rhs',
      issueNum: 2,
      createdAt: new Date(),
    },
    {
      key: '1',
      name: 'rhs',
      issueNum: 3,
      createdAt: new Date(),
    },
    {
      key: '1',
      name: 'rhs',
      issueNum: 4,
      createdAt: new Date(),
    },
  ]
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
        {videos.length > 0 ? (
          <div>
            {videos.map((video, index) => (
              <VideoTableBody
                key={`video table body ${index}`}
                name={video.name}
                issueNum={video.issueNum}
                createdAt={video.createdAt}
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
