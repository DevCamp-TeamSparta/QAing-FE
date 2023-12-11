import React from 'react'
import MainLogo from '/public/images/logo.png'
import Image from 'next/image'

type LogoProps = {
  logoSize: {
    alt: string
    width: number
    height: number
  }
}

const Logo: React.FC<LogoProps> = ({ logoSize }) => {
  const { alt, width, height } = logoSize
  return (
    <div>
      <Image src={MainLogo} alt={alt} width={width} height={height} />
    </div>
  )
}

export default Logo
