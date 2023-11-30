import React from 'react'
import Drondwon from '@/components/atoms/Dropdown'

type DropdownTitleProps = {
  dropdownTitle: string
}

function DropdownMoleclue({ dropdownTitle }: DropdownTitleProps) {
  const dropdownPosition = {
    positiontop: 4,
  }
  return (
    <div className="w-[440px] h-[80px] bg-white  ">
      <span className="text-base bg-blue-400 font-medium  bottom-[2px] ">
        {dropdownTitle}
      </span>
      <Drondwon dropdownPosition={dropdownPosition} />
    </div>
  )
}

export default DropdownMoleclue
