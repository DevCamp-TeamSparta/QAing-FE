import React from 'react'
import SideBar from '@/components/organisms/layout/SideBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-[1440px] h-screen  ">
      <SideBar />
      {children}
    </div>
  )
}
