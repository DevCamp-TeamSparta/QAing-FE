'use client'

import ChromeSvg from '../../../../public/svg/ChromeSvg'
import NextSvg from '../../../../public/svg/NextSvg'

export default function InstallBanner() {
  function onClickInstall() {
    alert('설치 페이지 띄우기')
  }

  // todo: extention 설치 감지 후 분기처리하기
  // if extention exists  return null;

  return (
    <div
      className={
        'px-[28px] py-[24px] bg-gray-100 rounded-[16px] flex gap-[16px] items-center'
      }
    >
      <div className={'p-[12px] bg-white rounded-full'}>
        <ChromeSvg color={'#5F6060'} />
      </div>
      <div>
        <p className={'t1 text-black'}>크롬 확장 프로그램 설치하기</p>
        <p className={'b2 text-gray-800'}>
          QAing을 시작하기 전, 확장 프로그램을 설치해주세요
        </p>
      </div>
      {/* todo: Link tag로 변경? */}
      <button
        className={
          'ml-auto flex bg-primary-default w-[178px] h-[48px] items-center justify-center rounded-[99px] t3 text-white gap-[4px]'
        }
        onClick={onClickInstall}
      >
        설치하러 가기
        <NextSvg color={'#ffffff'} />
      </button>
    </div>
  )
}