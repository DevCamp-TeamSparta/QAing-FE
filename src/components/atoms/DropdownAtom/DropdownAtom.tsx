'use client'
import React from 'react'
import { useState, useRef, ReactNode } from 'react'
import { FieldError, UseFormSetValue } from 'react-hook-form'

interface dropdownProps {
  dropdwonList: string[]
  setValue?: UseFormSetValue<{
    username: string
    company: string
    teamsize: string
  }>
  control?: any
  onChange?: (value: any) => void | undefined
  errors?: FieldError
  dropdownPlaceholder?: string
}

function Dropdown({
  dropdwonList,
  setValue,
  control,
  onChange,
  errors,
  dropdownPlaceholder,
}: dropdownProps) {
  const [openState, setOpenState] = useState<boolean>(false)
  const [selectedElement, setSelectedElement] = useState<string | undefined>()
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // console.log('dropdownPlaceholder', dropdownPlaceholder)

  return (
    <div className="text-[15px] font-medium">
      <div
        className={`w-[440px] h-[52px] bg-gray-200  rounded-lg overflow-auto ${
          errors && 'border border-sementic-danger'
        }`}
      >
        <div
          onClick={() => {
            setOpenState(!openState)
          }}
          className="w-[408px] h-[24px]  ml-4 mt-[14px] font-regular  "
        >
          <input
            type="text"
            readOnly
            value={selectedElement || ''}
            placeholder={dropdownPlaceholder && dropdownPlaceholder}
            className="w-[376px] h-[24px] bg-gray-200  text-left outline-none placeholder:b4 "
          />
        </div>
      </div>
      {/* 드롭다운 */}
      <div
        className={`${
          openState ? ' h-[332px] ' : 'h-0  overflow-hidden '
        } w-[440px]  bg-white  b4 rounded-lg transition-all ease-in-out	duration-[500ms] absolute z-500 rotate-360 shadow-modal`}
      >
        <ul className={`p-[12px]  `}>
          {dropdwonList &&
            dropdwonList.map((item: any) => {
              return (
                <li
                  className={`w-[416px] h-[48px]  mb-1 flex flex-row items-center hover:bg-[#EDFBFB] hover:rounded-lg pl-[12px]  `}
                  key={item}
                  onClick={e => {
                    setOpenState(false)
                    setSelectedElement(item)
                    {
                      onChange && onChange(item)
                    }
                  }}
                >
                  {item}
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default React.memo(Dropdown)
//react memo 언제사용해야 좋을까?
//유효성 검사에서 인풋값이 바뀔때마다 드롭다운에서 랜더링이 일어나기 때문에 사용
