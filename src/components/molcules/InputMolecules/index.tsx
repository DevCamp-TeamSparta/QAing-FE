import Input from '@/components/atoms/Input/index'
import { ChangeEvent } from 'react'
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form'

type InputTitleProps = {
  inputTitle: string
  register?: UseFormRegisterReturn
  errors?: object
}

function InputMolcules({ inputTitle, register, errors }: InputTitleProps) {
  return (
    <div className="w-[440px] h-[80px] space-y-[5px]   ">
      <p className="text-base w-fit  font-medium  bottom-[2px]">{inputTitle}</p>
      <Input register={register} errors={errors} />
    </div>
  )
}

export default InputMolcules
