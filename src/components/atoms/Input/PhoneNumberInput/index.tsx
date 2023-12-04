import React, { ChangeEvent } from 'react'
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
  errors?: object
  phoneNumberProps: {
    type: string
    maxLength: number
  }
  onChangePhoneNumber: (e: ChangeEvent<HTMLInputElement>) => void
  phoneValue: string
  isPhoneValueExist: boolean
}

function PhoneNumberInput({
  errors,
  phoneNumberProps,
  phoneValue,
  onChangePhoneNumber,
  isPhoneValueExist,
}: InputProps) {
  return (
    <div
      className={`w-[440px] h-[52px] bg-gray-200 rounded-lg ${
        isPhoneValueExist && ' border border-sementic-danger'
      }`}
    >
      <input
        type={phoneNumberProps.type}
        maxLength={phoneNumberProps.maxLength}
        onChange={onChangePhoneNumber}
        value={phoneValue}
        className={`bg-gray-200 w-[408px] h-[24px] ml-4 mt-[14px] font-regular outline-none  `}
      />
      <br />
      {errors && '필수 입력 항목입니다.'}
    </div>
  )
}

export default PhoneNumberInput
