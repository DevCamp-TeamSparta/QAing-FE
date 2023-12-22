import React from 'react'
import MainLogo from '/public/images/logo.png'
import Image from 'next/image'

function LogoTest() {
  return (
    <div>
      <Image src={MainLogo} alt="Logo" width={124} height={44} />
    </div>
  )
}

export default LogoTest
