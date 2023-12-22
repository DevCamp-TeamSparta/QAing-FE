import { ChangeEvent } from 'react'
import { useState } from 'react'
import {
  signupSchema,
  signupSchemaType,
} from '@/utils/zod/authValidation/authValidation'

export type Values = {
  email: string
  password: string
  confirmPassword?: string
  nickname?: string
  confirmPasswordmatch?: string
  event?: boolean
}

export type ValidationErrors = Partial<Values>

interface UseAuthForm {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: ChangeEvent<HTMLFormElement>) => void

  showSocialButtons: boolean
  values: Values
  validationErrors: ValidationErrors
  serverError: string
  isLoading: boolean
  buttonActive: boolean

  setButtonActive: (value: boolean) => void
  setPrevetLogin: (value: boolean) => void
}

export default function useAuthForm(initialValues: Values) {
  const [values, setValues] = useState<Values>(initialValues)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = (values: Values) => {
    const result = signupSchema.parse(values)
    // console.log('result', result)
  }

  return { handleSubmit, handleChange, values, setValues }
}
