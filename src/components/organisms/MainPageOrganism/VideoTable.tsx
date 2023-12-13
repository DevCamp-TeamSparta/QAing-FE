import { useVideoStore } from '@/states/videoStore'
import { MyVideoSvg } from '../../../../public/svg/MyVideoSvg'
import { FolderSvg } from '../../../../public/svg/FolderSvg'
import { SaveSvg } from '../../../../public/svg/SaveSvg'
import { DateSvg } from '../../../../public/svg/DataSvg'
import { MoreSvg } from '../../../../public/svg/MoreSvg'
import VideoTableBody from '@/components/organisms/MainPageOrganism/VideoTableBody'

export default function VideoTable() {
  const videos = useVideoStore(state => state.videos)
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
