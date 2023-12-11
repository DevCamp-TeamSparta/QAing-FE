import Input from '@/components/atoms/InputAtoms/index'
import { ChangeEvent } from 'react'
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form'

type InputTitleProps = {
  inputTitle: string
  register?: UseFormRegisterReturn
  errors?: object
  phoneNumberProps?: {
    type: string
    maxLength: number
  }
  onChangePhoneNumber?: (e: ChangeEvent<HTMLInputElement>) => void
  phoneValue?: string
}

function InputMolcules({
  inputTitle,
  register,
  errors,
  onChangePhoneNumber,
  phoneValue,
  phoneNumberProps,
}: InputTitleProps) {
  return (
    <div className="w-[440px] h-[80px] space-y-[5px]   ">
      <p className="b4 w-fit  bottom-[2px]">{inputTitle}</p>
      <Input
        register={register}
        errors={errors}
        onChangePhoneNumber={onChangePhoneNumber}
        phoneValue={phoneValue}
        phoneNumberProps={phoneNumberProps}
      />
    </div>
  )
}

export default InputMolcules
