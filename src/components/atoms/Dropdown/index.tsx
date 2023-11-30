'use client'
import { useState, useRef } from 'react'

type DropdownProps = {
  dropdownPosition: {
    positiontop: number
  }
}

function Drondwon({ dropdownPosition }: DropdownProps) {
  const [openState, setOpenState] = useState<boolean>(false)
  const [selectedElement, setSelectedElement] = useState<string | undefined>()
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { positiontop } = dropdownPosition

  const listToChooseFrom = [
    '기획자',
    '디자이너',
    '개발',
    'QA 엔지니어',
    '비즈니스',
    '기타',
  ]
  return (
    <div
      className="text-[15px] font-medium  -z-[10] "
      style={{ top: `${positiontop}px` }}
    >
      <div className="w-[440px] h-[52px] bg-gray-200  rounded-lg overflow-auto ">
        <div
          onClick={() => {
            setOpenState(!openState)
          }}
          className="w-[408px] h-[24px]  ml-4 mt-[14px] font-regular  "
        >
          <input
            type="button"
            value={selectedElement || '선택'}
            className="w-[376px] h-[24px] bg-gray-200  text-left "
          />
        </div>
      </div>
      {/* 드롭다운 */}
      <div
        className={`${
          openState ? ' h-[332px] ' : 'h-0  overflow-hidden '
        } w-[440px]  bg-blue-300  mt-2 rounded-lg transition-all ease-in-out	duration-[500ms] z-50`}
      >
        <ul className={`p-[12px]  `}>
          {listToChooseFrom.map((item: any) => {
            return (
              <li
                className={`w-[416px] h-[48px]  mb-1 flex flex-row items-center hover:bg-[#EDFBFB] hover:rounded-lg pl-[12px]  `}
                key={item}
                onClick={e => {
                  setOpenState(false)
                  setSelectedElement(item)
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

export default Drondwon
