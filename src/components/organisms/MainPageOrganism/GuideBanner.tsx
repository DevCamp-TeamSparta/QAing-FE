import React from 'react'
import Image from 'next/image'
import BannerImage from '/public/images/GuidBanner.png'
import OneImage from '/public/images/one.png'
import TwoImage from '/public/images/two.png'
import { PuzzleSvg } from '../../../../public/icons/PuzzleSvg'
import { PinSvg } from '../../../../public/icons/PintSvg'

function GuideBanner() {
  return (
    <div className="flex flex-row justify-between p-11 bg-[#FFFAE2] rounded-[16px] mb-10 ">
      <div className="flex flex-col gap mt-[62.5px] ">
        <p className="text-gray-700 b2">확장 프로그램을 설치하셨다면,</p>
        <div className="t2 mt-[20px] flex flex-row gap-4 ">
          <Image src={OneImage} alt={'one'} />
          우측 상단
          <div className="relative bottom-[1px]">
            <PuzzleSvg />
          </div>
          버튼을 클릭해 바로 QA를 시작해보세요
        </div>
        <div className="t2 mt-[16px] flex flex-row ">
          <Image width={30} height={28} src={TwoImage} alt={'two'} />
          <div className="ml-4">
            <PinSvg />
          </div>
          <p className="ml-3">
            버튼으로 상단에 고정해두고 더 빠르게 이용해보세요
          </p>
        </div>
      </div>
      <Image src={BannerImage} width={448} height={241} alt="guide banner" />
    </div>
  )
}

export default GuideBanner
