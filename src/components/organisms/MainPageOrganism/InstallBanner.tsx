'use client'
/*global chrome*/
import { logEvent } from '@/lib/amplitude'
import ChromeSvg from '../../../../public/icons/ChromeSvg'
import NextSvg from '../../../../public/icons/NextSvg'
import { useEffect, useState } from 'react'

export default function InstallBanner() {
  function onClickInstall() {
    logEvent('qaing_mainpage_install_button_click', {
      button_name: '설치하러 가기',
    })
    window.open(
      'https://chrome.google.com/webstore/detail/qaing-qa-%ED%99%94%EB%A9%B4-%EC%BA%A1%EC%B3%90-%EB%B0%8F-%EB%85%B9%ED%99%94/meoehebomhebdjdbcbeehbjnljdblocn',
      '_blank',
    )
  }

  // todo: extention 설치 감지 후 분기처리하기
  // if extention exists  return null;

  return (
    <div
      className={
        'px-[44px] py-14 bg-[#FFFAE2] rounded-[16px] flex gap-[24px] items-center'
      }
    >
      <div className={' bg-white rounded-full'}>
        <ChromeSvg color={'#5F6060'} />
      </div>
      <div className="flex flex-col gap-2">
        <p className={'h2 text-black'}>
          잠깐, 크롬 확장 프로그램 설치해주세요!
        </p>
        <p className={'t2 font-thin text-gray-800'}>
          QAing을 시작하기 전, 확장 프로그램을 설치해주세요
        </p>
      </div>
      {/* todo: Link tag로 변경? */}
      <button
        className={
          'ml-auto flex bg-primary-default w-[178px] h-[48px] items-center justify-center rounded-[99px] b2 text-white gap-[4px]'
        }
        onClick={onClickInstall}
      >
        설치하러 가기
        <NextSvg color={'#ffffff'} />
      </button>
    </div>
  )
}
