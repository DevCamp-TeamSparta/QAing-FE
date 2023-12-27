import Input from '@/components/atoms/InputAtom/InputAtom'
import { ChangeEvent } from 'react'
import {
  RegisterOptions,
  UseFormRegisterReturn,
  FieldError,
} from 'react-hook-form'

type InputTitleProps = {
  inputTitle: string
  register?: UseFormRegisterReturn
  errors?: FieldError
  phoneNumberProps?: {
    type: string
    maxLength: number
  }
  onChangePhoneNumber?: (e: ChangeEvent<HTMLInputElement>) => void
  phoneValue?: string
  inputPlaceholder?: string
}

function InputMolcules({
  inputTitle,
  register,
  errors,
  onChangePhoneNumber,
  phoneValue,
  phoneNumberProps,
  inputPlaceholder,
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
        inputPlaceholder={inputPlaceholder}
      />
      <p className="b4 text-sementic-danger">{errors && errors.message}</p>
    </div>
  )
}

export default InputMolcules
