import React, { ReactNode } from 'react'
import Dropdown from '@/components/atoms/DropdownAtom/DropdownAtom'
import {
  UseFormSetValue,
  Control,
  FieldValues,
  FieldError,
} from 'react-hook-form'
import { type } from 'os'

type DropdownProps = {
  onChange?: (value: any) => void | undefined
  dropdownTitle: string
  dropdwonList: string[]
  setValue?: UseFormSetValue<{
    username: string
    company: string
    teamsize: string
  }>
  errors?: FieldError
  control?: any
  dropdownPlaceholder?: string
}

function DropdownMoleclue({
  dropdownTitle,
  dropdwonList,
  setValue,
  control,
  onChange,
  errors,
  dropdownPlaceholder,
}: DropdownProps) {
  return (
    <div className="w-[440px] h-[80px]   space-y-[5px]">
      <p className="b4   bottom-[2px]">{dropdownTitle}</p>
      <Dropdown
        onChange={onChange}
        dropdwonList={dropdwonList}
        setValue={setValue}
        control={control}
        errors={errors}
        dropdownPlaceholder={dropdownPlaceholder}
      />
    </div>
  )
}

export default DropdownMoleclue
