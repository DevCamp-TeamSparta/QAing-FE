import React, { ChangeEvent } from 'react'
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
  register?: UseFormRegisterReturn
  errors?: object
}

function Input({ register, errors }: InputProps) {
  return (
    <div
      className={`w-[440px] h-[52px] bg-gray-200 rounded-lg ${
        errors && ' border border-sementic-danger'
      }`}
    >
      <input
        // 리액트훅폼관련 속성
        {...register}
        // 핸드폰관련 속성
        className={`bg-gray-200 w-[408px] h-[24px] ml-4 mt-[14px] font-regular outline-none  `}
      />
      <br />
      {errors && '필수 입력 항목입니다.'}
    </div>
  )
}

export default Input
