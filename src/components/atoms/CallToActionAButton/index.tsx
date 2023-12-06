import React, { ReactNode } from 'react'
import clsx from 'clsx'

type CTAButtonProps = {
  size: 'small' | 'medium' | 'large'
  children: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function CTAButton({
  size,
  className,
  disabled,
  onClick,
  children,
}: CTAButtonProps) {
  return (
    <button
      type="submit"
      className={clsx(
        `${className} rounded-[99px] bg-brand-default text-white 
          focus:outline-none 
          hover:bg-brand-hover 
          active:bg-brand-pressed 
          disabled:bg-gray-400 disabled:cursor-not-allowed 
          `,
        {
          'w-[440px] h-[56px]': size === 'large',
          'w-[208px] h-[56px]': size === 'medium',
          '': size === 'small',
        },
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default CTAButton
