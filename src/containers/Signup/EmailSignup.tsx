import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  signupSchema,
  signupSchemaType,
} from '@/utils/zod/authValidation/authValidation'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { signupRequest } from '@/services/auth.api'

export default function EmailSignup() {
  const [values, setValues] = useState({
    numberValue: '',
  })
  const { numberValue } = values

  const handleNumber = (e: any) => {
    const { value, name } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }
  const mockData = {
    company: '팀스파르타',
    email: 'rhsok923@naver.cm',
    job: '개발자',
    password: 'Fkaus1234!',
    passwordCheck: 'Fkaus1234!',
    phoneNumber: '010-2222-4444',
    teamSize: 'exceedTen',
    username: '라형선',
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signupSchemaType>({ resolver: zodResolver(signupSchema) })
  const onSubmit = async (data: signupSchemaType) => {
    const submitData = { ...data, phoneNumber: numberValue }
    console.log('numberValue', numberValue)
    const url =
      'https://f7925a2a-767f-408d-8944-356e3f6e4a88.mock.pstmn.io/signup'
    try {
      signupRequest(data, numberValue, url)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (numberValue.length === 11) {
      setValues({
        numberValue: numberValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      })
    } else if (numberValue.length === 13) {
      setValues({
        numberValue: numberValue
          //하이픈이 입력되면 공백으로 변경되고 하이픈이 다시 생성됨
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      })
    }
    console.log('numberValue', numberValue)
  }, [numberValue])

  return (
    <section
      id="emailsignup"
      className=" flex  h-screen justify-center bg-[#1E1E1E]"
    >
      <form
        className="h-[850px] w-[375px] max-w-md space-y-8 bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 구분선 */}
        {/* <div className="h-[56px] w-[375px] border-b border-[#E3E8EE] "></div> */}
        {/* contents box */}
        <div className="relative  top-[7px] mx-auto w-[292px] ">
          <header>
            <h2 className="relative bottom-[1px] right-[1px] mt-8 text-center text-[22px] font-bold text-[#2D3138]">
              회원가입
            </h2>
          </header>
          <fieldset className="mt-7 ">
            <div className="" />
            {/* 닉네임 */}
            <div className="border-red-500 outline-none  leading-4 ">
              <p className="inputBox-title relative bottom-[1px] ml-4">이름</p>
              <label htmlFor="username" className="sr-only">
                닉네임
              </label>
              <input
                id="username"
                type="text"
                {...register('username')}
                className="relative bottom-[1px] right-[2.5px] ml-[16px]  h-[24px] w-[189px] appearance-none py-2  font-light tracking-tight text-[#91959D]
                  outline-none"
                placeholder="닉네임을 입력해주세요."
                maxLength={3}
              />
              {errors.username && (
                <div className="text-red-500 text-sm">
                  {errors.username.message}
                </div>
              )}
            </div>

            {/* 이메일 */}
            <div
              className={`inputBox mb-[3px] mt-4 
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
                className="relative bottom-[1px] ml-[16px]  h-[24px] w-[189px]  appearance-none py-2 font-light tracking-wide text-[#91959D]  outline-none"
                placeholder="이메일 주소를 입력해 주세요"
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>

            <div
              className={`inputBox relative top-[1px] mb-[3px]  mt-4 'border-red-500 outline-none'
                }`}
            >
              <p className="relative bottom-[2px] left-[16px] mt-[8px]  leading-4">
                비밀번호
              </p>

              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
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

            <div className="inputBox mb-[3px] mt-4}">
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
            <div
              className={`inputBox mb-[3px] mt-4 
                }`}
            >
              <p className="relative bottom-[1px] left-[16px] mt-[8px] leading-4">
                연락처
              </p>
              <label htmlFor="phoneNumber" className="sr-only">
                연락처
              </label>
              <input
                id="phoneNumber"
                // {...register('phoneNumber')}
                onChange={handleNumber}
                name="numberValue"
                value={numberValue || ''}
                maxLength={13}
                className="relative bottom-[1px] ml-[16px]  h-[24px] w-[189px] appearance-none py-2 font-light tracking-wide text-[#91959D]  outline-none"
                placeholder="연락처를 입력해 주세요"
              />
              {/* {errors.phoneNumber && (
                <div className="text-red-500">{errors.phoneNumber.message}</div>
              )} */}
            </div>
            <div
              className={`inputBox mb-[3px] mt-4 
                }`}
            >
              <p className="relative bottom-[1px] left-[16px] mt-[8px] leading-4">
                직무
              </p>
              <label htmlFor="job" className="sr-only">
                직무
              </label>
              <input
                id="job"
                {...register('job')}
                // value={values.email}
                // onChange={handleChange}
                className="relative bottom-[1px] ml-[16px]  h-[24px] w-[189px] appearance-none py-2 font-light tracking-wide text-[#91959D]  outline-none"
                placeholder="직무를 입력해 주세요"
              />
              {errors.job && (
                <div className="text-red-500">{errors.job.message}</div>
              )}
            </div>
            <div
              className={`inputBox mb-[3px] mt-4 
                }`}
            >
              <p className="relative bottom-[1px] left-[16px] mt-[8px] leading-4">
                팀원 수
              </p>
              <label htmlFor="teamSize" className="sr-only">
                팀원 수
              </label>
              <select
                className="ml-2 font-light text-[#91959D]"
                {...register('teamSize', { required: true })}
              >
                <option value="undefined">팀원 수를 선택해 주세요</option>
                <option value="lessthanfive">5명 이하</option>
                <option value="sixToTen">6 ~ 10 명</option>
                <option value="exceedTen">10명 초과</option>
              </select>
              {errors.teamSize && (
                <div className="text-red-500">{errors.teamSize.message}</div>
              )}
            </div>
            <div
              className={`inputBox mb-[3px] mt-4 
                }`}
            >
              <p className="relative bottom-[1px] left-[16px] mt-[8px] leading-4">
                회사명
              </p>
              <label htmlFor="company" className="sr-only">
                회사명
              </label>
              <input
                id="company"
                {...register('company')}
                // value={values.email}
                // onChange={handleChange}
                className="relative bottom-[1px] ml-[16px]  h-[24px] w-[189px] appearance-none py-2 font-light tracking-wide text-[#91959D]  outline-none"
                placeholder=" 회사명를 입력해 주세요"
              />
              {errors.company && (
                <div className="text-red-500">{errors.company.message}</div>
              )}

              <input maxLength={10} />
            </div>

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
