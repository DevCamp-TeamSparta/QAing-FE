import React from 'react'

type InputProps = {
  inputPosition: {
    positiontop: number
  }
}

function Index({ inputPosition }: InputProps) {
  const { positiontop } = inputPosition
  return (
    <div
      className={`w-[440px] h-[52px] bg-gray-200 rounded-lg relative `}
      style={{ top: `${positiontop}px` }}
    >
      <input className="bg-gray-200 w-[408px] h-[24px] ml-4 mt-[14px] font-regular outline-none " />
    </div>
  )
}

export default Index
