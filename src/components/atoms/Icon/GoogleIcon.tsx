import React from 'react'
import Image from 'next/image'
import Google from '/public/icons/googleIcon.svg'

function GoogleIcon() {
  return (
    <div>
      <Image src={Google} width={28} height={28} alt="구글아이콘" />
    </div>
  )
}

export default GoogleIcon
