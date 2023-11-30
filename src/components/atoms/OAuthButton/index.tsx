import React from 'react'

function OAuthBoutton() {
  return (
    <div className="w-[440px] h-14 px-[130px] py-4 bg-white rounded-2xl border border-stone-300 justify-center items-center gap-2 inline-flex">
      <div className="w-6 h-6 bg-red-400 bg-opacity-40" />
      <div className="text-base font-medium  leading-none tracking-[3%] bg-sky-200">
        구글계정으로 가입하기
      </div>
    </div>
  )
}

export default OAuthBoutton
