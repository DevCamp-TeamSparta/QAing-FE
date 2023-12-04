import React, { ChangeEvent } from 'react'
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
  register?: UseFormRegisterReturn
  errors?: object
  phoneNumberProps?: {
    type: string
    maxLength: number
  }
  onChangePhoneNumber?: (e: ChangeEvent<HTMLInputElement>) => void
  phoneValue?: string
}

function Input({
  register,
  errors,
  onChangePhoneNumber,
  phoneValue,
  phoneNumberProps,
}: InputProps) {
  return (
    <div
      className={`w-[440px] h-[52px] bg-gray-200 rounded-lg ${
        errors && ' border border-sementic-danger'
      }`}
    >
      <div>
        <input
          // 리액트훅폼관련 속성
          {...register}
          // 핸드폰관련 속성
          type={phoneNumberProps?.type}
          maxLength={phoneNumberProps?.maxLength}
          onChange={e => {
            register && register.onChange(e)
            onChangePhoneNumber && onChangePhoneNumber(e)
          }}
          value={phoneValue}
          className={`bg-gray-200 w-[408px] h-[24px] ml-4 mt-[14px] font-regular outline-none  `}
        />
      </div>
    </div>
  )
}

export default Input
