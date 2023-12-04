'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import Logo from '@/components/atoms/Logo/index'
import InputMolecules from '@/components/molcules/InputMolecules/index'
import PhoneNumberInputMolcules from '@/components/molcules/InputMolecules/PhoneNumberInputMolecule'
import DropdownMoleclue from '@/components/molcules/DropdownMolecule/index'
import CTAButton from '@/components/atoms/CallToActionAButton'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  advanceInformationSchemaType,
  advanceInformationSchema,
} from '@/utils/zod/authValidation/AdvanceInformationValidation'
import usePhoneNumber from '@/hooks/auth/usePhoneNumber'

function GoogleSignup() {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)

  //휴대폰 자동 하이픈생성훅 프롭스
  const phoneNumberProps = {
    type: 'tel',
    maxLength: 13,
  }
  const { phoneValue, onChangePhoneNumber, phoneNumberAutoFormat } =
    usePhoneNumber()

  console.log(`phoneValue`, phoneValue.replace(/-/g, ''))

  //로고 사이즈 프롭스
  const logoSize = {
    alt: 'Logo',
    width: 100,
    height: 36,
  }

  //인풋 타이틀 프롭스
  const lnputTitle = {
    name: '이름 *',
    phone: '연락처 *',
    company: '회사명 (선택)',
  }

  //드롭다운 타이틀 프롭스
  const dropdownTitle = {
    job: '직무 *',
    teamSize: '팀 규모',
  }

  //드롭다운 프롭스
  //직무
  const dropdownList = {
    JobList: ['기획자', '디자이너', '개발', 'QA 엔지니어', '비즈니스', '기타'],
    TeamSizeList: [
      '5인 이하',
      '6명 ~9명',
      '10명 ~ 19명',
      '20명 ~ 29명',
      '30명 ~ 39명',
      '40명 이상',
    ],
  }

  //팀 규모

  //리액트 훅 폼
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<advanceInformationSchemaType>({
    resolver: zodResolver(advanceInformationSchema),
  })

  //제출 함수
  const onSubmit = (data: advanceInformationSchemaType) => {
    alert('확인')
    console.log('Button clicked!', data)
  }

  return (
    <div>
      <header className="h-[108px]   flex flex-col justify-center ">
        <div className="ml-[35px]">
          <Logo logoSize={logoSize} />
        </div>
      </header>

      <div className="flex flex-col items-center ">
        <h1 className="h1 mt-[39px]">QAing에 오신 걸 환영해요!</h1>
        <p className=" mt-[17px] text-gray-800 b2">
          앞으로 여러분에게 더 도움이 되는 QAing이 되기 위해
        </p>
        <p className=" text-gray-800 b2">
          여러분의 데이터를 안전하게 수집하고 있어요!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className=" mt-[56px] ">
          <InputMolecules
            register={register('username')}
            inputTitle={lnputTitle.name}
            errors={errors.username}
            phoneNumberProps={phoneNumberProps}
          />
          <div></div>

          <div className="mt-[43px]">
            <InputMolecules
              register={register('phone')}
              inputTitle={lnputTitle.phone}
              errors={errors.phone}
              phoneNumberProps={phoneNumberProps}
              onChangePhoneNumber={onChangePhoneNumber}
              phoneValue={phoneValue}
            />
          </div>

          <div className=" mt-[45px]">
            {/* <PhoneNumberInputMolcules
              inputTitle={lnputTitle.phone}
              isPhoneValueExist={isPhoneValueExist}
              phoneNumberProps={phoneNumberProps}
              onChangePhoneNumber={onChangePhoneNumber}
              phoneValue={phoneValue}
            /> */}
            {/* <input
              type="tel"
              onChange={onChangePhoneNumber}
              value={phoneValue}
            /> */}
            <div></div>
          </div>
          <div className=" mt-[45px]">
            <Controller
              control={control}
              name="job"
              render={({ field: { onChange } }) => (
                <DropdownMoleclue
                  onChange={onChange}
                  // setValue={setValue}
                  dropdownTitle={dropdownTitle.job}
                  dropdwonList={dropdownList.JobList}
                  errors={errors.job}
                />
              )}
            />
            <div></div>
          </div>
          <div className=" mt-[45px]">
            <Controller
              control={control}
              name="teamsize"
              render={({ field: { onChange } }) => (
                <DropdownMoleclue
                  onChange={onChange}
                  // setValue={setValue}
                  dropdownTitle={dropdownTitle.teamSize}
                  dropdwonList={dropdownList.TeamSizeList}
                  errors={errors.teamsize}
                />
              )}
            />
          </div>
          <div className=" mt-[45px]">
            <InputMolecules
              inputTitle={lnputTitle.company}
              register={register('company')}
              errors={errors.company}
            />
          </div>
          <div className="">
            <p className="b4 mt-2 text-[#808181]">
              회사명이 부담스러우시다면, 산업 또는 주요 프로덕트를 적어주세요
            </p>
          </div>
          <div>
            <p className="b4 mt-[56px] text-center text-[#808181]">
              QAing의 서비스 이용약관 및 개인정보 처리 방침이 적용됩니다.
            </p>
          </div>
          <div className="mt-4">
            <CTAButton>가입 완료하기</CTAButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GoogleSignup
