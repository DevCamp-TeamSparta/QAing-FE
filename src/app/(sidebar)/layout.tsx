import React from 'react'
import SideBar from '@/components/organisms/layoutOrganism/SideBar'

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
