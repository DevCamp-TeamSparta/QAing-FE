import React from 'react'
import SideBar from '@/components/organisms/layout/SideBar'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-[1440px] h-screen  ">
      <SideBar />
      {children}
    </div>
  )
}
