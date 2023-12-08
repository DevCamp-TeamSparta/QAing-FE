'use client'
import React from 'react'
import GoogleIcon from '../Icon/GoogleIcon'
import useUserStore from '@/states/user-store/userStore'
import { useRouter } from 'next/navigation'

function OAuthBoutton() {
  const router = useRouter()
  const GoogleURL = process.env.NEXT_PUBLIC_GOOGLE_URL

  const GoogleSignup = () => {
    router.push(`${GoogleURL}/auth/google`)
  }

  return (
    <button
      onClick={GoogleSignup}
      className="w-[440px] h-14 px-[130px] py-4 bg-white rounded-2xl border border-stone-300 justify-center items-center gap-2 inline-flex shadow-[0_4px_18px_0_rgba(0,0,0,0.05)]"
    >
      <GoogleIcon />
      <div className="b2 w-[179px]">구글계정으로 가입하기</div>
    </button>
  )
}

export default OAuthBoutton
