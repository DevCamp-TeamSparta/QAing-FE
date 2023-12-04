import { ChangeEvent, useState } from 'react'

export default function usePhoneNumber() {
  const [phoneValue, setPhoneValue] = useState<string>('')

  const phoneNumberAutoFormat = (phoneNumber: string): string => {
    const number = phoneNumber.trim().replace(/[^0-9]/g, '')

    if (number.length < 4) return number
    if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, '$1-$2')
    if (number.length < 11)
      return number.replace(/(\d{3})(\d{3})(\d{1})/, '$1-$2-$3')
    return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  }

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = phoneNumberAutoFormat(e.target.value)
    setPhoneValue(targetValue)
  }

  return {
    phoneNumberAutoFormat,
    setPhoneValue,
    phoneValue,
    onChangePhoneNumber,
  }
}
