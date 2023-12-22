import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ModalPortal from '@/components/organisms/ModalOrganism/ModalPortalOrganism'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QAing',
  description: 'QA 화면 녹화부터 공유까지 한 큐에, QAing',
  icons: {
    icon: '/public/favicon48.png',
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
