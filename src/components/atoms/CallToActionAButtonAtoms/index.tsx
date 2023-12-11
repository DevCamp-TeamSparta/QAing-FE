import React, { ReactNode, useState } from 'react'

type CTAButtonProps = {
  disabled?: boolean
  onClick?: () => void
  children: ReactNode
}

function CTAButton({ disabled, onClick, children }: CTAButtonProps) {
  return (
    <div>
      <button
        type="submit"
        className={`w-[440px] h-[56px]  px-4 py-2 border-none rounded-[99px]  text-white  focus:outline-none hover:bg-primary-hover ${
          disabled
            ? 'bg-sementic-disabled  hover:bg-sementic-disabled cursor-not-allowed'
            : 'bg-primary-default   active:bg-primary-pressed'
        }`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

export default CTAButton
