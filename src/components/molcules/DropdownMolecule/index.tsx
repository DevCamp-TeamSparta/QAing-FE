import React from 'react'
import Drondwon from '@/components/atoms/Dropdown'

type DropdownProps = {
  dropdownTitle: string
  dropdwonList: string[]
}

function DropdownMoleclue({ dropdownTitle, dropdwonList }: DropdownProps) {
  return (
    <div className="w-[440px] h-[80px]   space-y-[5px]">
      <p className="text-base font-medium   bottom-[2px]">{dropdownTitle}</p>
      <Drondwon dropdwonList={dropdwonList} />
    </div>
  )
}

export default DropdownMoleclue
