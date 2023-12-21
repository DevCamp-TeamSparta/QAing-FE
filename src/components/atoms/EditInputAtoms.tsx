import React from 'react'
interface EditInputAtomsProps {
  inputRef: React.RefObject<HTMLInputElement>
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  value: string
  onBlur: (callback: (prev: boolean) => boolean) => void
  maxLength: number
}

export default function EditInputAtoms({
  inputRef,
  placeholder,
  onChange,
  name,
  value,
  onBlur,
  maxLength,
}: EditInputAtomsProps) {
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        onBlur={() => onBlur(prev => !prev)}
        maxLength={maxLength}
      />
    </div>
  )
}
