import React from 'react'
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
  inputPosition: {
    positiontop: number
  }
  register?: UseFormRegisterReturn
  errors?: any
}

function Input({ inputPosition, register, errors }: InputProps) {
  const { positiontop } = inputPosition
  console.log(errors)
  return (
    <div
      className={`w-[440px] h-[52px] bg-gray-200 rounded-lg ${
        errors && ' border border-sementic-danger'
      }`}
    >
      <input
        {...register}
        className={`bg-gray-200 w-[408px] h-[24px] ml-4 mt-[14px] font-regular outline-none  `}
      />
      <br />
      {errors && '필수 입력 항목입니다.'}
    </div>
  )
}

export default Input
