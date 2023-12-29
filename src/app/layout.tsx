import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ModalPortal from '@/components/organisms/ModalOrganism/ModalPortalOrganism'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QAing',
  // icons: './favicon.ico',
  description:
    '화면 캡쳐를 위해 QA를 멈추지 마세요! 실시간 북마크를 통해 QA를 더 빠르고 정확하게! QAing과 함께 시간을 단축하세요!',
  openGraph: {
    title: 'QA 화면 녹화부터 공유까지 한 큐에, QAing',
    description:
      '화면 캡쳐를 위해 QA를 멈추지 마세요! 실시간 북마크를 통해 QA를 더 빠르고 정확하게! QAing과 함께 시간을 단축하세요!',
    type: 'website',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/public/favicon48.png" />
        <meta
          name="google-site-verification"
          content="QjGJRnt3npfa1LMRUHNJTDp2TBTA-pWN-e01BwUxCT4"
        />
      </head>
      <body className=" w-screen flex flex-col items-center  ">
        <div className=" box-borders w-full max-w-[1440px] font-pretendard">
          {children}
          <ModalPortal />
        </div>
      </body>
    </html>
  )
}
