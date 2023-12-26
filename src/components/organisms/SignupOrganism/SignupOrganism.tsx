'use client'
import Logo from '@/components/atoms/LogoAtom/LogoAtoms'
import OAuthBoutton from '@/components/atoms/OAuthButtonAtom/OAuthButtonAtom'
import { GoogleSignup } from '@/services/auth/google.api'

function SignnupOrgansim() {
  const logoSize = {
    alt: 'Logo',
    width: 302.22,
    height: 109,
  }

  return (
    <div className="relative  h-max-screen h-screen bg-slate-100">
      <div className="mx-auto ">
        <div className="flex flex-col items-center  bg-blue-200 pt-[270px]">
          <Logo logoSize={logoSize} />
          <div className="mt-[29px] font-semibold text-2xl ">
            우리 함께 QA 시간을 절약하러 가볼까요?
          </div>
          <div className="mt-[74px]">
            <OAuthBoutton />
          </div>
        </div>
        <div className="absolute b-0 l-0 flex flex-col items-center  text-gray-600 text-[14px] ">
          <p>위의 &apos;구글 계정으로 가입하기&apos;를 클릭하는 것으로</p>
          <p>QAing의 이용약관 및 개인정보 보호정책에 동의합니다.</p>
        </div>
      </div>
    </div>
  )
}

export default SignnupOrgansim
