import React from 'react'
import SideBar from '@/components/organisms/layoutOrganism/SideBar'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QA 화면 녹화부터 공유까지 한 큐에, QAing',
  description:
    '화면 캡쳐를 위해 QA를 멈추지 마세요! 실시간 북마크를 통해 QA를 더 빠르고 정확하게! QAing과 함께 시간을 단축하세요!',
  openGraph: {
    title: 'QA 화면 녹화부터 공유까지 한 큐에, QAing',
    description:
      '화면 캡쳐를 위해 QA를 멈추지 마세요! 실시간 북마크를 통해 QA를 더 빠르고 정확하게! QAing과 함께 시간을 단축하세요!',
    type: 'website',
    url: 'https://www.qaing.co',
    images: [
      {
        url: 'https://uploads-ssl.webflow.com/655473960208081b667f8383/658d257f383d9bd0af678c4c_QAing.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QA 화면 녹화부터 공유까지 한 큐에, QAing',
    description:
      '화면 캡쳐를 위해 QA를 멈추지 마세요! 실시간 북마크를 통해 QA를 더 빠르고 정확하게! QAing과 함께 시간을 단축하세요!',
    images: {
      url: 'https://uploads-ssl.webflow.com/655473960208081b667f8383/658d257f383d9bd0af678c4c_QAing.png',
    },
  },
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-[1440px] h-screen  ">
      <SideBar />
      <div className=" h-full  w-[268px]"></div>
      {children}
    </div>
  )
}
