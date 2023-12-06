import { useVideoStore } from '@/states/videoStore'
import { MyVideoSvg } from '../../../../public/svg/MyVideoSvg'
import { FolderSvg } from '../../../../public/svg/FolderSvg'
import { SaveSvg } from '../../../../public/svg/SaveSvg'
import { DateSvg } from '../../../../public/svg/DateSvg'
import { MoreSvg } from '../../../../public/svg/MoreSvg'
import VideoTableBody from '@/components/organisms/MainPageOrganism/VideoTableBody'

export default function VideoTable() {
  const videos = useVideoStore(state => state.videos)
  return (
    <div className="px-[36px] py-[44px]">
      <div className="min-w-full border-collapse">
        <div
          className={
            'grid grid-cols-[2fr_1fr_1fr_20px] p-[20px] bg-gray-100 rounded-[16px_16px_0_0] border-b border-gray-400'
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
      </div>
    </div>
  )
}
