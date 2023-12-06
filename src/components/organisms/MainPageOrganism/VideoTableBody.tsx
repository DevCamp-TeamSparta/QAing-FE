import React from 'react'
import { Video } from '@/states/videoStore'
import { MoreSvg } from '../../../../public/svg/MoreSvg'
import { MyVideoSvg } from '../../../../public/svg/MyVideoSvg'

export default function VideoTableBody({ name, issueNum, createdAt }: Video) {
  const [isMoreButtonClicked, setIsMoreButtonClicked] = React.useState(false)
  function onClickMoreButtonHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    alert('더보기')
  }
  return (
    //  TODO: Link tag로 변경
    <div
      onClick={() => alert('클릭')}
      className={
        'grid grid-cols-[2fr_1fr_1fr_20px] px-[20px] py-[16px] border-b border-gray-300 hover:bg-gray-200 active:bg-brand-background cursor-pointer'
      }
    >
      <p className="flex gap-[12px]">
        <MyVideoSvg color={'#959797'} /> {name}
      </p>
      <p className="">{issueNum}개</p>
      <p className="">{createdAt.toDateString()}</p>
      <button onClick={onClickMoreButtonHandler}>
        <MoreSvg />
      </button>
    </div>
  )
}
