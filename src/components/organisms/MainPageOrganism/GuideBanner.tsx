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
      <div className="flex flex-col gap-2 my-[54.5px] ">
        <div className="h2  flex flex-row gap-4 ">
          우측 상단
          <div className=" ">
            <PuzzleSvg />
          </div>
          버튼을 클릭해
        </div>
        <div className="h2">바로 QA를 시작해보세요</div>
        <div className="t2 mt-[16px] flex flex-row ">
          <div className="">
            <PinSvg />
          </div>
          <p className="ml-3 t2">
            버튼으로 상단에 고정해두고 더 빠르게 이용해보세요
          </p>
        </div>
      </div>
      <Image src={BannerImage} width={448} height={241} alt="guide banner" />
    </div>
  )
}

export default GuideBanner
