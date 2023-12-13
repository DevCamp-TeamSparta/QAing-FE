import React from 'react'
import SideBar from '@/components/organisms/layout/SideBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen h-screen">
      <SideBar />
      {children}
    </div>
  )
}
