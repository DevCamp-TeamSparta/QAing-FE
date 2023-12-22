import PhoneNumberInput from '@/components/atoms/InputAtom/PhoneNumberInputAtom/PhoneNumberInputAtom'
import { ChangeEvent } from 'react'

type InputTitleProps = {
  inputTitle: string
  errors?: object
  phoneNumberProps: {
    type: string
    maxLength: number
  }
  onChangePhoneNumber: (e: ChangeEvent<HTMLInputElement>) => void
  phoneValue: string
  isPhoneValueExist: boolean
}

function PhoneNumberInputMolcules({
  inputTitle,
  errors,
  phoneNumberProps,
  onChangePhoneNumber,
  phoneValue,
  isPhoneValueExist,
}: InputTitleProps) {
  return (
    <div className="w-[440px] h-[80px] space-y-[5px]   ">
      <p className="text-base w-fit  font-medium  bottom-[2px]">{inputTitle}</p>
      <PhoneNumberInput
        isPhoneValueExist={isPhoneValueExist}
        errors={errors}
        phoneValue={phoneValue}
        phoneNumberProps={phoneNumberProps}
        onChangePhoneNumber={onChangePhoneNumber}
      />
    </div>
  )
}

export default PhoneNumberInputMolcules
