import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  signupSchema,
  signupSchemaType,
} from '@/utils/zod/authValidation/authValidation'

export default function EmailSignup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signupSchemaType>({ resolver: zodResolver(signupSchema) })
  const onSubmit = (data: signupSchemaType) => {
    console.log('data', data)
  }
  // console.log('a')
  return (
    <section
      id="emailsignup"
      className=" flex  h-screen justify-center bg-[#1E1E1E]"
    >
      <form
        className="h-[560px] w-[375px] max-w-md space-y-8 bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 구분선 */}
        {/* <div className="h-[56px] w-[375px] border-b border-[#E3E8EE] "></div> */}
        {/* contents box */}
        <div className="relative  top-[7px] mx-auto h-[550px] w-[292px] ">
          <header>
            <h2 className="relative bottom-[1px] right-[1px] mt-8 text-center text-[22px] font-bold text-[#2D3138]">
              회원가입
            </h2>
          </header>
          <fieldset className="mt-7 ">
            <div className="" />
            {/* 닉네임 */}
            <div className="border-red-500 outline-none text-xs leading-4 ">
              <p className="inputBox-title relative bottom-[1px] ml-4">
                닉네임
              </p>
              <label htmlFor="username" className="sr-only">
                닉네임
              </label>
              <input
                id="username"
                type="text"
                // value={values.username}
                // onChange={handleChange}
                {...register('nickname')}
                className="relative bottom-[1px] right-[2.5px] ml-[16px]  h-[24px] w-[189px] appearance-none py-2 text-sm font-light tracking-tight text-[#91959D]
                  outline-none"
                placeholder="닉네임을 입력해주세요."
              />
              {errors.nickname && (
                <div className="text-red-500">{errors.nickname.message}</div>
              )}
            </div>
            {/* 이메일 유효성 검사 메세지
              <div className='mt-[3px] text-xs'>
                {validationErrors.username && (
                  <p className='flex flex-row text-xs tracking-wider  text-red-500'>
                    <Image src={ErrorImg} alt='error' className='mr-1' />{' '}
                    {validationErrors.username}
                  </p>
                )}
              </div> */}

            {/* 이메일 */}
            <div
              className={`inputBox mb-[3px] mt-4 text-xs
                }`}
            >
              <p className="relative bottom-[1px] left-[16px] mt-[8px] leading-4">
                이메일
              </p>
              <label htmlFor="email" className="sr-only">
                이메일 주소
              </label>
              <input
                id="email"
                {...register('email')}
                // value={values.email}
                // onChange={handleChange}
                className="relative bottom-[1px] ml-[16px]  h-[24px] w-[189px] appearance-none py-2 font-light tracking-wide text-[#91959D]  outline-none"
                placeholder="이메일 주소를 입력해 주세요"
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            {/* 이메일 유효성 검사 메세지
              <div className='mt-[4px] text-xs'>
                {validationErrors.email && (
                  <p className='flex flex-row text-xs tracking-wider text-red-500'>
                    <Image src={ErrorImg} alt='error' className='mr-1' />
                    {validationErrors.email}
                  </p>
                )}
              </div> */}

            <div
              className={`inputBox relative top-[1px] mb-[3px] text-xs mt-4 'border-red-500 outline-none'
                }`}
            >
              <p className="relative bottom-[2px] left-[16px] mt-[8px] text-xs leading-4">
                비밀번호
              </p>

              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                // value={values.password}
                // onChange={handleChange}
                {...register('password')}
                className="relative bottom-[1px]  right-[1px] ml-[16px]   h-[24px]  w-[189px] appearance-none py-2  font-light tracking-wider text-[#91959D] outline-none "
                placeholder="비밀번호를 입력해주세요"
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            {/* 비밀번호 유효성 검사 메세지 */}
            {/* <div className=' mt-[5px]  '>
                {validationErrors.password && (
                  <p className='mb-2 flex flex-row  text-xs tracking-wider text-red-500'>
                    <Image src={ErrorImg} alt='error' className='mr-1' />
                    {validationErrors.password}
                  </p>
                )}
              </div> */}

            <div className="inputBox mb-[3px] mt-4} text-xs">
              <p className="relative bottom-[1px] left-[16px] mt-[8px] leading-4 tracking-wide">
                비밀번호 확인
              </p>

              <label htmlFor="password" className="sr-only">
                비밀번호 확인
              </label>
              <input
                id="passwordCheck"
                type="password"
                // value={values.confirmPassword || ''}
                // onChange={handleChange}
                {...register('passwordCheck')}
                className="relative bottom-[1px]  right-[1px] ml-[16px]   h-[24px]  w-[205px] appearance-none py-2 font-light tracking-wider text-[#91959D] outline-none "
                placeholder="비밀번호를 다시 입력해주세요"
              />
              {errors.passwordCheck && (
                <div className="text-red-500">
                  {errors.passwordCheck.message}
                </div>
              )}
            </div>
            {/* 비밀번호 유효성 검사 메세지 */}
            {/* <div className=' mt-[3px]  '>
                {validationErrors.confirmPasswordmatch ? (
                  <p className='mb-2 flex flex-row text-xs text-[#393F7B]'>
                    <Image src={CheckedIcon} alt='check' className='mr-1' />
                    {validationErrors.confirmPasswordmatch}
                  </p>
                ) : (
                  validationErrors.confirmPassword && (
                    <p className='mb-2 flex flex-row text-xs tracking-wider text-red-500'>
                      <Image src={ErrorImg} alt='error' className='mr-1' />
                      {validationErrors.confirmPassword}
                    </p>
                  )
                )}
              </div>
            </div> */}

            <div
              className={`mt-8 h-[52px] w-[292px] ${'mt-[19px] h-[52px] w-[292px]'}`}
            >
              <button
                type="submit"
                className={`group relative flex h-full w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${'bg-[#393F7B] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}`}
              >
                다음
              </button>
            </div>
          </fieldset>

          {/* -다음- 구분선 */}
          <div className="my-4 flex flex-row items-center justify-between">
            <div className=" w-[117.5px] border-b border-[#C7C9CD]"> </div>
            <p className="text-sm font-light text-[#91959D]">또는 </p>
            <div className="w-[117.5px] border-b border-[#C7C9CD]"> </div>
          </div>

          {/* 소셜 회원가입 */}
        </div>
      </form>
    </section>
  )
}
