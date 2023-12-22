import React from 'react'
import Logo from '@/components/atoms/LogoAtom/LogoAtoms'

function Page() {
  const logoSize = {
    alt: 'Logo',
    width: 100,
    height: 36,
  }
  return (
    <div>
      <header className="h-[108px]   flex flex-col justify-center  ">
        {/* 헤더 */}
        <div className="ml-[35px] flex justify-between felx-row  ">
          <Logo logoSize={logoSize} />
        </div>
      </header>
      <div className="flex flex-row justify-center items-center h-[640px] t1">
        여기서 녹화를 시작해 주세요
      </div>
    </div>
  )
}

export default Page
