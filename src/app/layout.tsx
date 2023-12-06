import './globals.css'
import type { Metadata } from 'next'
import ModalPortal from '@/components/organisms/modal/ModalPortal'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ModalPortal />
      </body>
    </html>
  )
}
