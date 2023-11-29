import React from 'react'
// import Signup from '@/containers/Signup/Signup'

function page() {
  return (
    <div
      id="singup"
      className=" flex min-h-screen font-pretendard  justify-center bg-[#1E1E1E] "
    >
      <div className="h-[664px]  min-w-[375px] max-w-md space-y-8  bg-white">
        {/* 구분선 */}
        {/* <div className="h-[56px] w-[375px] border-b border-[#E3E8EE]"></div> */}

        <div className=" mx-auto h-[550px] w-[292px]">
          <header>
            <h2 className="relative left-[6px] top-[6px] mt-6  text-center text-[22px] font-semibold text-[#2D3138]">
              회원가입
            </h2>
          </header>
          {/* 소셜로그인 버튼Box */}
          <div className="relative top-[4px] mt-[32px] h-[223px]">
            {/* 카카오 로그인 */}
            <button
              className="mb-4 h-[52px] w-full rounded bg-[#FEE500]"
              type="button"
            >
              <div className="flex flex-row items-center justify-center text-[15px] font-bold">
                <p className="relative  right-[6px] font-medium tracking-normal bg-blue-200">
                  카카오로 3초만에 시작하기
                </p>
              </div>
            </button>
            {/* 구글 로그인 */}
            <button
              className="mb-4 h-[52px] w-full rounded bg-black"
              type="button"
            >
              <div className="flex flex-row items-center justify-center text-[15px] font-bold text-white">
                <p className="relative  right-[1px] tracking-wider">
                  구글로 시작하기
                </p>
              </div>
            </button>
            {/* 애플 로그인 */}
            <button
              className="mb-4 h-[52px] w-full rounded bg-black"
              type="button"
            >
              <div className="flex flex-row items-center justify-center text-[15px] font-bold text-white">
                <p className="relative right-[1.2px]  top-[1px] font-semibold tracking-wider">
                  Apple로 시작하기
                </p>
              </div>
            </button>
            {/* 구분선 */}
            <div className=" border-t border-[#C7C9CD]"> </div>
          </div>
          <button
            className="relative top-[3px] h-[52px] w-full rounded bg-[#393F7B] text-[15px] font-bold text-white"
            type="button"
          >
            이메일 주소로 시작하기
          </button>
          <div className="tracking-light  relative  left-[1px] ml-[8px] mt-[34px] flex flex-row justify-center text-sm font-normal  text-[#91959D] ">
            <p>이미 계정이 있으신가요?</p>
            <div className="relative left-[5px] cursor-pointer font-semibold text-[#747474] ">
              로그인
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
