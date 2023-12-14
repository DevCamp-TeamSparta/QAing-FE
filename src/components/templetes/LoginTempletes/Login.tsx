import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  loginSchema,
  loginSchemaType,
} from '@/utils/zod/authValidation/authValidation'
import { useRouter } from 'next/navigation'

function Login() {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) })
  // const onSubmit = (data: loginSchemaType) => {
  //   console.log('data', data)
  // }
  const router = useRouter()
  const GoogleURL = process.env.NEXT_PUBLIC_API_BASE_URL
  const googleAuth = () => {
    router.push(`${GoogleURL}/auth/google`)
  }

  return (
    <section
      id="login"
      className=" font-pretendard flex min-h-screen justify-center"
    >
      <button onClick={googleAuth}>로오그그이인</button>
      {/*<form*/}
      {/*  className="h-[664px] min-w-[375px] max-w-md space-y-8  bg-white"*/}
      {/*  onSubmit={handleSubmit(onSubmit)}*/}
      {/*>*/}
      {/*  /!* border box *!/*/}
      {/*  /!* <div className="h-[56px] w-[375px] border border-[#E3E8EE]"></div> *!/*/}
      {/*  /!* contents box *!/*/}
      {/*  <div className=" mx-auto h-[550px] w-[292px]">*/}
      {/*    <header>*/}
      {/*      <h2 className="relative bottom-[1px] mt-[40px]  text-center  text-[22px] font-semibold text-[#2D3138] ">*/}
      {/*        로그인*/}
      {/*      </h2>*/}
      {/*    </header>*/}
      {/*    <fieldset className="mt-[31px]">*/}
      {/*      <div className="">*/}
      {/*        /!* 이메일  *!/*/}
      {/*        <div className="relative bottom-[1px] h-[56px] w-[292px] rounded-lg border border-[#D5D5D6] ">*/}
      {/*          <p className="font-pretendard ml-[16px] mt-[7px] text-xs  font-medium">*/}
      {/*            이메일*/}
      {/*          </p>*/}
      {/*          <label htmlFor="email" className="sr-only">*/}
      {/*            이메일 주소*/}
      {/*          </label>*/}
      {/*          <input*/}
      {/*            id="email"*/}
      {/*            {...register('email')}*/}
      {/*            className="relative  ml-[16px]  block h-[24px] w-[189px] appearance-none py-2 text-lg font-light tracking-tighter text-gray-900 placeholder:text-[#91959D] focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "*/}
      {/*            placeholder="이메일 주소를 입력해주세요."*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        /!* 이메일 유효성 검사 메세지 *!/*/}
      {/*        <div className=" mt-[1.5px] text-xs text-red-500">*/}
      {/*          {errors.email && <div>{errors.email.message}</div>}*/}
      {/*        </div>*/}
      {/*        /!* 비밀번호  *!/*/}
      {/*        <div className="mb-[3px] mt-4 block h-[56px] w-[292px] rounded-lg border border-[#D5D5D6]">*/}
      {/*          <p className="relative left-[1px] ml-[15px] mt-[7px] text-xs font-medium tracking-normal ">*/}
      {/*            비밀번호*/}
      {/*          </p>*/}

      {/*          <label htmlFor="password" className="sr-only">*/}
      {/*            비밀번호*/}
      {/*          </label>*/}
      {/*          <input*/}
      {/*            id="password"*/}
      {/*            type="password"*/}
      {/*            {...register('password')}*/}
      {/*            className=" relative bottom-[1px] right-[2px]   ml-[16px] block h-[24px] w-[189px] appearance-none   py-2 text-lg  font-light tracking-tighter text-gray-900 placeholder:text-[#91959D] focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "*/}
      {/*            placeholder="비밀번호를 입력해주세요."*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        /!* 비밀번호 유효성 검사 메세지 *!/*/}

      {/*        <div className=" mt-[3px] text-xs  ">*/}
      {/*          {errors.password && (*/}
      {/*            <div className="text-red-500">{errors.password.message}</div>*/}
      {/*          )}*/}
      {/*        </div>*/}

      {/*        /!* 비밀번호 찾기 *!/*/}

      {/*        <div className="mt-[3px] text-right text-sm">*/}
      {/*          <p className="font-normal hover:cursor-pointer">*/}
      {/*            비밀번호를 잊으셨나요?*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </fieldset>*/}
      {/*    <div className="relative top-[1px] mt-[10px] h-[52px] w-[292px] ">*/}
      {/*      <button*/}
      {/*        type="submit"*/}
      {/*        className={`group relative flex h-full w-full justify-center rounded-md border border-transparent p-4 text-center text-[15px] font-bold text-white ${'bg-[#393F7B]  focus:outline-none '}`}*/}
      {/*      >*/}
      {/*        <p className="relative bottom-[2px]">로그인</p>*/}
      {/*      </button>*/}
      {/*      /!* {serverError && <p className="text-center text-red-500">{serverError}</p>} *!/*/}
      {/*    </div>*/}
      {/*    /!* 구분선 *!/*/}
      {/*    <div className="my-4 border-t border-[#C7C9CD]"></div>*/}
      {/*    /!* 소셜로그인 버튼box *!/*/}
      {/*    <div className="h-[190px] w-[292px]">*/}
      {/*      /!* 카카오 로그인 *!/*/}
      {/*      <button className="mb-4 h-[52px] w-full rounded bg-[#FEE500]">*/}
      {/*        <div className=" flex flex-row items-center justify-center ">*/}
      {/*          <p className="relative right-[1px] text-[15px] font-bold  text-[#2D3138]">*/}
      {/*            카카오로 3초만에 시작하기*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </button>*/}
      {/*      /!* 구글 로그인 *!/*/}
      {/*      <button className=" mb-4  h-[52px] w-full rounded bg-black">*/}
      {/*        <div className="flex flex-row items-center justify-center ">*/}
      {/*          <p className=" relative top-[1px] text-base font-bold  text-white">*/}
      {/*            구글로 시작하기*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </button>*/}

      {/*      /!* 애플 로그인 *!/*/}
      {/*      <button className="mt-[1px] h-[52px] w-full rounded bg-black">*/}
      {/*        <div className="relative right-[2px] top-[1px] flex flex-row items-center justify-center text-[15px] font-semibold text-white ">*/}
      {/*          <p className="font font-pretendard relative left-[1px] top-[px] text-[15px]  font-bold ">*/}
      {/*            Apple로 시작하기*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*    /!* 회원가입 버튼 *!/*/}
      {/*    <div className="relative left-[2px] mt-8 flex flex-row justify-center text-sm font-light text-[#91959D]">*/}
      {/*      회원이 아니신가요?*/}
      {/*      <button className="relative right-[4px] ml-2 cursor-pointer font-normal text-[#747474] ">*/}
      {/*        회원가입*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</form>*/}
    </section>
  )
}

export default Login
