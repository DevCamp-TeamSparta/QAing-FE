import React, { ReactNode, useState } from 'react'

type CTAButtonProps = {
  disabled?: boolean
  onClick?: () => void
  children: ReactNode
}

function CTAButton({ disabled, onClick, children }: CTAButtonProps) {
  // const {} = CTAButtonProps
  return (
    <div>
      <button
        type="submit"
        className={`w-[440px] h-[56px]  px-4 py-2 border rounded-[99px]  focus:outline-none hover:bg-brand-hover ${
          disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-brand-default   active:bg-brand-pressed'
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
