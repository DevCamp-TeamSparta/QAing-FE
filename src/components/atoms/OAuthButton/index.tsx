import React from 'react'
import GoogleIcon from '../Icon/GoogleIcon'

type props = { buttonProps: () => void }

function OAuthBoutton({ buttonProps }: props) {
  return (
    <button
      onClick={buttonProps}
      className="w-[440px] h-14 px-[130px] py-4 bg-white rounded-2xl border border-stone-300 justify-center items-center gap-2 inline-flex shadow-[0_4px_18px_0_rgba(0,0,0,0.05)]"
    >
      <GoogleIcon />
      <div className="b2 w-[179px]">구글계정으로 가입하기</div>
    </button>
  )
}

export default OAuthBoutton
